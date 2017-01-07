import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SocketService } from './services/socket.service';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { WordsService } from './services/words.service';

import { AppComponent } from './components/app.component';
import { LeaderboardsComponent } from './components/leaderboards/leaderboards.component';
import { PageFooterComponent } from './components/page-footer/page-footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatAreaComponent } from './components/chat/chat-area/chat-area.component';
import { UserListComponent } from './components/chat/user-list/user-list.component';
import { WordCardComponent } from './components/chat/word-card/word-card.component';
import { WordInputsComponent } from './components/chat/word-inputs/word-inputs.component';
import { WordLettersComponent } from './components/chat/word-letters/word-letters.component';
import { AccountComponent } from './components/account/account.component';
import { UserDetailsComponent } from './components/account/user-details/user-details.component';
import { UserInfoComponent } from './components/account/user-info/user-info.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'leaderboards', component: LeaderboardsComponent },
      { path: 'account', component: AccountComponent },
      { path: 'chat', component: ChatComponent },
      { path: '', component: ChatComponent },
      { path: '*', component: ChatComponent },
      { path: '*/**', component: ChatComponent },
    ])
  ],
  declarations: [
    ChatAreaComponent,
    WordCardComponent,
    WordInputsComponent,
    WordLettersComponent,
    UserListComponent,
    UserDetailsComponent,
    UserInfoComponent,
    NavigationComponent,
    PageFooterComponent,
    AccountComponent,
    LeaderboardsComponent,
    ChatComponent,
    AppComponent
  ],
  providers: [
    SocketService,
    UsersService,
    AuthService,
    WordsService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }