import { Component } from 'angular2/core';

import { WordCardComponent } from './word-card/word-card.component';
import { ChatAreaComponent } from './chat-area/chat-area.component';
import { UserListComponent } from './user-list/user-list.component';
import { WordLettersComponent } from './word-letters/word-letters.component';
import { WordInputsComponent } from './word-inputs/word-inputs.component';

import { Word } from '../../models/word.model';
import { User } from '../../models/user.model';

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

  private word: Word;
  private users: User[];

  private letters: string[];
  private typedWord: string;

  constructor() {
    // Mock data
    this.word = new Word(1, ['d', 'r', 'a', 'n', 'o', 'm'],
      'images/words/words.jpg', "Lorem ipsum dolor sit amet elit. Alias, veritatis.");

    this.users = [
      new User(1, 'random1', 2500, 'images/users/noIco.png', 6),
      new User(2, 'random2', 2000, 'images/users/noIco.png', 1),
      new User(3, 'random3', 500, 'images/users/noIco.png', 2),
      new User(4, 'random4', 2500, 'images/users/noIco.png', 4),
      new User(5, 'random5', 2200, 'images/users/noIco.png', 3),
      new User(6, 'random6', 2500, 'images/users/noIco.png', 7),
      new User(7, 'random7', 1500, 'images/users/noIco.png', 8),
      new User(8, 'random8', 2500, 'images/users/noIco.png', 1),
      new User(9, 'random9', 2500, 'images/users/noIco.png', 2),
      new User(10, 'random10', 2500, 'images/users/noIco.png', 9),
    ]
    // End of mock data
    
    this.letters = this.word.letters;
    this.typedWord = "";
  }

  onLetterClicked(letter: string) {
    this.typedWord += letter;
  }

  onWordEntered(word: string) {
    this.typedWord = word;
    this.letters = this.word.letters;

    for(let letter of word.toLowerCase().split('')) {
      let index = this.letters.indexOf(letter);
      if(index !== -1) {
        this.letters.splice(index, 1);
      }
    }

  }

}