import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  
  private token: string;
  public socket: any;

  constructor() {
    this.token = window.sessionStorage.getItem('token');
    this.socket = io.connect('', {'query': 'token=' + this.token});
  }

}