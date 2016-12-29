import { Injectable } from '@angular/core';

declare const io: any;

@Injectable()
export class SocketService {
  public socket: any;
  private token: string;

  constructor() {
    this.token = window.sessionStorage.getItem('token');
    this.socket = io.connect('', {'query': 'token=' + this.token});
  }

}