import { Injectable } from '@angular/core';

import {
  Http,
  Headers,
  RequestOptions,
  Response
} from '@angular/http';

import { Observable, ReplaySubject } from 'rxjs/Rx';

import { User } from '../models/user.model';

@Injectable()
export class UsersService extends ReplaySubject<string>  {
  private socket: any;

  constructor(private http: Http) {
    super();
  }

  init(socket: any) {
    this.socket = socket;
  }

  getUsers(): Observable<User[]> {
    let observable = new Observable(observer => {
      this.socket.on('user-connected', users => {
        observer.next(users);
        this.next(users);
      });
    });
    return observable;
  }

  getById(id: number): Observable<User> | any {
    return this.http.get(`api/users/${id}`)
      .map(res => {
        return res.json();
      }).catch(this.handleError);
  }

  update(id: number, user: User): Observable<User> | any {
    return this.http.put(`api/users/${id}`, user)
      .map(res => {
        return res.json();
      }).catch(this.handleError);
  }

  handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.message || body.error;
      errMsg = err;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}