import {
  async,
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed
} from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Word } from '../../model/word.model';
import { User } from '../../model/user.model';
import { NetworkHealthService } from '../../service/network-health/network-health.service';
import { SocketService } from '../../service/socket/socket.service';
import { UserService } from '../../service/user/user.service';
import { WordService } from '../../service/word/word.service';
import { ChatComponent } from './chat.component';

describe('ChatComponent', () => {
  let chatComponent: ChatComponent;
  let chatFixture: ComponentFixture<ChatComponent>;
  let userService: UserService;
  let wordService: WordService;
  let userServiceSpy;
  let wordServiceSpy;

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
        {
          provide: NetworkHealthService,
          useValue: { isOnline: Observable.from([true]) }
        },
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: SocketService, useValue: {socket: {on: new Function()}} },
        UserService,
        WordService
      ],
      declarations: [ ChatComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    chatFixture = TestBed.createComponent(ChatComponent);
    chatComponent = chatFixture.componentInstance;

    userService = chatFixture.debugElement.injector.get(UserService);
    wordService = chatFixture.debugElement.injector.get(WordService);

    userServiceSpy = spyOn(userService, 'subscribe')
      .and.returnValue(Observable.from([[new User(), new User(), new User()]]));

    userServiceSpy = spyOn(userService, 'getAll')
      .and.returnValue([new User(), new User(), new User()]);

    wordServiceSpy = spyOn(wordService, 'getCurrentWord')
      .and.returnValue(new Word());

    wordServiceSpy = spyOn(wordService, 'getCurrentWordIndex')
      .and.returnValue(1);

    wordServiceSpy = spyOn(wordService, 'getWords')
      .and.returnValue(Observable.from([[new Word(), new Word(), new Word()]]));
  });

  it('should create component', async(() => {
    const component = chatFixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));

  it('should call UserService.getAll method', () => {
    chatComponent.ngOnInit();
    chatFixture.whenStable().then(() => {
      expect(userServiceSpy.getAll).toHaveBeenCalled();
    });
  });

  it('should call UserService.getAll method only once', () => {
    chatComponent.ngOnInit();
    chatFixture.whenStable().then(() => {
      expect(userServiceSpy.getAll.callsCount).toEqual(1);
    });
  });

  it('should call UserService.subscribe method', () => {
    chatComponent.ngOnInit();
    chatFixture.whenStable().then(() => {
      expect(userServiceSpy.subscribe).toHaveBeenCalled();
    });
  });

  it('should call UserService.subscribe method only once', () => {
    chatComponent.ngOnInit();
    chatFixture.whenStable().then(() => {
      expect(userServiceSpy.subscribe.callsCount).toEqual(1);
    });
  });

  it('should call WordService.getCurrentWord method', () => {
    chatComponent.ngOnInit();
    chatFixture.whenStable().then(() => {
      expect(wordServiceSpy.getCurrentWord).toHaveBeenCalled();
    });
  });

  it('should call WordService.getCurrentWord method only once', () => {
    chatComponent.ngOnInit();
    chatFixture.whenStable().then(() => {
      expect(wordServiceSpy.getCurrentWord.callsCount).toEqual(1);
    });
  });

  it('should call WordService.getCurrentWordIndex method', () => {
    chatComponent.ngOnInit();
    chatFixture.whenStable().then(() => {
      expect(wordServiceSpy.getCurrentWordIndex).toHaveBeenCalled();
    });
  });

  it('should call WordService.getCurrentWordIndex method only once', () => {
    chatComponent.ngOnInit();
    chatFixture.whenStable().then(() => {
      expect(wordServiceSpy.getCurrentWordIndex.callsCount).toEqual(1);
    });
  });

  it('should call WordService.getWords method', () => {
    chatComponent.ngOnInit();
    chatFixture.whenStable().then(() => {
      expect(wordServiceSpy.getWords).toHaveBeenCalled();
    });
  });

  it('should call WordService.getWords method only once', () => {
    chatComponent.ngOnInit();
    chatFixture.whenStable().then(() => {
      expect(wordServiceSpy.getWords.callsCount).toEqual(1);
    });
  });

  describe('OnLetterClicked method', () => {

    it('should append letter into typedWord', async(() => {
      chatComponent.typedWord = '';
      const letter = 'A';
      chatComponent.onLetterClicked(letter);
      chatFixture.detectChanges();
      expect(chatComponent.typedWord.length).toEqual(1);
      expect(chatComponent.typedWord.substring(chatComponent.typedWord.length - 1)).toEqual(letter);
    }));

  });

  describe('OnWordEntered method', () => {

    it('should assign a word to the typedWord', async(() => {
      chatComponent.typedWord = '';
      const word = "RANDOM";
      chatComponent.onWordEntered(word);
      chatFixture.detectChanges();
      expect(chatComponent.typedWord).toEqual(word);
    }));

    it('should drop common letters', async(() => {
      chatComponent.word = new Word(0, ['s', 'o', 'm', 'e']);
      chatComponent.typedWord = '';
      const word = "stuff";
      chatComponent.onWordEntered(word);
      chatFixture.detectChanges();
      expect(chatComponent.letters.length).toEqual(3);
      expect(chatComponent.letters).not.toContain('S');
    }));

    it('should drop all letters if correct word has been entered', async(() => {
      chatComponent.word = new Word(0, ['s', 'o', 'm', 'e']);
      chatComponent.typedWord = '';
      const word = "some";
      chatComponent.onWordEntered(word);
      chatFixture.detectChanges();
      expect(chatComponent.letters.length).toEqual(0);
    }));

  });

});
