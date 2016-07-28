import { Component, Input } from 'angular2/core';

const basePath = 'guess-word-app/app/components/chat/word-card/';

@Component({
  selector: 'word-card',
  templateUrl: basePath + 'word-card.html',
  styleUrls: [basePath + 'word-card.css']
})
export class WordCardComponent {

  @Input() private image;
  @Input() private hint;
  
  public currentWordIndex = 10;

  public isVolumeEnabled = true;

  public repeat() {
    // Some logic should be here...
  }

  public toggleVolume() {
    this.isVolumeEnabled = !this.isVolumeEnabled;
  }

}