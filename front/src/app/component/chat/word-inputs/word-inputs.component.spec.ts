import {
  async,
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { User } from '../../../model/user.model';
import { SocketService } from '../../../service/socket/socket.service';
import { UserService } from '../../../service/user/user.service';
import { AuthService } from '../../../service/auth/auth.service';
import { MessageService } from '../../../service/message/message.service';
import { WordInputsComponent } from './word-inputs.component';

describe('WordInputsComponent', () => {
  let wordInputsComponent: WordInputsComponent;
  let wordInputsFixture: ComponentFixture<WordInputsComponent>;
  let authService: AuthService;
  let userService: UserService;
  let messageService: MessageService;
  let authServiceSpy;
  let userServiceSpy;
  let messageServiceSpy;

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
        AuthService,
        UserService,
        MessageService
      ],
      declarations: [ WordInputsComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    wordInputsFixture = TestBed.createComponent(WordInputsComponent);
    wordInputsComponent = wordInputsFixture.componentInstance;

    authService = wordInputsFixture.debugElement.injector.get(AuthService);
    userService = wordInputsFixture.debugElement.injector.get(UserService);
    messageService = wordInputsFixture.debugElement.injector.get(MessageService);

    authServiceSpy = spyOn(authService, 'getUserId').and.returnValue(1);

    userServiceSpy = spyOn(userService, 'getById')
      .and.returnValue(Observable.from([new User()]));

    messageServiceSpy = spyOn(messageService, 'sendMessage');
  });

  it('should create component', async(() => {
    const component = wordInputsFixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));

  it('should call AuthService.getUserId method', () => {
    wordInputsComponent.ngOnInit();
    wordInputsFixture.whenStable().then(() => {
      expect(authServiceSpy.getUserId).toHaveBeenCalled();
    });
  });
  
  it('should call AuthService.getUserId method only once', () => {
    wordInputsComponent.ngOnInit();
    wordInputsFixture.whenStable().then(() => {
      expect(authServiceSpy.getUserId.callsCount).toEqual(1);
    });
  });

  it('should call UserService.getUserId method', () => {
    wordInputsComponent.ngOnInit();
    wordInputsFixture.whenStable().then(() => {
      expect(userServiceSpy.getById).toHaveBeenCalled();
    });
  });
  
  it('should call UserService.getUserId method only once', () => {
    wordInputsComponent.ngOnInit();
    wordInputsFixture.whenStable().then(() => {
      expect(userServiceSpy.getById.callsCount).toEqual(1);
    });
  });

  it('should call MessageService.sendMessage method', () => {
    wordInputsComponent.word = "random word";
    wordInputsComponent.onMessageSent();
    wordInputsFixture.whenStable().then(() => {
      expect(messageServiceSpy.sendMessage).toHaveBeenCalled();
    });
  });
  
  it('should call MessageService.sendMessage method only once', () => {
    wordInputsComponent.word = "random word";
    wordInputsComponent.onMessageSent();
    wordInputsFixture.whenStable().then(() => {
      expect(messageServiceSpy.sendMessage.callsCount).toEqual(1);
    });
  });

});
