import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

declare let $:any;
declare let __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'app',
  templateUrl: 'app.html',
  styleUrls: ['app.css'],
  providers: [UsersService, AuthService]
})
export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    // Meterialize css initialization
    $(".button-collapse").sideNav();
    $('.tooltipped').tooltip({delay: 50});
  }

}