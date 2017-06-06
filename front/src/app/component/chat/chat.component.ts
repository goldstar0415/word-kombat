import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Rx';

import { WordService } from '../../service/word/word.service';
import { MatchService } from '../../service/match/match.service';
import { NetworkHealthService } from '../../service/network-health/network-health.service';
import { User } from '../../model/user.model';
import { Word } from '../../model/word.model';
import { Message } from '../../model/message.model';
import { Score } from '../../model/score.model';

@Component({
  selector: 'wk-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  scores: Array<Score>;
  word: Word;
  letters: Array<string>;
  typedWord: string;
  wordCounter = 0;
  isOnline = true;

  private wordsSubscription: Subscription;
  private matchSubscription: Subscription;
  private scoreSubscription: Subscription;

  constructor(
    private router: Router,
    private networkHealthService: NetworkHealthService,
    private wordService: WordService,
    private matchService: MatchService
  ) {}
  
  ngOnInit() {
    this.word = this.wordService.getCurrentWord();
    this.wordCounter = this.wordService.getCurrentWordIndex();
    this.typedWord = "";
    this.letters = this.word.letters.slice();

    this.networkHealthService.isOnline.subscribe(isOnline => {
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
      .subscribe(res => {
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
      let index = this.letters.indexOf(letter);
      if(index !== -1) {
        this.letters.splice(index, 1);
      }
    }

  }

}
