import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChange
} from '@angular/core';

import { Score } from '../../../model/score.model';

@Component({
  selector: 'wk-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  
  @Input() scores: Array<Score>;

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if(this.scores) {
      this.scores = this.scores.sort((score1, score2) => {
        return score2.points - score1.points;
      });
    }
  }

}
