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
    let token = this.getTokenFromStorage();
    if(token) {
      let userData = this.parseToken(token);
      this.userId = userData.id;
      this.username = userData.name;
      this.next(this.username);
    }
  }

  public isAuthorized(): boolean {
    return Boolean(this.token);
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

  private getTokenFromStorage(): string {
    return window.sessionStorage.getItem('token');
  }

  private parseToken(token: string): { id: number, name: string } {
    this.token = token;
    let claims = this.getTokenClaims(this.token);
    return {
      id: claims.id,
      name: claims.name
    };
  }

  private getTokenClaims(token: string) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

}