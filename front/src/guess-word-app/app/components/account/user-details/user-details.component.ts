import { Component, Input } from '@angular/core';

import { UsersService } from '../../../services/users.service';
import { User } from '../../../models/user.model';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'user-details',
  templateUrl: 'user-details.html',
  styleUrls: ['user-details.css'],
  providers: [UsersService]
})
export class UserDetailsComponent {
  @Input() private user: User;

  constructor(private usersService: UsersService) {
    this.user = new User();
  }

  update() {
    this.usersService.update(this.user.id, this.user)
      .subscribe(user => {
        this.user = user;
      }, error => {
        console.error(error);
      });
  }

}