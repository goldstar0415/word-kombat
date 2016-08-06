import { Injectable, Inject } from 'angular2/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

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