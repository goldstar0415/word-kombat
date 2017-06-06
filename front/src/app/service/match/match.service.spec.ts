import { TestBed, inject } from '@angular/core/testing';

import { SocketService } from '../socket/socket.service';
import { MatchService } from './match.service';

describe('MatchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SocketService, useValue: {socket: {on: new Function()}} },
        MatchService
      ]
    });
  });

  it('should return all scores',
      inject([MatchService], (matchService: MatchService) => {
    matchService.getScores().subscribe(score => {
      expect(score).toBeDefined();
      expect(score).not.toBeNull();
    });
  }));

});
