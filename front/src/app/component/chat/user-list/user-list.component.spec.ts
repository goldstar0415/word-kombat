import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChanges, SimpleChange } from '@angular/core';

import { Score } from '../../../model/score.model';
import { User } from '../../../model/user.model';
import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let userListComponent: UserListComponent;
  let userListFixture: ComponentFixture<UserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    userListFixture = TestBed.createComponent(UserListComponent);
    userListComponent = userListFixture.componentInstance;
  });

  it('should create component', () => {
    const component = userListFixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should update scores', () => {
    let scores = [new Score(new User(), 10, 0), new Score(new User(), 20, 0)];
    userListComponent.scores = scores.slice();
    scores.push(new Score(new User(), 15, 0));
    userListComponent.scores = scores.slice();

    const changes: SimpleChanges = { prop1: new SimpleChange('', '', false) };

    userListComponent.ngOnChanges(changes);
    userListFixture.detectChanges();
    expect(userListComponent.scores).toEqual([scores[1], scores[2], scores[0]]);
  });
  
});
