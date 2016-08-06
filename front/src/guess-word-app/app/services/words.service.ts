import { Injectable, Inject } from 'angular2/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Word } from '../models/word.model';

@Injectable()
export class WordsService {
  private socket: any;
  private url: string;

  constructor() {}

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