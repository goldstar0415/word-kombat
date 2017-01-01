import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import { Word } from "../../../models/word.model";

declare const __moduleName: any;

@Component({
  moduleId: __moduleName,
  selector: 'word-card',
  templateUrl: 'word-card.html',
  styleUrls: ['word-card.css']
})
export class WordCardComponent implements OnInit {

  @Input() private word: Word;
  @Input() private currentWordIndex;

  private time = 0;

  ngOnInit() {
    let interval = setInterval(() => {
      if(this.time < 100) {
        this.time++;
      } else {
        this.time = 1;
      }
    }, 334);
  }

}