import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { SocketService } from '../socket/socket.service';
import { UserService } from './user.service';

describe('UserService', () => {
  let storage;
  let userServiceSpy;

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
        UserService
      ]
    });
  });

  beforeEach(() => {
    storage = {};

    spyOn(localStorage, 'getItem').and.callFake(key => {
      return storage[key];
    });
  });

  it('should return all users', inject([UserService], (userService: UserService) => {
    // TODO
  }));

  it('should return userId from localStorage',
    inject([UserService], (userService: UserService) => {
    
    spyOn(navigator, 'onLine').and.returnValue(false);

    storage = {user: { id : 1 }};

    userService.getById(1).subscribe(id => {
      expect(id).toEqual(storage.user.id);
    });

  }));

  it('should return rank from localStorage',
    inject([UserService], (userService: UserService) => {
    
    spyOn(navigator, 'onLine').and.returnValue(false);

    storage = {rank: 1 };

    userService.getNextRank(500).subscribe(rank => {
      expect(rank).toEqual(storage.rank);
    });

  }));

});
