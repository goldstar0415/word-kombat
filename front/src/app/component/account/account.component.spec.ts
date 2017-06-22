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
  let accountFixture: ComponentFixture<AccountComponent>;
  let authService: AuthService;
  let userService: UserService;
  let authServiceSpy;
  let userServiceSpy;

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
    accountFixture = TestBed.createComponent(AccountComponent);
    accountComponent = accountFixture.componentInstance;

    authService = accountFixture.debugElement.injector.get(AuthService);

    authServiceSpy = spyOn(authService, 'getUserId').and.returnValue(1);

    userService = accountFixture.debugElement.injector.get(UserService);

    userServiceSpy = spyOn(userService, 'getById')
      .and.returnValue(Observable.from([new User()]));

    userServiceSpy = spyOn(userService, 'getNextRank')
      .and.returnValue(Observable.from([new Rank()]));
  });

  it('should create the component', async(() => {
    const component = accountFixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));

  it('should call AuthService.getUserId method', () => {
    accountComponent.ngOnInit();
    accountFixture.whenStable().then(() => {
      expect(authServiceSpy.getUserId).toHaveBeenCalled();
    });
  });

  it('should call AuthService.getUserId method only once', () => {
    accountComponent.ngOnInit();
    accountFixture.whenStable().then(() => {
      expect(authServiceSpy.getUserId.callsCount).toEqual(1);
    });
  });

  it('should call UserService.getById method', () => {
    accountComponent.ngOnInit();
    accountFixture.whenStable().then(() => {
      expect(userServiceSpy.getById).toHaveBeenCalled();
    });
  });

  it('should call UserService.getById method only once', () => {
    accountComponent.ngOnInit();
    accountFixture.whenStable().then(() => {
      expect(userServiceSpy.getById.callsCount).toEqual(1);
    });
  });

  it('should call UserService.getNextRank method', () => {
    accountComponent.ngOnInit();
    accountFixture.whenStable().then(() => {
      expect(userServiceSpy.getNextRank).toHaveBeenCalled();
    });
  });

  it('should call UserService.getNextRank method only once', () => {
    accountComponent.ngOnInit();
    accountFixture.whenStable().then(() => {
      expect(userServiceSpy.getNextRank.callsCount).toEqual(1);
    });
  });

});
