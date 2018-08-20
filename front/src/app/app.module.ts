import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { NgNetworkStatusModule } from "ng-network-status";

import { AppComponent } from "./component/app.component";
import { NavigationComponent } from "./component/navigation/navigation.component";
import { PageFooterComponent } from "./component/page-footer/page-footer.component";
import { UserListComponent } from "./component/chat/user-list/user-list.component";
import { LeaderboardsComponent } from "./component/leaderboards/leaderboards.component";
import { AccountComponent } from "./component/account/account.component";
import { UserDetailsComponent } from "./component/account/user-details/user-details.component";
import { UserInfoComponent } from "./component/account/user-info/user-info.component";
import { ChatComponent } from "./component/chat/chat.component";
import { ChatAreaComponent } from "./component/chat/chat-area/chat-area.component";
import { WordCardComponent } from "./component/chat/word-card/word-card.component";
import { WordInputsComponent } from "./component/chat/word-inputs/word-inputs.component";
import { WordLettersComponent } from "./component/chat/word-letters/word-letters.component";
import { MatchScoreComponent } from "./component/match-score/match-score.component";
import { SigninComponent } from "./component/signin/signin.component";
import { SignupComponent } from "./component/signup/signup.component";

import { SocketService } from "./service/socket/socket.service";
import { UserService } from "./service/user/user.service";
import { AuthService } from "./service/auth/auth.service";
import { WordService } from "./service/word/word.service";
import { MessageService } from "./service/message/message.service";
import { MatchService } from "./service/match/match.service";
import { AuthGuard } from "./guard/auth/auth.guard";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthInterceptor } from "./interceptor/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    PageFooterComponent,
    UserListComponent,
    LeaderboardsComponent,
    AccountComponent,
    UserDetailsComponent,
    UserInfoComponent,
    ChatComponent,
    ChatAreaComponent,
    WordCardComponent,
    WordInputsComponent,
    WordLettersComponent,
    MatchScoreComponent,
    SigninComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgNetworkStatusModule,
    RouterModule.forRoot([
      { path: 'chat', component: ChatComponent },
      { path: 'leaderboards', component: LeaderboardsComponent },
      { path: 'score', component: MatchScoreComponent },
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
      {
        path: 'account',
        component: AccountComponent,
        canActivate: [AuthGuard],
      },
      { path: '', redirectTo: 'chat', pathMatch: 'full' },
      { path: '*', redirectTo: 'chat', pathMatch: 'full' },
      { path: '**/*', redirectTo: 'chat', pathMatch: 'full' },
    ]),
  ],
  providers: [
    SocketService,
    UserService,
    AuthService,
    WordService,
    MessageService,
    MatchService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
