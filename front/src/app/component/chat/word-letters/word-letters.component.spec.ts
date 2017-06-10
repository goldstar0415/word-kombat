import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordLettersComponent } from './word-letters.component';

describe('WordLettersComponent', () => {
  let wordLettersComponent: WordLettersComponent;
  let wordLettersFixture: ComponentFixture<WordLettersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordLettersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    wordLettersFixture = TestBed.createComponent(WordLettersComponent);
    wordLettersComponent = wordLettersFixture.componentInstance;
  });

  it('should create component', async(() => {
    const component = wordLettersFixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));

  it('should drop letter when it has been pressed', () => {
    wordLettersComponent.letters = ['w', 'o', 'r', 'd'];
    wordLettersComponent.onLetterPressed('o');
    wordLettersFixture.detectChanges();
    expect(wordLettersComponent.letters.includes('o')).toBeFalsy();
    expect(wordLettersComponent.letters.length).toEqual(3);
  });

  
});
