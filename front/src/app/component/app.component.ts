import { Component, OnInit } from '@angular/core';
import { NetworkStatusService } from 'ng-network-status';

declare const $: any;

@Component({
  selector: 'wk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ NetworkStatusService ]
})
export class AppComponent implements OnInit {

  constructor(private networkStatusService: NetworkStatusService) {}

  ngOnInit() {
    this.networkStatusService.healthCheck();
    this.networkStatusService.isOnline.subscribe();
    // Meterialize css initialization
    $(".button-collapse").sideNav();
    $('.tooltipped').tooltip({delay: 50});
  }

}