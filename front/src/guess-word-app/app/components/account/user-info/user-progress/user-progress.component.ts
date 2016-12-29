import { Component, OnInit } from '@angular/core';

declare const __moduleName: string;
declare const Chart: any;
declare const $: any;

@Component({
  moduleId: __moduleName,
  selector: 'user-progress',
  templateUrl: 'user-progress.html',
  styleUrls: ['user-progress.css']
})
export class UserProgressComponent implements OnInit {

  private data: Array<Number>;

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