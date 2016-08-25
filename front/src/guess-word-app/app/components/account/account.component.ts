import { Component, OnInit } from 'angular2/core';

import { UserDetailsComponent } from './user-details/user-details.component';
import { User } from '../../models/user.model';

const basePath = 'guess-word-app/app/components/account/';

@Component({
  selector: 'account',
  templateUrl: basePath + 'account.html',
  styleUrls: [basePath + 'account.css'],
  directives: [UserDetailsComponent]
})
export class AccountComponent implements OnInit {

  private currentUser: User;

  ngOnInit() {
    this.currentUser = new User(1, "random@email.com", "random-name", 200, "images/users/noIco.png", 1);
    console.log(this.currentUser);
  }

}