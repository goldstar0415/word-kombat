import {Injectable} from '@angular/core';

import {ReplaySubject} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {environment} from '../../../environments/environment';
import {SignInRequest} from '../../model/signin-request.model';
import {SignUpRequest} from '../../model/signup-request.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { User } from '../../model/user.model';

@Injectable()
export class AuthService extends ReplaySubject<number> {

  private token: string;
  private username: string;
  private userId: number;

  private readonly SIGNIN_URL = environment.apiUrl + 'api/auth/signin';
  private readonly SIGNUP_URL = environment.apiUrl + 'api/auth/signup';

  constructor(private http: HttpClient) {
    super();
    this.refresh();
  }

  signIn(signInRequest: SignInRequest): Observable<any> {
    return this.http
      .post(this.SIGNIN_URL, signInRequest)
      .do(this.processResponse);
  }

  signUp(signUpRequest: SignUpRequest): Observable<any> {
    return this.http
      .post(this.SIGNUP_URL, signUpRequest)
      .do(this.processResponse);
  }

  refresh() {
    const userData = this.getUserDataFromStorage();
    if (userData) {
      this.token = userData.token;
      this.userId = Number(userData.id);
      this.username = userData.name;
      this.next(this.userId);
    }
  }

  signOut() {
    this.token = null;
    this.username = null;
    this.userId = null;
    localStorage.removeItem('user');
  }

  isAuthorized(): boolean {
    return Boolean(this.token);
  }

  getUsername(): string {
    return this.username;
  }

  getUserId(): number {
    return this.userId;
  }

  getToken(): string {
    return this.token;
  }

  getUser(): User & {token: string} | null {
    const user = window.localStorage.getItem('user');

    if (user) {
      return JSON.parse(user);
    } else {
      return null;
    }
  }

  private processResponse(res: any): void {
    const token = res.token;

    if (token) {
      const user = res.user;

      this.userId = user.id;
      this.username = user.name;
      this.token = user.token;

      localStorage.setItem('user', JSON.stringify(Object.assign(user, {token})));
    }
  }

  private getUserDataFromStorage(): any {
    const data = localStorage.getItem('user');

    if (data) {
      return JSON.parse(data);
    } else {
      return null
    }
  }

}
