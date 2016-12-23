import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user.model';

declare let __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'account',
  templateUrl: 'account.html',
  styleUrls: ['account.css'],
})
export class AccountComponent implements OnInit {

  private currentUser: User;

  ngOnInit() {
    this.currentUser = new User(1, "random@email.com", "random-name", 200, "images/users/noIco.png", 1);
    console.log(this.currentUser);
  }

}