import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchScoreComponent } from './match-score.component';

describe('MatchScoreComponent', () => {
  let component: MatchScoreComponent;
  let fixture: ComponentFixture<MatchScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
