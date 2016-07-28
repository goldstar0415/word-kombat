import { Component, Input, Output, EventEmitter } from 'angular2/core';

const basePath = 'guess-word-app/app/components/chat/word-inputs/';

@Component({
  selector: 'word-inputs',
  templateUrl: basePath + 'word-inputs.html',
  styleUrls: [basePath + 'word-inputs.css']
})
export class WordInputsComponent {

  @Input() private word: string;

  @Output() private wordEntered = new EventEmitter<string>();

  enterLetter(word: string) {
    this.word = word;
    this.wordEntered.emit(this.word);
  }

  deleteLastLetter() {
    const len = this.word.length;

    if(len === 1) {
      this.word = "";
    } else if(len > 1) {
      this.word = this.word.substring(0, len - 1);
    }

    this.wordEntered.emit(this.word);
  }

  sendMessage() {
    this.word = "";
    this.wordEntered.emit(this.word);
  }

}