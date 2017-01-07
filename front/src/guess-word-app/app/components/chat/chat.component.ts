import {
  Component,
  OnInit
} from '@angular/core';

import { UsersService } from '../../services/users.service';
import { WordsService } from '../../services/words.service';

import { Word } from '../../models/word.model';
import { User } from '../../models/user.model';
import { Message } from '../../models/message.model';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'chat',
  templateUrl: 'chat.html',
  styleUrls: ['chat.css']
})
export class ChatComponent implements OnInit {

  private users: User[];
  private word: Word;
  private letters: string[];
  private typedWord: string;
  private wordCounter = 0;

  constructor(
    private usersService: UsersService,
    private wordsService: WordsService
  ) {}
 
  ngOnInit() {
    this.users = this.usersService.getAllUsers();
    this.word = this.wordsService.getCurrentWord();
    this.wordCounter = this.wordsService.getCurrentWordIndex();
    this.typedWord = "";
    this.letters = this.word.letters.slice()

    this.wordsService.subscribe(res => {
      if(res && res.word && res.index) {
        this.word = res.word;
        this.wordCounter = res.index;
        this.letters = this.word.letters.slice();
      }
    });
    
    this.usersService.subscribe(users => {
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