import {
  async,
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed
} from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { User } from '../../model/user.model';
import { SocketService } from '../../service/socket/socket.service';
import { UserService } from '../../service/user/user.service';
import { AuthService } from '../../service/auth/auth.service';
import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  let navigationComponent: NavigationComponent;
  let navigationFixture: ComponentFixture<NavigationComponent>;
  let userService: UserService;
  let authService: AuthService;
  let userServiceSpy;
  let authServiceSpy;

  const MOCK_USERS = [ new User(), new User(), new User() ];

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
      declarations: [ NavigationComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    navigationFixture = TestBed.createComponent(NavigationComponent);
    navigationComponent = navigationFixture.componentInstance;

    authService = navigationFixture.debugElement.injector.get(AuthService);
    userService = navigationFixture.debugElement.injector.get(UserService);

    authServiceSpy = spyOn(authService, 'isAuthorized').and.returnValue(true);
    userServiceSpy = spyOn(userService, 'getAll').and.returnValue(MOCK_USERS);
    userServiceSpy = spyOn(userService, 'subscribe').and.returnValue(Observable.from([MOCK_USERS]));
  });

  it('should create component', async(() => {
    const component = navigationFixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));
  
  it('should call UserService.getAll method', () => {
    navigationComponent.ngOnInit();
    navigationFixture.whenStable().then(() => {
      expect(userServiceSpy.getAll).toHaveBeenCalled();
    });
  });

  it('should call UserService.getAll method only once', () => {
    navigationComponent.ngOnInit();
    navigationFixture.whenStable().then(() => {
      expect(userServiceSpy.getAll.callsCount).toEqual(1);
    });
  });

  it('should call UserService.subscribe method', () => {
    navigationComponent.ngOnInit();
    navigationFixture.whenStable().then(() => {
      expect(userServiceSpy.subscribe).toHaveBeenCalled();
    });
  });

  it('should call UserService.subscribe method only once', () => {
    navigationComponent.ngOnInit();
    navigationFixture.whenStable().then(() => {
      expect(userServiceSpy.subscribe.callsCount).toEqual(1);
    });
  });

  it('should call AuthService.isAuthorized method', () => {
    navigationComponent.isAuthorized();
    navigationFixture.whenStable().then(() => {
      expect(authServiceSpy.isAuthorized).toHaveBeenCalled();
    });
  });

  it('should call AuthService.isAuthorized method only once', () => {
    navigationComponent.isAuthorized();
    navigationFixture.whenStable().then(() => {
      expect(authServiceSpy.isAuthorized.callsCount).toEqual(1);
    });
  });

  it('should return appropriate value when isAuthorized called', () => {
    const isAuthorized = navigationComponent.isAuthorized();
    navigationFixture.whenStable().then(() => {
      expect(isAuthorized).toEqual(authService.isAuthorized());
    });
  });

});
