import { TestBed, inject } from '@angular/core/testing';

import { LeaderboardsService } from './leaderboards.service';

describe('LeaderboardsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeaderboardsService]
    });
  });

  it('should ...', inject([LeaderboardsService], (service: LeaderboardsService) => {
    expect(service).toBeTruthy();
  }));
});
