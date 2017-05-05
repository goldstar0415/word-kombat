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

import { SignupComponent } from './signup.component';
import { SocketService } from '../../service/socket/socket.service';
import { UserService } from '../../service/user/user.service';
import { AuthService } from '../../service/auth/auth.service';
import { MessageService } from '../../service/message/message.service';
import { WordService } from '../../service/word/word.service';

describe('SignupComponent', () => {
  let signUpComponent: SignupComponent;
  let signUpFixture: ComponentFixture<SignupComponent>;

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
         { provide: WordService, useValue: {setSocket: new Function()} },
         { provide: MessageService, useValue: {setSocket: new Function()} },
         { provide: UserService, useValue: {setSocket: new Function()} },
         AuthService
      ],
      declarations: [
        SignupComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    signUpFixture = TestBed.createComponent(SignupComponent);
    signUpComponent = signUpFixture.componentInstance;
    signUpFixture.detectChanges();
  });

  it('should create component', () => {
    expect(signUpComponent).toBeTruthy();
  });
});
