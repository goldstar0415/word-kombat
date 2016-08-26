import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES, RouteConfig } from 'angular2/router';

import { ChatComponent } from './chat/chat.component';
import { LeaderboardsComponent } from './leaderboards/leaderboards.component';
import { AccountComponent } from './account/account.component';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { NavigationComponent } from './navigation/navigation.component';

declare let $:any;

const basePath = 'guess-word-app/app/components/';

@Component({
  selector: 'app',
  templateUrl: basePath + 'app.html',
  styleUrls: [basePath + 'app.css'],
  directives: [ROUTER_DIRECTIVES, PageFooterComponent, NavigationComponent]
})
@RouteConfig([
  { path: '', name: 'Chat', component: ChatComponent },
  { path: '/leaderboards', name: 'Leaderboards', component: LeaderboardsComponent },
  { path: '/account', name: 'Account', component: AccountComponent },
])
export class AppComponent implements OnInit {

  ngOnInit() {
    // Meterialize css initialization
    $(".button-collapse").sideNav();
    $('.tooltipped').tooltip({delay: 50});
  }

}