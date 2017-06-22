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
import { Score } from '../../model/score.model';
import { SocketService } from '../../service/socket/socket.service';
import { UserService } from '../../service/user/user.service';
import { AuthService } from '../../service/auth/auth.service';
import { MatchService } from '../../service/match/match.service';
import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  let navigationComponent: NavigationComponent;
  let navigationFixture: ComponentFixture<NavigationComponent>;
  let matchService: MatchService;
  let authService: AuthService;
  let matchServiceSpy;
  let authServiceSpy;

  const MOCK_SCORES = [ new Score(), new Score(), new Score() ];

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
        { provide: UserService, useValue: {setSocket: new Function()} },
        MatchService,
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
    matchService = navigationFixture.debugElement.injector.get(MatchService);

    authServiceSpy = spyOn(authService, 'isAuthorized').and.returnValue(true);
    matchServiceSpy = spyOn(matchService, 'getAllScores').and.returnValue(MOCK_SCORES);
    matchServiceSpy = spyOn(matchService, 'getScores').and.returnValue(Observable.from([MOCK_SCORES]));
  });

  it('should create component', async(() => {
    const component = navigationFixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));
  
  it('should call MatchService.getAllScores method', () => {
    navigationComponent.ngOnInit();
    navigationFixture.whenStable().then(() => {
      expect(matchServiceSpy.getAllScores).toHaveBeenCalled();
    });
  });

  it('should call MatchService.getAllScores method only once', () => {
    navigationComponent.ngOnInit();
    navigationFixture.whenStable().then(() => {
      expect(matchServiceSpy.getAllScores.callsCount).toEqual(1);
    });
  });

  it('should call MatchService.getScores method', () => {
    navigationComponent.ngOnInit();
    navigationFixture.whenStable().then(() => {
      expect(matchServiceSpy.getScores).toHaveBeenCalled();
    });
  });

  it('should call MatchService.getScores method only once', () => {
    navigationComponent.ngOnInit();
    navigationFixture.whenStable().then(() => {
      expect(matchServiceSpy.getScores.callsCount).toEqual(1);
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
