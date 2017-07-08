import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { SocketService } from '../socket/socket.service'
import { Message } from '../../model/message.model';

@Injectable()
export class MessageService {
  private socket: SocketIOClient.Socket;

  constructor(private socketService: SocketService) {
    this.setSocket();
  }

  setSocket(socket?: SocketIOClient.Socket) {
    if(socket) {
      this.socket = socket;
    } else {
      this.socket = this.socketService.socket;
    }
  }

  sendMessage(message: any) {
    this.socket.emit('message', message);
  }

  getMessages(): Observable<Message> {
    const observable = new Observable(observer => {
      this.socket.on('message', message => {
        observer.next(message);
      });
    });
    return observable;
  }

}