import { Injectable } from 'angular2/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Message } from '../models/message.model';

declare let io:any;

@Injectable()
export class MessagingService {
  private socket: any;
  private url: string;

  constructor() {}

  init(socket: any) {
    this.socket = socket;
  }

  sendMessage(message: any) {
    this.socket.emit('new-message', message);
  }

  getMessages(): Observable<Message> {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

}