import { Component, Input } from '@angular/core';

import { Word } from '../../../model/word.model';

@Component({
  selector: 'wk-word-card',
  templateUrl: './word-card.component.html',
  styleUrls: ['./word-card.component.scss']
})
export class WordCardComponent {

  @Input() word: Word;
  @Input() currentWordIndex: number;

  amountOfWords = 10;

  getProgress(): string {
    return (this.currentWordIndex / this.amountOfWords * 100) + '%'
  }

}
