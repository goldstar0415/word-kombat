import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchScoreComponent } from './match-score.component';

describe('MatchScoreComponent', () => {
  let matchScoreComponent: MatchScoreComponent;
  let matchScoreFixture: ComponentFixture<MatchScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchScoreComponent ]
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
