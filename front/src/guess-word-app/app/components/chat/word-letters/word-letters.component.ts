import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'word-letters',
  templateUrl: 'word-letters.html',
  styleUrls: ['word-letters.css']
})
export class WordLettersComponent {

  @Input() private letters: string[];
  @Output() private letterClicked = new EventEmitter<string>();

  dropLetter(letter: string) {
    this.letters.splice(this.letters.indexOf(letter), 1);
    this.letterClicked.emit(letter);
  }

}