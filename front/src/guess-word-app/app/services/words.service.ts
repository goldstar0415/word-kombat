import { Injectable } from '@angular/core';

import { Observable,  ReplaySubject } from 'rxjs/Rx';

import { SocketService } from './socket.service';
import { Word } from '../models/word.model';

@Injectable()
export class WordsService extends ReplaySubject<Word> {
  private socket: any;

  constructor(private socketService: SocketService) {
    super();
    this.socket = this.socketService.socket;

    this.socket.on('word', word => {
      this.next(word);
    });
  }

  getWord(): Observable<Word> {
    let observable = new Observable(observer => {
      this.socket.on('word', word => {
        observer.next(word);
      });
    });
    return observable;
  }

}