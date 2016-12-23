import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/Rx'
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user.model';

@Injectable()
export class LeadersService {

  constructor(private http: Http) {
  }

  getLeaders(): Observable<User[]> {
    return this.http.get('guess-word/leaderboards')
      .map(res => res.json());
  }

}