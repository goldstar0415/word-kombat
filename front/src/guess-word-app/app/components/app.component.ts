import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES, RouteConfig } from 'angular2/router';

import { ChatComponent } from './chat/chat.component';
import { LeaderboardsComponent } from './leaderboards/leaderboards.component';
import { AccountComponent } from './account/account.component';

const basePath = 'guess-word-app/app/components/';

@Component({
  selector: 'app',
  templateUrl: basePath + 'app.html',
  styleUrls: [basePath + 'app.css'],
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '', name: 'Chat', component: ChatComponent },
  { path: '/leaderboards', name: 'Leaderboards', component: LeaderboardsComponent },
  { path: '/accout', name: 'Account', component: AccountComponent },
])
export class AppComponent {

}