import { Injectable } from '@angular/core';

import {
  Http,
  Headers,
  RequestOptions,
  Response
} from '@angular/http';

import { Observable, ReplaySubject } from 'rxjs/Rx';

import { handleError } from '../error-handler';
import { createRequestOptions } from '../request-options';
import { environment } from '../../../environments/environment';
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
    this.setSocket();
    this.socket.on('user-connected', users => {
      this.users = users.sort((user1, user2) => {
        return user2.score - user1.score;
      });
      this.next(users);
    });
  }

  setSocket(socket?) {
    if(socket) {
      this.socket = socket;
    } else {
      this.socket = this.socketService.socket;
    }
  }

  setUsers(users: Array<User>): void {
    this.next(users);
  }

  getAll(): Array<User> {
    return this.users;
  }

  update(id: number, user: User): Observable<User | any> {
    return this.http
      .put(`${environment.apiUrl}api/users/${id}`, user, createRequestOptions(true))
      .map(res => res.json())
      .catch(handleError);
  }

  uploadImage(userId: number, image: string): Observable<any> {
    let body = {image: image};
    return this.http
      .patch(
        `${environment.apiUrl}api/users/${userId}/image`,
         body,
         createRequestOptions(true)
      )
      .map(res => res.json())
      .catch(handleError);
  }

  getById(id: number): Observable<User | any> {
    if(window.navigator.onLine) {
      return this.getUserByIdFromService(id);
    } else {
      return this.getUserByIdFromStorage(id);
    }
  }

  private getUserByIdFromService(id: number): Observable<User | any> {
    return this.http
      .get(`${environment.apiUrl}api/users/${id}`, createRequestOptions())
      .map(res => res.json())
      .do(res => window.localStorage.setItem("user:" + id, JSON.stringify(res)))
      .catch(handleError);
  }

  private getUserByIdFromStorage(id: number): Observable<User | any> {
    let user = window.localStorage.getItem("user:" + id);
    if(user) {
      return Observable.from([JSON.parse(user)]);
    } else {
      return Observable.from([new User()]);
    }
  }

  getNextRank(score: number): Observable<Rank | any > {
    if(window.navigator.onLine) {
      return this.getNextRankFromService(score);
    } else {
      return this.getNextRankFromStorage();
    }
  }

  private getNextRankFromService(score: number): Observable<Rank | any> {
    return this.http
      .get(`${environment.apiUrl}api/ranks/${score}/next`, createRequestOptions())
      .map(res => res.json())
      .do(res => window.localStorage.setItem("rank", JSON.stringify(res)))
      .catch(handleError);
  }

  private getNextRankFromStorage() {
    let nextRank = window.localStorage.getItem('rank');
    if(nextRank) {
      return Observable.from([JSON.parse(nextRank)]);
    } else {
      return Observable.from([new Rank()]);
    }
  }

}