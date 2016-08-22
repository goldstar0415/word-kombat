import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';

import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user.model';

@Injectable()
export class LeadersService {

  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }


  getLeaders(): Observable<User[]> {
    return this.http.get('guess-word/leaderboards')
      .map(res => res.json());
  }

}