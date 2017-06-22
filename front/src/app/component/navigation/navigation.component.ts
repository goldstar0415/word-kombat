import { Component, OnInit } from '@angular/core';

import { Score } from '../../model/score.model';
import { User } from '../../model/user.model';
import { UserService } from '../../service/user/user.service';
import { AuthService } from '../../service/auth/auth.service';
import { MatchService } from '../../service/match/match.service';

@Component({
  selector: 'wk-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  scores: Array<Score>;
  user: User;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private matchService: MatchService
  ) {
    this.user = new User();
  }

  ngOnInit() {
    this.scores = this.matchService.getAllScores();
    
    this.matchService.getScores()
      .subscribe(scores => {
        this.scores = scores;
      });

    this.authService.subscribe(userId => {
      if(userId) {
        this.userService.getById(userId).subscribe(user => {
          this.user = user;
        });
      }
    });
  }

  isAuthorized() {
    return this.authService.isAuthorized();
  }

  onSignOut() {
    this.authService.signOut();
    location.reload();
  }

}
