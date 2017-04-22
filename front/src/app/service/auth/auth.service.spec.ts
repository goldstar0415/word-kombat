import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { SocketService } from '../socket/socket.service';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let store = {};

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." 
    + "eyJpZCI6IjEiLCJuYW1lIjoidXNlciJ9." // {"id": "1", "name": "user"}
    + "PUHflJtYA6kdUev8BwbC_a1GBi3SCCWxQstZQGBYY7g";

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        { provide: SocketService, useValue: {socket: {on: new Function()}} },
        UserService,
        AuthService
      ]
    });
  });

  beforeEach(() => {
    store = {token: token};

    spyOn(sessionStorage, 'getItem').and.callFake(key => {
      return store[key];
    });
  });

  it('should return token if exists', inject([AuthService], (authService: AuthService) => {
    const retrievedToken = authService.getToken();
    expect(retrievedToken).toBeDefined();
    expect(retrievedToken).not.toBeNull();
    expect(retrievedToken).toEqual(token);
  }));

  it('should return undefined if token does not exists',
      inject([AuthService], (authService: AuthService) => {
    store = {};
    const retrievedToken = authService.getToken();
    expect(retrievedToken).toBeUndefined();
  }));

  it('should return userId if exists', inject([AuthService], (authService: AuthService) => {
    const userId = authService.getUserId();
    expect(userId).toBeDefined();
    expect(userId).not.toBeNull();
    expect(userId).toEqual(1);
  }));

  it('should return undefined if userId does not exists',
      inject([AuthService], (authService: AuthService) => {
    store = {};
    const userId = authService.getUserId();
    expect(userId).toBeUndefined();
  }));

  it('should return username if exists', inject([AuthService], (authService: AuthService) => {
    const username = authService.getUsername();
    expect(username).toBeDefined();
    expect(username).not.toBeNull();
    expect(username).toEqual("user");
  }));

  it('should return undefined if username does not exists',
      inject([AuthService], (authService: AuthService) => {
    store = {};
    const username = authService.getUsername();
    expect(username).toBeUndefined();
  }));

  describe('isAuthorized method', () => {

    it('should true token exists', inject([AuthService], (authService: AuthService) => {
      const isAuthorized = authService.isAuthorized();
      expect(isAuthorized).toBeTruthy();
    }));

    it('should false token does not exists', inject([AuthService], (authService: AuthService) => {
      store = {};
      const isAuthorized = authService.isAuthorized();
      expect(isAuthorized).toBeFalsy();
    }));

  });

});
