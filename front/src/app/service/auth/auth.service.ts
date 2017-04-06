import { Injectable } from '@angular/core';

import { Observable, ReplaySubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map'

import { User } from '../../model/user.model';
import { UserService } from '../../service/user/user.service';

@Injectable()
export class AuthService extends ReplaySubject<string> {

  private token: string;
  private username: string;
  private userId: number;
  
  constructor(private userService: UserService) {
    super();
    if(!!sessionStorage.getItem('token')) {
      this.token = sessionStorage.getItem('token');
      let claims = this.getTokenClaims(this.token);
      this.userId = claims.id;
      this.username = claims.name;
      this.next(this.username);
    }
  }

  public isAuthorized(): boolean {
    return !!this.userId || !!this.username || !!this.token;
  }

  public getUsername(): string {
    return this.username;
  }

  public getUserId(): number {
    return this.userId;
  }

  public getToken(): string {
    return this.token;
  }

  private getTokenClaims(token: string) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

}