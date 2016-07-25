import { Component } from 'angular2/core';

const basePath = 'guess-word-app/app/components/chat/word-letters/';

@Component({
  selector: 'word-letters',
  templateUrl: basePath + 'word-letters.html',
  styleUrls: [basePath + 'word-letters.css']
})
export class WordLettersComponent {

  letters = ['d', 'r', 'a', 'n', 'o', 'm'];

}