import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Word } from '../../model/word.model';
import { SocketService } from '../socket/socket.service';
import { WordService } from './word.service';

describe('WordService', () => {

  let store;

  beforeEach(() => {
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
        { provide: SocketService, useValue: {socket: {on: new Function()}} },
        WordService
      ]
    });
  });

  beforeEach(() => {
    spyOn(localStorage, 'getItem').and.callFake(key => {
      return store[key];
    });

    spyOn(localStorage, 'setItem').and.callFake((key, value) => {
      return store[key] = value + '';
    });

    spyOn(localStorage, 'clear').and.callFake(() => {
      store = {};
    });
  })

  it('should return current word', inject([WordService], (wordService: WordService) => {
    const word = new Word(1, ['a']);
    store = {"currentWord" : word};
    const currentWord = wordService.getCurrentWord();
    expect(currentWord).toEqual({...word});
  }));

  it('should return empty word if storage is empty',
      inject([WordService], (wordService: WordService) => {
    store = {};
    const currentWord = wordService.getCurrentWord();
    expect(currentWord).toEqual(new Word());
  }));

  it('should return current word index', inject([WordService], (wordService: WordService) => {
    const index = 1;
    store = {"currentWordIndex" : 1};
    const currentWordIndex = wordService.getCurrentWordIndex();
    expect(currentWordIndex).toEqual(index);
  }));

  it('should return 0 if storage is empty', inject([WordService], (wordService: WordService) => {
    const index = 0;
    store = {};
    const currentWordIndex = wordService.getCurrentWordIndex();
    expect(currentWordIndex).toEqual(index);
  }));

});
