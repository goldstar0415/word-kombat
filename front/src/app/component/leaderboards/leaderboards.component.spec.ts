import {
  async,
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed
} from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';

import { Http, BaseRequestOptions } from '@angular/http';
import { By } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';

import { LeaderboardsService } from '../../service/leaderboards/leaderboards.service';
import { LeaderboardsComponent } from './leaderboards.component';
import { User } from '../../model/user.model';
import { Rank } from '../../model/rank.model';

describe('LeaderboardsComponent', () => {
  let leaderboardsComponent: LeaderboardsComponent;
  let leaderboardsFixture: ComponentFixture<LeaderboardsComponent>;
  let leaderboardsService: LeaderboardsService;
  let leaderboardsServiceSpy;

  const TEST_LEADERS = [
    new User(),
    new User(),
    new User()
  ];

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
        LeaderboardsService
      ],
      declarations: [
        LeaderboardsComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    leaderboardsFixture = TestBed.createComponent(LeaderboardsComponent);
    leaderboardsComponent = leaderboardsFixture.componentInstance;

    leaderboardsService = leaderboardsFixture
      .debugElement.injector.get(LeaderboardsService);

    leaderboardsServiceSpy = spyOn(leaderboardsService, 'getAll')
      .and.returnValue(Observable.from([TEST_LEADERS]));

  });

  it('should create component', async(() => {
    const component = leaderboardsFixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));

  it('should call leaderboardsService.getAll() method', () => {
    leaderboardsFixture.whenStable().then(() => {
      expect(leaderboardsServiceSpy.getAll).toHaveBeenCalled();
    });
  });

  it('should call leaderboardsService.getAll() method only once', () => {
    leaderboardsFixture.whenStable().then(() => {
      expect(leaderboardsServiceSpy.getAll.callCount).toEqual(1);
    });
  });

  describe('Rows rendering', () => {

    const mockLeaders = [
      new User(0, "user1@email.com", "user1", 300, "user1.png", new Rank(0, '1', 200, 'rank1.png')),
      new User(1, "user2email.com", "user2", 1000, "user2png", new Rank(0, '2', 1000, 'rank2png')),
      new User(2, "user3email.com", "user3", 1300, "user3png", new Rank(0, '2', 1000, 'rank2.png'))
    ];

    let rows: Array<any>;

    beforeEach(() => {
      leaderboardsComponent.leaders = mockLeaders;
      leaderboardsFixture.autoDetectChanges();
      rows = leaderboardsFixture.debugElement.queryAll(By.css('tbody > tr'));
    })

    it('should not render null or undefined row nodes', async(() => {
      expect(rows).toBeDefined();
      expect(rows).not.toBeNull();
    }));

    it('should render appropriate number of records', async(() => {
      expect(rows.length).toBe(mockLeaders.length);
    }));

    it('should render positions in appropriate records', async(() => {
      rows.forEach((row, index) => {
        const position = row.query(By.css("td.position"));
        expect(position).toBeDefined();
        expect(position).not.toBeNull();
        expect(position.nativeElement.textContent).toEqual(String(index + 1));
      });
    }));

    it('should render icons in appropriate records', async(() => {
      rows.forEach((row, index) => {
        const icon = row.query(By.css("td.icon > img"));
        expect(icon).toBeDefined();
        expect(icon).not.toBeNull();
        expect(icon.nativeElement).toBeDefined();
        expect(icon.nativeElement.src).toContain(mockLeaders[index].icon);
      });
    }));

    it('should render names in appropriate records', async(() => {
      rows.forEach((row, index) => {
        const name = row.query(By.css("td.name"));
        expect(name).toBeDefined();
        expect(name).not.toBeNull();
        expect(name.nativeElement.textContent).toEqual(mockLeaders[index].name);
      });
    }));

    it('should render scores in appropriate records', async(() => {
      rows.forEach((row, index) => {
        const score = row.query(By.css("td.score"));
        expect(score).toBeDefined();
        expect(score).not.toBeNull();
        expect(score.nativeElement.textContent).toEqual(String(mockLeaders[index].score));
      });
    }));

    it('should render ranks in appropriate records', async(() => {
      rows.forEach((row, index) => {
        const rank = row.query(By.css("td.rank > img"));
        expect(rank).toBeDefined();
        expect(rank).not.toBeNull();
        expect(rank.nativeElement).toBeDefined();
        expect(rank.nativeElement.src).toContain(mockLeaders[index].rank.image);
      });
    }));

  });

});