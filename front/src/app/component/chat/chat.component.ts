import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Rx';

import { UserService } from '../../service/user/user.service';
import { WordService } from '../../service/word/word.service';
import { NetworkHealthService } from '../../service/network-health/network-health.service';
import { User } from '../../model/user.model';
import { Word } from '../../model/word.model';
import { Message } from '../../model/message.model';

@Component({
  selector: 'wk-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  users: Array<User>;
  word: Word;
  letters: Array<string>;
  typedWord: string;
  wordCounter = 0;
  isOnline = true;

  private wordsSubscription: Subscription;
  private usersSubscription: Subscription;

  constructor(
    private networkHealthService: NetworkHealthService,
    private userService: UserService,
    private wordService: WordService
  ) {}
  
  ngOnInit() {
    this.users = this.userService.getAll();
    this.word = this.wordService.getCurrentWord();
    this.wordCounter = this.wordService.getCurrentWordIndex();
    this.typedWord = "";
    this.letters = this.word.letters.slice();

    this.networkHealthService.isOnline.subscribe(isOnline => {
      this.isOnline = isOnline;
    });

    this.wordsSubscription = this.wordService.getWords()
      .subscribe(res => {
        if(res && res.word && res.index) {
          this.word = res.word;
          this.wordCounter = res.index;
          this.letters = this.word.letters.slice();
        }
      });
    
    this.usersSubscription = this.userService
      .subscribe(users => {
        this.users = users;
      });

  }

  ngOnDestroy() {
    this.wordsSubscription.unsubscribe();
    this.usersSubscription.unsubscribe();
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
