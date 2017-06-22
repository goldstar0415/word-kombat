import {
  async,
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed
} from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { SigninComponent } from './signin.component';
import { SocketService } from '../../service/socket/socket.service';
import { UserService } from '../../service/user/user.service';
import { AuthService } from '../../service/auth/auth.service';

describe('SigninComponent', () => {
  let signInComponent: SigninComponent;
  let signInFixture: ComponentFixture<SigninComponent>;
  let authService: AuthService;
  let authServiceSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule
      ],
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
         AuthService
      ],
      declarations: [
        SigninComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    signInFixture = TestBed.createComponent(SigninComponent);
    signInComponent = signInFixture.componentInstance;
    authService = signInFixture.debugElement.injector.get(AuthService);
    authServiceSpy = spyOn(authService, 'signIn')
      .and.returnValue(Observable.from([]));
    signInFixture.detectChanges();
  });

  it('should create component', () => {
    expect(signInComponent).toBeTruthy();
  });

  it('should call AuthService.signIn method', () => {
    signInComponent.onSubmit();
    signInFixture.whenStable().then(() => {
      expect(authServiceSpy.signIn).toHaveBeenCalled();
    });
  });

  it('should call AuthService.signIn method only once', () => {
    signInComponent.onSubmit();
    signInFixture.whenStable().then(() => {
      expect(authServiceSpy.signIn.callsCount).toEqual(1);
    });
  });

});
