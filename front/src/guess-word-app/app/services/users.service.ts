import { Injectable, Inject } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { User } from '../models/user.model';

@Injectable()
export class UsersService {
  private socket: any;
  private url: string;

  constructor() {}

  init(socket: any) {
    this.socket = socket;
  }

  getUsers(): Observable<User[]> {
    let observable = new Observable(observer => {
      this.socket.on('user-connected', users => {
        observer.next(users);
      }); 
    });     
    return observable;
  }

}