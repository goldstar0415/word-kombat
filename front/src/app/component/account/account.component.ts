import { Component, OnInit } from '@angular/core';

import { User } from '../../model/user.model';
import { Rank } from '../../model/rank.model';
import { AuthService } from '../../service/auth/auth.service';
import { UserService } from '../../service/user/user.service';

@Component({
  selector: 'wk-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  currentUser: User;
  nextRank: Rank;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
    this.currentUser = new User();
    this.nextRank = new Rank();
  }

  ngOnInit() {
    const id = this.authService.getUserId();
    if(id) {
      this.userService.getById(id)
        .mergeMap((user: User) => {
          this.currentUser = user;
          return this.userService.getNextRank(this.currentUser.score);
        })
        .subscribe((rank: Rank) => {
          this.nextRank = rank;
        }, error => {
          console.error(error);
        });
    }
  }

}
