import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Rx';
import { NetworkStatusService } from 'ng-network-status';

import { WordService } from '../../service/word/word.service';
import { MatchService } from '../../service/match/match.service';
import { Word } from '../../model/word.model';
import { Score } from '../../model/score.model';

@Component({
  selector: 'wk-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [ NetworkStatusService ]
})
export class ChatComponent implements OnInit, OnDestroy {

  public scores: Array<Score>;
  public word: Word;
  public letters: Array<string> = [];
  public typedWord: string;
  public wordCounter = 0;
  public isOnline = true;

  private wordsSubscription: Subscription;
  private matchSubscription: Subscription;
  private scoreSubscription: Subscription;

  constructor(
    private readonly router: Router,
    private readonly networkStatusService: NetworkStatusService,
    private readonly wordService: WordService,
    private readonly matchService: MatchService
  ) {}

  ngOnInit() {
    this.word = this.wordService.getCurrentWord();
    this.wordCounter = this.wordService.getCurrentWordIndex();
    this.typedWord = "";
    this.letters = this.word.letters.slice();

    this.networkStatusService.healthCheck();

    this.networkStatusService.isOnline.subscribe(isOnline => {
      this.isOnline = isOnline;
    });

    this.wordsSubscription = this.wordService.getWords()
      .subscribe(res => {
        if(res && res.word && res.index) {
          this.word = res.word;
          this.wordCounter = res.index;
          this.letters = this.word.letters.slice();
        }
      });

    this.scores = this.matchService.getAllScores();

    this.scoreSubscription = this.matchService.getScores()
      .subscribe(scores => {
        this.scores = scores;
      });

    this.matchSubscription = this.matchService.isMatchOver()
      .subscribe(() => {
        this.router.navigate(['score']);
      });
  }

  ngOnDestroy() {
    this.wordsSubscription.unsubscribe();
    this.matchSubscription.unsubscribe();
    this.scoreSubscription.unsubscribe();
  }

  onLetterClicked(letter: string) {
    this.typedWord += letter;
  }

  onWordEntered(word: string) {
    this.typedWord = word;
    this.letters = this.word.letters.slice();

    for(let letter of word.toLowerCase().split('')) {
      const index = this.letters.indexOf(letter);
      if(index !== -1) {
        this.letters.splice(index, 1);
      }
    }
  }

}
