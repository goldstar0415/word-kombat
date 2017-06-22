import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SocketService } from '../../service/socket/socket.service';
import { UserService } from '../../service/user/user.service';
import { AuthService } from '../../service/auth/auth.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [
        { provide: SocketService, useValue: {socket: {on: new Function()}} },
        { provide: UserService, useValue: {setSocket: new Function()} },
        { provide: AuthService, useValue: {setSocket: new Function()} },
        AuthGuard
      ]
    });
  });

  it('should create guard', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
