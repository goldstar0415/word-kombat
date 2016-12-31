import {
  Component,
  OnInit,
  Input,
  SimpleChange
} from '@angular/core';

import { User } from '../../../models/user.model';
import { Rank } from '../../../models/rank.model';

declare const __moduleName: string;
declare const Chart: any;
declare const $: any;

@Component({
  moduleId: __moduleName,
  selector: 'user-info',
  templateUrl: 'user-info.html',
  styleUrls: ['user-info.css']
})
export class UserInfoComponent implements OnInit {

  @Input() private user: User;
  @Input() private rank: Rank;

  private chartData: Array<Number>;

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if(changes['user']) {
      this.user = changes['user'].currentValue;
    }

    if(changes['rank']) {
      this.rank = changes['rank'].currentValue;
    }

    let achived = 100 - (this.rank.minScore - this.user.score) / this.rank.minScore * 100;
    achived = Math.round(achived * 100) / 100;

    this.chartData = [achived, 100 - achived];

    const data = {
      labels: ["Actual", "Remains"],
      datasets: [{
        data: this.chartData,
        backgroundColor: ["#00695C", "#757575"],
        hoverBackgroundColor: ["#00897B", "#9E9E9E"]
      }]
    };

    const ctx = $("#progress");
    let userProgressChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {}
    });

  }

  ngOnInit() {
    this.user = new User();
    this.rank = new Rank();
    this.chartData = [0, 100];
  }

}