import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user.model';
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

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {
    this.currentUser = new User();
  }
  
  ngOnInit() {
    let id = this.authService.getUserId();
    if(id) {
      this.usersService.getById(id)
        .subscribe(user => {
          this.currentUser = user;
        }, error => {
          console.error(error);
        });
    }
  }

}