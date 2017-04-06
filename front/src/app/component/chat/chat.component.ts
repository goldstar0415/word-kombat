import { Component, OnInit } from '@angular/core';

import { UserService } from '../../service/user/user.service';
import { WordService } from '../../service/word/word.service';

import { User } from '../../model/user.model';
import { Word } from '../../model/word.model';
import { Message } from '../../model/message.model';

@Component({
  selector: 'wk-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  users: Array<User>;
  word: Word;
  letters: Array<string>;
  typedWord: string;
  wordCounter = 0;

  constructor(
    private userService: UserService,
    private wordService: WordService
  ) {}
  
  ngOnInit() {
    this.users = this.userService.getAll();
    this.word = this.wordService.getCurrentWord();
    this.wordCounter = this.wordService.getCurrentWordIndex();
    this.typedWord = "";
    this.letters = this.word.letters.slice()

    this.wordService.subscribe(res => {
      if(res && res.word && res.index) {
        this.word = res.word;
        this.wordCounter = res.index;
        this.letters = this.word.letters.slice();
      }
    });
    
    this.userService.subscribe(users => {
      this.users = users;
    });

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
