import { Injectable } from '@angular/core';

import {
  Http,
  RequestOptions,
  Headers,
  Response
} from '@angular/http';

import { Observable, ReplaySubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map'

import { SignInRequest } from '../../model/signin-request.model';
import { SignUpRequest } from '../../model/signup-request.model';
import { User } from '../../model/user.model';
import { UserService } from '../../service/user/user.service';

@Injectable()
export class AuthService extends ReplaySubject<string> {

  private token: string;
  private username: string;
  private userId: number;
  
  constructor(
    private http: Http,
    private userService: UserService
  ) {
    super();
    let token = this.getTokenFromStorage();
    if(token) {
      let userData = this.parseToken(token);
      this.userId = userData.id;
      this.username = userData.name;
      this.next(this.username);
    }
  }

  public signIn(signInRequest: SignInRequest) {
    return this.http.post("/api/auth/login", signInRequest.toString(), this.getRequestOptions())
        .map(this.processResponse)
        .catch(error => {
          throw error.json();
        });
  }

  public signUp(signUpRequest: SignUpRequest) {
    return this.http.post("/api/auth/signup", signUpRequest.toString(), this.getRequestOptions())
        .map(this.processResponse)
        .catch(error => {
          throw error.json();
        });
  }

  public logout() {
    this.token = null;
    this.username = null;
    this.userId = null;
    window.sessionStorage.removeItem('token');
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

  private processResponse(res: Response) {
    this.saveToken(res);
    this.saveUserDetails(JSON.parse(window.sessionStorage.getItem('token')));
    this.next(this.username);
    this.userService.getById(this.userId)
      .subscribe(user => {
        this.userService.setUsers([user]);
      }, error => {
        throw error.json();
      });
  }

  private saveToken(res) {
    let response = res.json() && res.json().token;
    if (Boolean(response)) {
      let token = response;
      let claims = this.getTokenClaims(token);
      claims.token = token;
      sessionStorage.setItem('token', JSON.stringify(claims));
    } else {
      console.error(res.json());
      throw Error(res.json());
    }
  }

  private saveUserDetails(user) {
    this.token = user.token || '';
    this.username = user.name || '';
    this.userId = user.id || 0;
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

  private getRequestOptions(): RequestOptions {
    return new RequestOptions({
      headers: new Headers({
        "Content-Type": 'application/json'
      })
    });
  }

}