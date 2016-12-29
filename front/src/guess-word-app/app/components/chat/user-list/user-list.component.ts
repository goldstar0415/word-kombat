import { Component, Input } from '@angular/core';

import { User } from '../../../models/user.model';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'user-list',
  templateUrl: 'user-list.html',
  styleUrls: ['user-list.css']
})
export class UserListComponent {

  @Input() private users: User[];

}