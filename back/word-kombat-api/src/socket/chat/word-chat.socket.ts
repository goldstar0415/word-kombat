import {
    OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";

import {UserRepository} from "../../repository/user/user.repository";
import {WordRepository} from "../../repository/word/word.repository";
import {User} from "../../model/user.model";
import {Rank} from "../../model/rank.model";
import {Word} from "../../model/word.model";
import * as socketJWT from 'socketio-jwt';

@WebSocketGateway()
export class WordChatSocket implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    private server;

    private readonly AMOUNT_OF_WORDS_IN_MATCH = 10;
    private amountOfGuests = 0;
    private users: User[] = [];
    private words: Word[] = [];
    private scores: any[] = [];

    constructor(private readonly userRepository: UserRepository,
                private readonly wordRepository: WordRepository) {
    }

    afterInit() {
        this.server.use(socketJWT.authorize({
            secret: '',
            handshake: true,
            fail: (error, data, accept) => {
                if (error) {
                    throw error;
                }

                if (data.request) {
                    accept(null);
                } else {
                    accept(null, false);
                }
            }
        }));
    }

    async handleConnection(client: any) {
        if (Boolean(client.decoded_token)) {
            const userId = client.decoded_token.id;
            const user = await this.userRepository.findById(userId);
            this.users.push(user);
            this.scores.push({user: user, points: 0, words: 0});
            this.server.emit('user-connected', this.users);
            this.server.emit('scores', this.scores);
            client.handshake.user = user;
        } else {
            this.amountOfGuests++;
            const user = this.createGuest(this.amountOfGuests);
            this.users.push(user);
            this.scores.push({user: user, points: 0, words: 0});
            client.handshake.user = user;
            this.server.emit('user-connected', this.users);
            this.server.emit('scores', this.scores);
        }

        if (this.words.length > 0) {
            this.server.emit('word', {
                word: this.words[0],
                index: this.AMOUNT_OF_WORDS_IN_MATCH + 1 - this.words.length
            });
        } else {
            this.words = await this.getWords(this.AMOUNT_OF_WORDS_IN_MATCH);
        }
    }

    handleDisconnect(client) {
        if (Boolean(client.handshake.user)) {
            this.users = this.users.filter(user => user.name !== client.handshake.user.name);
            this.scores = this.scores.filter(score => score.user.name !== client.handshake.user.name);
            this.server.emit('user-connected', this.users);
            this.server.emit('scores', this.scores);
        }

        if (this.users.length <= 0) {
            this.words = [];
            this.amountOfGuests = 0;
        }
    }

    @SubscribeMessage('message')
    async onMessage(client, data) {
        const user = client.handshake.user;

        if (user) {
            if (this.words.length > 0) {
                if (data.text.toLowerCase() === this.words[0].value.toLowerCase()) {
                    data.points = this.calculateScore(this.words[0]);
                    this.words.shift();
                    this.scores.forEach(score => {
                        if (score.user.name === user.name) {
                            score.points += data.points;
                            score.words++;
                        }
                    });
                    if (this.words.length > 0) {
                        this.server.emit('word', {
                            word: this.words[0],
                            index: this.AMOUNT_OF_WORDS_IN_MATCH + 1 - this.words.length
                        });
                    } else {
                        this.server.emit('end-of-match', this.scores);
                        this.scores.forEach(score => {
                            score.words = 0;
                            score.points = 0;
                        });
                        this.words = await this.getWords(this.AMOUNT_OF_WORDS_IN_MATCH);
                    }
                }
            } else {
                this.words = await this.getWords(this.AMOUNT_OF_WORDS_IN_MATCH);
            }

            user.score += data.points;

            this.users.forEach(u => {
                if (u.name === user.name) {
                    u.score = user.score;
                }
            });

            data.user = user;

            this.server.emit('user-connected', this.users);
            this.server.emit('scores', this.scores);
            this.server.emit('message', data);

            if (user.id) {
                await this.userRepository.update(user.id, user);
            }
        }
    }

    private createGuest(index): User {
        return new User(null, null, 'guest' + index, null,
            'http://www.robohash.org/' + index, 0, 1);
    }

    private calculateScore(word: Word) {
        return word.value.length;
    }

    private async getWords(amount: number): Promise<Word[]> {
        return Promise.resolve([]);
    }


}