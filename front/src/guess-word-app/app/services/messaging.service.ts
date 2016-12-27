import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { SocketService } from './socket.service'
import { Message } from '../models/message.model';

@Injectable()
export class MessagingService {
  private socket: any;

  constructor(private socketService: SocketService) {
    this.socket = this.socketService.socket;
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