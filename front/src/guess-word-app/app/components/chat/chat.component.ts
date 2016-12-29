import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

import { UsersService } from '../../services/users.service';
import { WordsService } from '../../services/words.service';
import { SocketService } from '../../services/socket.service';

import { Word } from '../../models/word.model';
import { User } from '../../models/user.model';
import { Message } from '../../models/message.model';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'chat',
  templateUrl: 'chat.html',
  styleUrls: ['chat.css'],
  providers: [WordsService]
})
export class ChatComponent implements OnInit, OnDestroy {

  private users: User[];
  private word: Word;
  private letters: string[];
  private typedWord: string;
  private wordCounter = 0;

  constructor(
    private usersService: UsersService,
    private wordsService: WordsService,
    private socketService: SocketService
  ) {}
 
  ngOnInit() {
    this.users = this.usersService.getAllUsers();
    this.word = new Word();
    this.typedWord = "";
    this.letters = this.word.letters.slice()

    this.wordsService.subscribe(word => {
      if(!!word) {
        this.word = word;

        if(this.wordCounter < 10) {
          this.wordCounter++;
        } else {
          this.wordCounter = 1;
        }

        this.letters = word.letters.slice();
      }
    });
    
    this.usersService.subscribe(users => {
      this.users = users;
    });

  }

  ngOnDestroy() {
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