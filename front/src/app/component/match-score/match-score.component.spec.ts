import {
  async,
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed
} from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { SocketService } from '../../service/socket/socket.service';
import { MatchService } from '../../service/match/match.service';
import { MatchScoreComponent } from './match-score.component';

describe('MatchScoreComponent', () => {
  let matchScoreComponent: MatchScoreComponent;
  let matchScoreFixture: ComponentFixture<MatchScoreComponent>;

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
        MatchService
      ],
      declarations: [ MatchScoreComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents().then(() => {
      matchScoreFixture = TestBed.createComponent(MatchScoreComponent);
      matchScoreComponent = matchScoreFixture.componentInstance;
    });
  }));

  it('should create component', () => {
    const matchScoreComponent = matchScoreFixture.debugElement.componentInstance;
    expect(matchScoreComponent).toBeTruthy();
  });
  
});
