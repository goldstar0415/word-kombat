import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'wk-word-letters',
  templateUrl: './word-letters.component.html',
  styleUrls: ['./word-letters.component.scss']
})
export class WordLettersComponent {

  @Input() letters: string[];
  @Output() private letterClicked = new EventEmitter<string>();

  dropLetter(letter: string) {
    this.letters.splice(this.letters.indexOf(letter), 1);
    this.letterClicked.emit(letter);
  }

}
