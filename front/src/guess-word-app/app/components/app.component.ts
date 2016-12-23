import { Component, OnInit } from '@angular/core';

declare let $:any;

const basePath = 'guess-word-app/app/components/';

@Component({
  selector: 'app',
  templateUrl: basePath + 'app.html',
  styleUrls: [basePath + 'app.css'],
})
export class AppComponent implements OnInit {

  ngOnInit() {
    // Meterialize css initialization
    $(".button-collapse").sideNav();
    $('.tooltipped').tooltip({delay: 50});
  }

}