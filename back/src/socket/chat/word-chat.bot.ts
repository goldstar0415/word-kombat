import { Component } from "@nestjs/common";
import { User } from "../../entity/user.entity";
import { NlpService } from "../../service/nlp/nlp.service";
import { Word } from "../../entity/word.entity";
import { STEMS } from "../../service/nlp/stems.constant";
import * as _ from "lodash";
import * as template from "string-template";

@Component()
export class WordChatBot {

  private readonly BOT_USER: Partial<User> = {
    id: -1,
    name: "Word-Kombat BOT",
    icon: "http://localhost:3000/images/wk-bot.png"
  };

  private readonly MATCH_START_MESSAGES = [
    "Match has been started",
    "3, 2, 1... FIGHT!!!",
    "Let the battle begin"
  ];

  private readonly MATCH_END_MESSAGES = [
    "Match has been ended",
    "Game over"
  ];

  private readonly USER_CONNECTED_MESSAGES = [
    "User {username} has joined the game",
    "It's a bird, it's a plane... Nope, it's {username} has joined the game",
    "Greetings, {username}"
  ];

  private readonly USER_DISCONNECTED_MESSAGES = [
    "User {username} has left the game",
    "Oh No, {username} has left the game"
  ];

  private readonly CORRECT_ANSWER_MESSAGES = [
    "Bingo, {username}!",
    "You are right, {username}",
    "Correct, {username}. Well done!"
  ];

  private readonly FIRST_LETTER_HINTS = [
    "Ok, the first letter is \"{letter}\"",
    "Word starts from \"{letter}\""
  ];

  private readonly LAST_LETTER_HINTS = [
    "Ok, the last letter is \"{letter}\"",
    "Word ends with \"{letter}\"",
  ];

  private readonly HINTS = [
    "Ok, I'll give you a hint - \"{hint}\"",
    "Hmmm... \"{hint}\" will help you",
  ];

  constructor(private readonly nlpService: NlpService) {
  }

  public hintMessage(message: string, word: Partial<Word>): { text: string, user: Partial<User> } | null {
    const result = this.nlpService.classify(message);

    let response = {
      user: this.BOT_USER,
      text: null
    };

    switch (result) {
      case STEMS.FIRST_LETTER_STEM.stem: {
        response.text = template(_.sample(this.FIRST_LETTER_HINTS), {
          letter: word.value[0]
        });
        break;
      }
      case STEMS.LAST_LETTER_STEM.stem: {
        response.text = template(_.sample(this.LAST_LETTER_HINTS), {
          letter: word.value[word.value.length - 1]
        });
        break;
      }
      case STEMS.HINT_STEM.stem: {
        response.text = template(_.sample(this.HINTS), {
          hint: word.hint
        });
        break;
      }
      default: {
        response = null;
      }
    }

    return response;
  }

  public matchStartMessage(): { text: string, user: Partial<User> } {
    return {
      text: _.sample(this.MATCH_START_MESSAGES),
      user: this.BOT_USER
    };
  }

  public matchEndMessage(): { text: string, user: Partial<User> } {
    return {
      text: _.sample(this.MATCH_END_MESSAGES),
      user: this.BOT_USER
    };
  }

  public userConnectedMessage(username: string): { text: string, user: Partial<User> } {
    return {
      text: template(_.sample(this.USER_CONNECTED_MESSAGES), { username }),
      user: this.BOT_USER
    };
  }

  public userDisconnectedMessage(username: string): { text: string, user: Partial<User> } {
    return {
      text: template(_.sample(this.USER_DISCONNECTED_MESSAGES), { username }),
      user: this.BOT_USER
    };
  }

  public correctAnswerMessage(username: string): { text: string, user: Partial<User> } {
    return {
      text: template(_.sample(this.CORRECT_ANSWER_MESSAGES), { username }),
      user: this.BOT_USER
    };
  }

}
