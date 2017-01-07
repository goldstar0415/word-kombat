import {
  Component,
  Input
} from '@angular/core';

import { Word } from "../../../models/word.model";

declare const __moduleName: any;

@Component({
  moduleId: __moduleName,
  selector: 'word-card',
  templateUrl: 'word-card.html',
  styleUrls: ['word-card.css']
})
export class WordCardComponent {

  @Input() private word: Word;
  @Input() private currentWordIndex: number;

  private amountOfWords = 10;

}