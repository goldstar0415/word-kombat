import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let appComponent: AppComponent;
  let appFixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents().then(() => {
      appFixture = TestBed.createComponent(AppComponent);
      appComponent = appFixture.componentInstance;
    });
  }));

  it('should create the app', async(() => {
    const app = appFixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should contain wk-navigation component', async(() => {
    const wkNvigationComponent = appFixture.debugElement.query(By.css('wk-navigation'));
    expect(wkNvigationComponent).toBeTruthy();
  }));

  it('should contain router-outlet', async(() => {
    const routerOutlet = appFixture.debugElement.query(By.css('router-outlet'));
    expect(routerOutlet).toBeTruthy();
  }));

  it('should contain wk-page-footer component', async(() => {
    const wkPageFooter = appFixture.debugElement.query(By.css('wk-page-footer'));
    expect(wkPageFooter).toBeTruthy();
  }));

});
