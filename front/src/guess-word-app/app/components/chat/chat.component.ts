import { Component } from 'angular2/core';

import { WordCardComponent } from './word-card/word-card.component';
import { ChatAreaComponent } from './chat-area/chat-area.component';
import { UserListComponent } from './user-list/user-list.component';
import { WordLettersComponent } from './word-letters/word-letters.component';
import { WordInputsComponent } from './word-inputs/word-inputs.component';

const basePath = 'guess-word-app/app/components/chat/';

@Component({
  selector: 'chat',
  templateUrl: basePath + 'chat.html',
  styleUrls: [basePath + 'chat.css'],
  directives: [
    WordCardComponent,
    ChatAreaComponent,
    UserListComponent,
    WordLettersComponent,
    WordInputsComponent
  ]
})
export class ChatComponent {

  private word = {
    id: 1,
    letters: ['d', 'r', 'a', 'n', 'o', 'm'],
    image: "",
    hint: ""
  };

  private letters: string[];
  private typedWord: string;
  private letter: string;

  constructor() {
    this.letters = this.word.letters.slice();
    this.typedWord = "";
    this.letter = "";
  }

  onLetterClicked(letter: string) {
    this.typedWord += letter;
  }

  onWordEntered(word: string) {
    this.typedWord = word;
    this.letters = this.word.letters.slice();

    for(let letter of word.toLowerCase().split('')) {
      let index = this.letters.indexOf(letter);
      if(index !== -1) {
        this.letters.splice(index, 1);
      }
    }

  }

}