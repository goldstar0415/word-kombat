import { Injectable } from '@angular/core';

import {
  Http,
  Headers,
  RequestOptions,
  Response
} from '@angular/http';

import { Observable, ReplaySubject } from 'rxjs/Rx';

import { SocketService } from '../socket/socket.service';
import { User } from '../../model/user.model';
import { Rank } from '../../model/rank.model';

@Injectable()
export class UserService extends ReplaySubject<Array<User>> {
  private socket: any;
  private users: Array<User>;

  constructor(
    private http: Http,
    private socketService: SocketService
  ) {
    super();
    this.socket = this.socketService.socket;
    this.socket.on('user-connected', users => {
      this.users = users.sort((user1, user2) => {
        user2.score - user1.score;
      });
      this.next(users);
    });
  }

  getAll(): Array<User> {
    return this.users;
  }

  getById(id: number): Observable<User> | any {
    return this.http.get(`api/users/${id}`)
      .map(res => {
        return res.json();
      }).catch(this.handleError);
  }

  update(id: number, user: User): Observable<User> | any {
    return this.http.put(`api/users/${id}`, user, this.generateOptions())
      .map(res => {
        return res.json();
      }).catch(this.handleError);
  }

  getNextRank(score: number): Observable<Rank> | any {
    return this.http.get(`api/ranks/${score}/next`)
      .map(res => {
        return res.json();
      }).catch(this.handleError);
  }

  uploadImage(userId: number, image: string) {
    let body = {image: image};
    return this.http.patch(`api/users/${userId}/image`, body, this.generateOptions())
      .map(res => {
        return res.json();
      }).catch(this.handleError);
  }

  private generateOptions() {
    let token = window.sessionStorage.getItem('token');
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    return new RequestOptions({ headers: headers });
  }

  private handleError(error: Response | any) {
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