import { Component, OnInit } from '@angular/core';
import { NetworkHealthService } from '../service/network-health/network-health.service';

declare const $: any;

@Component({
  selector: 'wk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private networkHealthService: NetworkHealthService) {}

  ngOnInit() {
    this.networkHealthService.isOnline.subscribe();
    // Meterialize css initialization
    $(".button-collapse").sideNav();
    $('.tooltipped').tooltip({delay: 50});
  }

}