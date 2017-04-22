import {
  async,
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed
} from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { User } from '../../model/user.model';
import { Rank } from '../../model/rank.model';
import { AuthService } from '../../service/auth/auth.service';
import { UserService } from '../../service/user/user.service';
import { SocketService } from '../../service/socket/socket.service';
import { AccountComponent } from './account.component';

describe('AccountComponent', () => {
  let accountComponent: AccountComponent;
  let accountComponentFixture: ComponentFixture<AccountComponent>;
  let authService: AuthService;
  let userService: UserService;
  let authServiceSpy;
  let userServiceGetByIdSpy;
  let userServiceGetNextRankSpy;

  beforeEach(async(() => {
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
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: SocketService, useValue: {socket: {on: new Function()}} },
        UserService,
        AuthService
      ],
      declarations: [
        AccountComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    accountComponentFixture = TestBed.createComponent(AccountComponent);
    accountComponent = accountComponentFixture.componentInstance;

    authService = accountComponentFixture.debugElement.injector.get(AuthService);

    authServiceSpy = spyOn(authService, 'getUserId').and.returnValue(1);

    userService = accountComponentFixture.debugElement.injector.get(UserService);

    userServiceGetByIdSpy = spyOn(userService, 'getById')
      .and.returnValue(Observable.from([new User()]));

    userServiceGetNextRankSpy = spyOn(userService, 'getNextRank')
      .and.returnValue(Observable.from([new Rank()]));
  });

  it('should create the component', async(() => {
    const component = accountComponentFixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));

});
