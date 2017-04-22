import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { User } from '../../model/user.model';

@Injectable()
export class LeaderboardsService {

  constructor(private http: Http) {}

  getAll(): Observable<Array<User>> {
    return this.http.get('api/leaderboards')
      .map(res => res.json());
  }

}