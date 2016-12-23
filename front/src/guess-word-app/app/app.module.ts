import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

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
import { UserInfoConponent } from './components/account/user-info/user-info.component';
import { UserDictionaryComponent } from './components/account/user-info/user-dictionary/user-dictionary.component';
import { UserMatchesComponent } from './components/account/user-info/user-matches/user-matches.component';
import { UserProgressComponent } from './components/account/user-info/user-progress/user-progress.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
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
    AppComponent,
    LeaderboardsComponent,
    AccountComponent,
    PageFooterComponent,
    NavigationComponent,
    ChatComponent,
    ChatAreaComponent,
    UserListComponent,
    WordCardComponent,
    WordInputsComponent,
    WordLettersComponent,
    UserDetailsComponent,
    UserInfoConponent,
    UserDictionaryComponent,
    UserMatchesComponent,
    UserProgressComponent
  ],
  providers: [
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }