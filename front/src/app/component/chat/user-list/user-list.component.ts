import { Component, Input } from '@angular/core';

import { User } from '../../../model/user.model';

@Component({
  selector: 'wk-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  
  @Input() users: Array<User>;

}
