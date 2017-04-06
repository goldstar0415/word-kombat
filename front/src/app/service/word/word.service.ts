import { Injectable } from '@angular/core';

import { Observable,  ReplaySubject } from 'rxjs/Rx';

import { SocketService } from '../socket/socket.service';
import { Word } from '../../model/word.model';

@Injectable()
export class WordService extends ReplaySubject<any> {
  private socket: any;

  constructor(private socketService: SocketService) {
    super();
    this.socket = this.socketService.socket;

    this.socket.on('word', res => {
      window.localStorage.setItem("currentWord", JSON.stringify(res.word));
      window.localStorage.setItem("currentWordIndex", res.index);
      this.next(res);
    });
  }

  getCurrentWord() {
    let word = window.localStorage.getItem("currentWord");
    if(word) {
      return JSON.parse(word);
    } else {
      return new Word();
    }
  }

  getCurrentWordIndex() {
    let index = window.localStorage.getItem("currentWordIndex");
    if(index) {
      return +index;
    } else {
      return 0;
    }
  }

}