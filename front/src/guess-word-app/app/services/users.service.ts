import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { User } from '../models/user.model';

@Injectable()
export class UsersService extends ReplaySubject<string>  {
  private socket: any;

  constructor() {
    super();
  }

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