import { Component, OnInit } from 'angular2/core';

const basePath = 'guess-word-app/app/components/account/user-info/user-progress/';

declare let Chart:any;
declare let $:any;

@Component({
  selector: 'user-progress',
  templateUrl: basePath + 'user-progress.html',
  styleUrls: [basePath + 'user-progress.css']
})
export class UserProgressComponent implements OnInit {

  private data: Array<Number>;

  constructor() {

  }

  ngOnInit() {
    this.data = [82, 12];

    const data = {
      labels: ["Actual", "Remains"],
      datasets: [{
        data: this.data,
        backgroundColor: ["#00695C", "#757575"],
        hoverBackgroundColor: ["#00897B", "#9E9E9E"]
      }]
    };

    const ctx = $("#progress");
    const options = {};
    let userProgressChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: options
    });

  }

}