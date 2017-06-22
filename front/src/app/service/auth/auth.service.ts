import { Injectable } from '@angular/core';

import {
  Http,
  RequestOptions,
  Headers,
  Response
} from '@angular/http';

import { Observable, ReplaySubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { handleError } from '../../util/error-handler';
import { createRequestOptions } from '../../util/request-options';
import { environment } from '../../../environments/environment';
import { SignInRequest } from '../../model/signin-request.model';
import { SignUpRequest } from '../../model/signup-request.model';
import { User } from '../../model/user.model';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService extends ReplaySubject<number> {

  private token: string;
  private username: string;
  private userId: number;
  private readonly SIGNIN_URL = environment.apiUrl + "api/auth/signin";
  private readonly SIGNUP_URL = environment.apiUrl + "api/auth/signup";

  constructor(
    private http: Http,
    private userService: UserService
  ) {
    super();
    this.refresh();
  }

  public refresh() {
    let userData = this.getUserDataFromStorage();
    if(userData) {
      let parsedUserData = this.parseUserData(userData);
      this.token = parsedUserData.token;
      this.userId = +parsedUserData.id;
      this.username = parsedUserData.name;
      this.next(this.userId);
    }
  }

  public signIn(signInRequest: SignInRequest) {
    return this.http
        .post(this.SIGNIN_URL, signInRequest.toString(), createRequestOptions())
        .map(res => this.processResponse(res))
        .catch(handleError);
  }

  public signUp(signUpRequest: SignUpRequest) {
    return this.http
        .post(this.SIGNUP_URL, signUpRequest.toString(), createRequestOptions())
        .map(res => this.processResponse(res))
        .catch(handleError);
  }

  public signOut() {
    this.token = null;
    this.username = null;
    this.userId = null;
    window.sessionStorage.removeItem('user');
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

  private processResponse(res: Response): void {
    this.saveToken(res);
    this.saveUserDetails(JSON.parse(window.sessionStorage.getItem('user')));
    this.userService.getById(this.userId)
      .subscribe(user => {
        this.userService.setUsers([user]);
      }, handleError);
  }

  private saveToken(res: Response): void {
    let token = res.json() && res.json().token;
    if(Boolean(token)) {
      let claims = this.getTokenClaims(token);
      claims.token = token;
      window.sessionStorage.setItem('user', JSON.stringify(claims));
    } else {
      throw Error(res.json());
    }
  }

  private saveUserDetails(user): void {
    this.token = user.token || '';
    this.username = user.name || '';
    this.userId = user.id || 0;
  }

  private getUserDataFromStorage(): string {
    return window.sessionStorage.getItem('user');
  }

  private parseUserData(userData: string): { token: string,  id: number, name: string } {
    let userDataObject = JSON.parse(userData);
    if(userData) {
      let claims = this.getTokenClaims(userData);
      return {
        token: userDataObject.token || '',
        id: claims.id,
        name: claims.name
      };
    }
  }

  private getTokenClaims(token: string) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

}