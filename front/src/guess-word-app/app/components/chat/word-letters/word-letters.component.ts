import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

const basePath = 'guess-word-app/app/components/chat/word-letters/';

@Component({
  selector: 'word-letters',
  templateUrl: basePath + 'word-letters.html',
  styleUrls: [basePath + 'word-letters.css']
})
export class WordLettersComponent {

  @Input() private letters: string[];
  @Output() private letterClicked = new EventEmitter<string>();

  dropLetter(letter: string) {
    this.letters.splice(this.letters.indexOf(letter), 1);
    this.letterClicked.emit(letter);
  }

}