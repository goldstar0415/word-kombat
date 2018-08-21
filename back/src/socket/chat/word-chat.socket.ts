import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";

import { UserRepository } from "../../repository/user/user.repository";
import { WordRepository } from "../../repository/word/word.repository";
import { Word } from "../../model/word.model";
import * as socketJWT from "socketio-jwt";
import { UserDto } from "../../model/user.model";
import { Logger } from "@nestjs/common";
import { ShuffleService } from "../../service/shuffle.service";

@WebSocketGateway()
export class WordChatSocket implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() private server;

  private readonly logger = new Logger("socket");

  private readonly AMOUNT_OF_WORDS_IN_MATCH = 10;
  private amountOfGuests = 0;
  private users: UserDto[] = [];
  private words: Partial<Word & { letters: string[] }>[] = [];
  private scores: any[] = [];

  constructor(
    private readonly userRepository: UserRepository,
    private readonly wordRepository: WordRepository,
    private readonly shuffleService: ShuffleService
  ) {
  }

  afterInit() {
    this.server.use(
      socketJWT.authorize({
        secret: String(process.env.JWT_SECRET),
        handshake: true,
        fail: (error, data, accept) => {
          if (error) {
            this.logger.error(JSON.stringify(error));
          }

          if (data.request) {
            return accept(null);
          } else {
            return accept(null, false);
          }
        }
      })
    );
  }

  async handleConnection(client: any) {
    let user = this.createGuest(this.amountOfGuests);

    if (Boolean(client.decoded_token)) {
      user = await this.userRepository.findById(client.decoded_token.id);
    } else {
      this.amountOfGuests++;
    }

    this.users.push(user);
    this.scores.push({ user, points: 0, words: 0 });
    this.server.emit("user-connected", this.users);
    this.server.emit("scores", this.scores);
    client.handshake.user = user;

    if (this.words.length < 1) {
      this.words = await this.getWords(this.AMOUNT_OF_WORDS_IN_MATCH);
    }

    client.emit("word", {
      word: this.words[0],
      index: this.AMOUNT_OF_WORDS_IN_MATCH + 1 - this.words.length
    });
  }

  handleDisconnect(client) {
    if (Boolean(client.handshake.user)) {

      this.users = this.users.filter(
        user => user.name !== client.handshake.user.name
      );

      this.scores = this.scores.filter(
        score => score.user.name !== client.handshake.user.name
      );

      this.server.emit("user-connected", this.users);
      this.server.emit("scores", this.scores);
    }

    if (this.users.length <= 0) {
      this.words = [];
      this.amountOfGuests = 0;
    }
  }

  @SubscribeMessage("message")
  async onMessage(client, data) {
    const user = client.handshake.user;

    if (!user) {
      return;
    }

    if (this.words.length <= 0) {
      this.words = await this.getWords(this.AMOUNT_OF_WORDS_IN_MATCH);
    }

    if (data.text.toLowerCase() === this.words[0].value.toLowerCase()) {
      data.points = this.calculateScore(this.words[0]);

      this.words.shift();

      this.scores.forEach(score => {
        if (score.user.name === user.name) {
          score.points = Math.round((score.points + data.points) * 10) / 10;
          score.words++;
        }
      });

      if (this.words.length <= 0) {
        this.server.emit("end-of-match", this.scores);

        this.scores.forEach(score => {
          score.words = 0;
          score.points = 0;
        });

        this.words = await this.getWords(this.AMOUNT_OF_WORDS_IN_MATCH);
      }

      this.server.emit("word", {
        word: this.words[0],
        index: this.AMOUNT_OF_WORDS_IN_MATCH + 1 - this.words.length
      });
    }

    user.score += data.points;

    this.users.forEach(u => {
      if (u.name === user.name) {
        u.score = user.score;
      }
    });

    data.user = user;

    this.server.emit("user-connected", this.users);
    this.server.emit("scores", this.scores);
    this.server.emit("message", data);

    if (user.id) {
      await this.userRepository.update(user.id, user);
    }
  }

  private createGuest(index): UserDto {
    return new UserDto(
      null,
      null,
      `guest${(index + 1)}`,
      null,
      `http://www.robohash.org/${index}`,
      0,
      1,
      {
        id: 1,
        value: "1",
        minScore: 0,
        image: "assets/images/ranks/1.png"
      }
    );
  }

  private calculateScore(word: Partial<Word & { letters: string[] }>) {
    let matchDifficulty = 1;

    if (this.users.length > 1) {
      matchDifficulty = 1 + this.users.reduce((acc, next) => acc + next.rankId, 0) / 10;
    }

    return Math.round(word.value.length * matchDifficulty * 10) / 10;
  }

  private async getWords(amount: number): Promise<Partial<Word> & { letters: string[] } []> {
    return this.wordRepository
      .getRandomWords(amount)
      .then(words => {
        return words.map(word => {
          return Object.assign(word.dataValues, {
            letters: this.shuffleService.shuffle(word.value)
          });
        });
      });
  }
}
