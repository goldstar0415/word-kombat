import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordLettersComponent } from './word-letters.component';

describe('WordLettersComponent', () => {
  let component: WordLettersComponent;
  let fixture: ComponentFixture<WordLettersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordLettersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordLettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
