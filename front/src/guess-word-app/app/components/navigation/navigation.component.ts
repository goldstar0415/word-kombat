import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';

declare let __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'navigation',
  templateUrl: 'navigation.html',
  styleUrls: ['navigation.css']
})
export class NavigationComponent implements OnInit {

  private users: User[];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.users = this.usersService.getAllUsers();
    this.usersService.subscribe(users => {
      this.users = users;
    });
  }

}