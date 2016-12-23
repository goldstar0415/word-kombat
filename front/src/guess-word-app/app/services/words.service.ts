import { Injectable, Inject } from '@angular/core';

import { Observable} from 'rxjs/Rx';

import { Word } from '../models/word.model';

@Injectable()
export class WordsService {
  private socket: any;
  private url: string;

  init(socket: any) {
    this.socket = socket;
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