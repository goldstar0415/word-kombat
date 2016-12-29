import {
  Component,
  Input,
  OnInit
} from '@angular/core';

declare const __moduleName: any;

@Component({
  moduleId: __moduleName,
  selector: 'word-card',
  templateUrl: 'word-card.html',
  styleUrls: ['word-card.css']
})
export class WordCardComponent implements OnInit {

  @Input() private image;
  @Input() private hint;
  @Input() private currentWordIndex;

  private isVolumeEnabled = true;
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

  public repeat() {
    // Some logic should be here...
  }

  public toggleVolume() {
    this.isVolumeEnabled = !this.isVolumeEnabled;
  }

}