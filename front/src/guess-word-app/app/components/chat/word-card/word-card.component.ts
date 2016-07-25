import { Component } from 'angular2/core';

const basePath = 'guess-word-app/app/components/chat/word-card/';

@Component({
  selector: 'word-card',
  templateUrl: basePath + 'word-card.html',
  styleUrls: [basePath + 'word-card.css']
})
export class WordCardComponent {

  // Mock data
  public word = {
    value: "Random",
    image: 'images/words/words.jpg',
    hint: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, veritatis."
  }

  public currentWordIndex = 10;
  // End mock data

  public isVolumeEnabled = true;

  public repeat() {
    // Some logic should be here...
  }

  public toggleVolume() {
    this.isVolumeEnabled = !this.isVolumeEnabled;
  }

}