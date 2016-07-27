import { Component, Input } from 'angular2/core';

const basePath = 'guess-word-app/app/components/chat/word-inputs/';

@Component({
  selector: 'word-inputs',
  templateUrl: basePath + 'word-inputs.html',
  styleUrls: [basePath + 'word-inputs.css']
})
export class WordInputsComponent {

  @Input() letter: string;

}