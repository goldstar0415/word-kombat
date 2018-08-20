import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { User } from '../../model/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LeaderboardsService {

  private readonly LEADERBOARDS_URL = environment.apiUrl + 'api/leaderboards';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Array<User> | any> {
    if(window.navigator.onLine) {
      return this.getFromService();
    } else {
      return this.getFromStorage();
    }
  }

  private getFromService(): Observable<Array<User> | any> {
    return this.http.get<Array<User>>(this.LEADERBOARDS_URL)
      .do(res => window.localStorage.setItem('leaderboards', JSON.stringify(res)));
  }

  private getFromStorage(): Observable<Array<User> | any> {
    const leaderboards = window.localStorage.getItem('leaderboards');
    if (leaderboards) {
      return Observable.from([JSON.parse(leaderboards)]);
    } else {
      return Observable.from([[]]);
    }
  }

}
