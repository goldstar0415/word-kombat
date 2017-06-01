import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChange
} from '@angular/core';

import { Chart } from 'chart.js';
import * as $ from 'jquery';

import { User } from '../../../model/user.model';
import { Rank } from '../../../model/rank.model';

@Component({
  selector: 'wk-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnChanges {

  @Input() user: User;
  @Input() rank: Rank;

  chartData: Array<Number>;

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
