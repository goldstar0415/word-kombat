import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MockBackend } from '@angular/http/testing';

import { Observable } from 'rxjs/Observable';

import { User } from '../../../model/user.model';
import { UserInfoComponent } from './user-info.component';

describe('UserInfoComponent', () => {
  let userInfoComponent: UserInfoComponent;
  let userInfoFixture: ComponentFixture<UserInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInfoComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    userInfoFixture = TestBed.createComponent(UserInfoComponent);
    userInfoComponent = userInfoFixture.componentInstance;
  });

  it('should create component', async(() => {
    const component = userInfoFixture.debugElement.componentInstance;
    expect(component).toBeDefined();
  }));

  it('should create empty User object', () => {
    userInfoComponent.ngOnInit();
    expect(userInfoComponent.user).toBeDefined();
  });
  
  it('should create empty Rank object', () => {
    userInfoComponent.ngOnInit();
    expect(userInfoComponent.rank).toBeDefined();
  });

  it('should initialize chartData with a range', () => {
    userInfoComponent.ngOnInit();
    expect(userInfoComponent.chartData).toEqual([0, 100]);
  });

});
