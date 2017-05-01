import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';

@Injectable()
export class SocketService {
  
  private token: string;
  public socket: SocketIOClient.Socket;

  constructor() {
    this.connect();
  }

  connect(token?): Promise<SocketIOClient.Socket> {
    if(this.socket) {
      this.socket.disconnect();
    }
    if(!token) {
      const tokenFromStorage = window.sessionStorage.getItem('user');
      if(tokenFromStorage) {
        this.token = JSON.parse(tokenFromStorage).token;
      }
    } else {
      this.token = token;
    }
    this.socket = io.connect(environment.apiUrl, {
      query: 'token=' + this.token
    });
    return new Promise((resolve, reject) => resolve(this.socket));
  }

}