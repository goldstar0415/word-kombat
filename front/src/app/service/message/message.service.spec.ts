import { TestBed, inject } from '@angular/core/testing';

import { SocketService } from '../socket/socket.service';
import { MessageService } from './message.service';

describe('MessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SocketService, useValue: {socket: {on: new Function()}} },
        MessageService
      ]
    });
  });

  it('should return all messages',
      inject([MessageService], (messageService: MessageService) => {
    messageService.getMessages().subscribe(message => {
      expect(message).toBeDefined();
      expect(message).not.toBeNull();
    });
  }));

});
