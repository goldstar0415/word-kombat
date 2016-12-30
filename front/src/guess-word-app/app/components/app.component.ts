import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { SocketService } from '../services/socket.service';
import { WordsService } from '../services/words.service';

declare const $: any;
declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'app',
  templateUrl: 'app.html',
  styleUrls: ['app.css'],
  providers: [
    UsersService,
    AuthService,
    SocketService,
    WordsService
  ]
})
export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    // Meterialize css initialization
    $(".button-collapse").sideNav();
    $('.tooltipped').tooltip({delay: 50});
  }

}