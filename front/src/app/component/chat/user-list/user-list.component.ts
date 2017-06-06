import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChange
} from '@angular/core';

import { User } from '../../../model/user.model';

@Component({
  selector: 'wk-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  
  @Input() users: Array<User>;

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if(this.users) {
      this.users = this.users.sort((user1, user2) => {
        return user2.score - user1.score;
      });
    }
  }

}
