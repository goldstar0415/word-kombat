import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { SocketService } from '../socket/socket.service';
import { Word } from '../../model/word.model';

@Injectable()
export class WordService {
  private socket: any;

  constructor(private socketService: SocketService) {
    this.setSocket();
  }

  setSocket(socket?) {
    if(socket) {
      this.socket = socket;
    } else {
      this.socket = this.socketService.socket;
    }
  }

  getWords(): Observable<{word: Word, index: number}> {
    let observable = new Observable(observer => {
      this.socket.on('word', res => {
        window.localStorage.setItem("currentWord", JSON.stringify(res.word));
        window.localStorage.setItem("currentWordIndex", res.index);
        observer.next(res);
      });
    });
    return observable;
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