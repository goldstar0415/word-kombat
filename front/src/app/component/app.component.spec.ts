import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let appComponent: AppComponent;
  let appComponentFixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents().then(() => {
      appComponentFixture = TestBed.createComponent(AppComponent);
      appComponent = appComponentFixture.componentInstance;
    });
  }));

  it('should create the app', async(() => {
    const app = appComponentFixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should contain wk-navigation component', async(() => {
    const wkNvigationComponent = appComponentFixture.debugElement.query(By.css('wk-navigation'));
    expect(wkNvigationComponent).toBeTruthy();
  }));

  it('should contain router-outlet', async(() => {
    const routerOutlet = appComponentFixture.debugElement.query(By.css('router-outlet'));
    expect(routerOutlet).toBeTruthy();
  }));

  it('should contain wk-page-footer component', async(() => {
    const wkPageFooter = appComponentFixture.debugElement.query(By.css('wk-page-footer'));
    expect(wkPageFooter).toBeTruthy();
  }));

});
