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
    let id = this.authService.getUserId();
    if(id) {
      this.userService.getById(id)
        .subscribe(user => {
          this.currentUser = user;
          this.userService.getNextRank(this.currentUser.score)
            .subscribe(rank => {
              this.nextRank = rank;
            }, error => {
              console.error(error);
            })
        }, error => {
          console.error(error);
        });
    }
  }

}
