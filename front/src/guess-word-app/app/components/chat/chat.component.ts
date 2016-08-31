import { Component, OnInit, OnDestroy } from 'angular2/core';

import { WordCardComponent } from './word-card/word-card.component';
import { ChatAreaComponent } from './chat-area/chat-area.component';
import { UserListComponent } from './user-list/user-list.component';
import { WordLettersComponent } from './word-letters/word-letters.component';
import { WordInputsComponent } from './word-inputs/word-inputs.component';

import { UsersService } from '../../services/users.service';
import { WordsService } from '../../services/words.service';

import { Word } from '../../models/word.model';
import { User } from '../../models/user.model';
import { Message } from '../../models/message.model';

declare let io:any;

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
  ],
  providers: [
    UsersService,
    WordsService
  ]
})
export class ChatComponent implements OnInit, OnDestroy {

  private usersService: UsersService;
  private wordsService: WordsService;

  private users: User[];
  private word: Word;

  private letters: string[];
  private typedWord: string;

  private socket = io();
  private wordsConnection;
  private usersConnection;

  private wordCounter = 0;
 
  ngOnInit() {
    
    this.wordsService.init(this.socket);
    this.usersService.init(this.socket);

    this.wordsConnection = this.wordsService.getWord().subscribe(word => {
      this.word = word;

      if(this.wordCounter < 10) {
        this.wordCounter++;
      } else {
        this.wordCounter = 1;
      }

      this.letters = word.letters.slice();
    });
    
    this.usersConnection = this.usersService.getUsers().subscribe(users => {
      this.users = users;
    });

  }

  ngOnDestroy() {
    this.wordsConnection.unsubscribe();
    this.usersConnection.unsubscribe();
  }

  constructor(usersService: UsersService, wordsService: WordsService) {

    this.usersService = usersService;
    this.wordsService = wordsService;

    this.word = new Word(null, [], 'images/words/words.jpg', "");
    this.users = [];
    this.typedWord = "";
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