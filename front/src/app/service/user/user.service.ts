import { Injectable } from '@angular/core';

import { Observable, ReplaySubject } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { SocketService } from '../socket/socket.service';
import { User } from '../../model/user.model';
import { Rank } from '../../model/rank.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService extends ReplaySubject<Array<User>> {

  private socket: SocketIOClient.Socket;
  private users: Array<User>;

  constructor(
    private readonly http: HttpClient,
    private readonly socketService: SocketService,
  ) {
    super();
    this.setSocket();
    this.socket.on('user-connected', users => {
      this.users = users.sort((prev, next) => next.score - prev.score);
      this.next(users);
    });
  }

  public setSocket(socket?: SocketIOClient.Socket) {
    if (socket) {
      this.socket = socket;
    } else {
      this.socket = this.socketService.socket;
    }
  }

  public setUsers(users: Array<User>): void {
    this.next(users);
  }

  public getAll(): Array<User> {
    return this.users;
  }

  public update(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${environment.apiUrl}api/users/${id}`, user);
  }

  public uploadImage(userId: number, image: string): Observable<any> {
    return this.http.patch(`${environment.apiUrl}api/users/${userId}/image`, { image });
  }

  public getById(id: number): Observable<User> {
    if (window.navigator.onLine) {
      return this.getUserByIdFromService(id);
    } else {
      return this.getUserByIdFromStorage(id);
    }
  }

  public getNextRank(score: number): Observable<Rank> {
    if (window.navigator.onLine) {
      return this.getNextRankFromService(score);
    } else {
      return this.getNextRankFromStorage();
    }
  }

  private getUserByIdFromService(id: number): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}api/users/${id}`)
      .do(res => window.localStorage.setItem('user:' + id, JSON.stringify(res)));
  }

  private getUserByIdFromStorage(id: number): Observable<User> {
    let user = window.localStorage.getItem('user:' + id);
    if (user) {
      return Observable.from([JSON.parse(user)]);
    } else {
      return Observable.from([new User()]);
    }
  }

  private getNextRankFromService(score: number): Observable<Rank> {
    return this.http.get<Rank>(`${environment.apiUrl}api/ranks/${score}/next`)
      .do(res => window.localStorage.setItem('rank', JSON.stringify(res)));
  }

  private getNextRankFromStorage(): Observable<Rank> {
    const nextRank = window.localStorage.getItem('rank');
    if (nextRank) {
      return Observable.from([JSON.parse(nextRank)]);
    } else {
      return Observable.from([new Rank()]);
    }
  }

}
