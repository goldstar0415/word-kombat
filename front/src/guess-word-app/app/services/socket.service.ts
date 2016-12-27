import { Injectable } from '@angular/core';

declare let io: any;

@Injectable()
export class SocketService {
  public socket: any;

  constructor() {
    this.socket = io();
  }
}