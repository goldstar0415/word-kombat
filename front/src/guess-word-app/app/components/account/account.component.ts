import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user.model';
import { Rank } from '../../models/rank.model';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'account',
  templateUrl: 'account.html',
  styleUrls: ['account.css'],
  providers: [UsersService]
})
export class AccountComponent implements OnInit {

  private currentUser: User;
  private nextRank: Rank;

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {
    this.currentUser = new User();
    this.nextRank = new Rank();
  }
  
  ngOnInit() {
    let id = this.authService.getUserId();
    if(id) {
      this.usersService.getById(id)
        .subscribe(user => {
          this.currentUser = user;
          this.usersService.getNextRank(this.currentUser.score)
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