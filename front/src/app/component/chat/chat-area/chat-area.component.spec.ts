import {async, ComponentFixture, ComponentFixtureAutoDetect, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';

import {Observable} from 'rxjs/Observable';

import {Message} from '../../../model/message.model';
import {SocketService} from '../../../service/socket/socket.service';
import {MessageService} from '../../../service/message/message.service';
import {ChatAreaComponent} from './chat-area.component';

describe('ChatAreaComponent', () => {
  let chatAreaComponent: ChatAreaComponent;
  let chatAreaFixture: ComponentFixture<ChatAreaComponent>;
  let messageService: MessageService;
  let messageServiceSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ComponentFixtureAutoDetect, useValue: true},
        {provide: SocketService, useValue: {socket: {on: new Function()}}},
        MessageService
      ],
      declarations: [ChatAreaComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    chatAreaFixture = TestBed.createComponent(ChatAreaComponent);
    chatAreaComponent = chatAreaFixture.componentInstance;

    messageService = chatAreaFixture.debugElement.injector.get(MessageService);

    messageServiceSpy = spyOn(messageService, 'getMessages')
      .and.returnValue(Observable.from([[new Message(), new Message(), new Message()]]));
  });

  it('should create component', async(() => {
    const component = chatAreaFixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));

  it('should call MessageService.getMessages method', () => {
    chatAreaComponent.ngOnInit();
    chatAreaFixture.whenStable().then(() => {
      expect(messageServiceSpy.getMessages).toHaveBeenCalled();
    });
  });

  it('should call MessageService.getMessages method only once', () => {
    chatAreaComponent.ngOnInit();
    chatAreaFixture.whenStable().then(() => {
      expect(messageServiceSpy.getMessages.callsCount).toEqual(1);
    });
  });

});
