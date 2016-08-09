import { Component, Input, OnInit } from 'angular2/core';

const basePath = 'guess-word-app/app/components/chat/word-card/';

@Component({
  selector: 'word-card',
  templateUrl: basePath + 'word-card.html',
  styleUrls: [basePath + 'word-card.css']
})
export class WordCardComponent implements OnInit {

  @Input() private image;
  @Input() private hint;
  
  private currentWordIndex = 10;
  private isVolumeEnabled = true;
  private time = 0;

  ngOnInit() {
    let interval = setInterval(() => {
      if(this.time < 100) {
        this.time++;
      } else {
        this.time = 0;
      }
    }, 334);
  }

  public repeat() {
    // Some logic should be here...
  }

  public toggleVolume() {
    this.isVolumeEnabled = !this.isVolumeEnabled;
  }

}