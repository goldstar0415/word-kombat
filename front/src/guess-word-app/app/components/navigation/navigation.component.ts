import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'navigation',
  templateUrl: 'navigation.html',
  styleUrls: ['navigation.css']
})
export class NavigationComponent implements OnInit {

  private users: User[];

  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.users = this.usersService.getAllUsers();
    this.usersService.subscribe(users => {
      this.users = users;
    });
  }

}