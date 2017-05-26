import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { handleError } from '../error-handler';
import { createRequestOptions } from '../request-options';
import { environment } from '../../../environments/environment';
import { User } from '../../model/user.model';

@Injectable()
export class LeaderboardsService {

  private readonly LEADERBOARDS_URL = environment.apiUrl + "api/leaderboards";

  constructor(private http: Http) {}

  getAll(): Observable<Array<User> | any> {
    if(window.navigator.onLine) {
      return this.getFromService();
    } else {
      return this.getFromStorage();
    }
  }

  private getFromService(): Observable<Array<User> | any> {
    return this.http.get(this.LEADERBOARDS_URL, createRequestOptions())
      .map(res => res.json())
      .do(res => window.localStorage.setItem("leaderboards", JSON.stringify(res)))
      .catch(handleError);
  }

  private getFromStorage(): Observable<Array<User> | any> {
    let leaderboards = window.localStorage.getItem('leaderboards');
    if(leaderboards) {
      return Observable.from([JSON.parse(leaderboards)]);
    } else {
      return Observable.from([[]]);
    }
  }

}