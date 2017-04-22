import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { LeaderboardsService } from './leaderboards.service';

describe('LeaderboardsService', () => {
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
        LeaderboardsService
      ]
    });
  });

  it('should return top 100 leaders',
      inject([LeaderboardsService], (leaderboardService: LeaderboardsService) => {
    
    leaderboardService.getAll().subscribe(leaders => {
      expect(leaders).toBeDefined();
      expect(leaders).not.toBeNull();
    });

  }));
});
