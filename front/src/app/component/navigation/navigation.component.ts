import { Component, OnInit } from '@angular/core';

import { User } from '../../model/user.model';
import { UserService } from '../../service/user/user.service';
import { AuthService } from '../../service/auth/auth.service';


@Component({
  selector: 'wk-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  users: Array<User>;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.users = this.userService.getAll();
    this.userService.subscribe(users => {
      this.users = users;
    });
  }

  isAuthorized() {
    return this.authService.isAuthorized();
  }

}
