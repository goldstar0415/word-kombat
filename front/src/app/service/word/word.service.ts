import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Rx';

import {SocketService} from '../socket/socket.service';
import {Word} from '../../model/word.model';

@Injectable()
export class WordService {
  private socket: SocketIOClient.Socket;

  constructor(private readonly socketService: SocketService) {
    this.setSocket();
  }

  public setSocket(socket?: SocketIOClient.Socket) {
    if (socket) {
      this.socket = socket;
    } else {
      this.socket = this.socketService.socket;
    }
  }

  public getWords(): Observable<{ word: Word, index: number }> {
    return new Observable(observer => {
      this.socket.on('word', res => {
        window.localStorage.setItem('currentWord', JSON.stringify(res.word));
        window.localStorage.setItem('currentWordIndex', res.index);
        observer.next(res);
      });
    });
  }

  public getCurrentWord() {
    const word = window.localStorage.getItem('currentWord');
    if (word) {
      return JSON.parse(word);
    } else {
      return new Word();
    }
  }

  public getCurrentWordIndex() {
    const index = window.localStorage.getItem('currentWordIndex');
    if (index) {
      return Number(index);
    } else {
      return 0;
    }
  }

}
