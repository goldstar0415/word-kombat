import { Component, Input } from 'angular2/core';

import { User } from '../../../models/user.model';

const basePath = 'guess-word-app/app/components/chat/user-list/';

@Component({
  selector: 'user-list',
  templateUrl: basePath + 'user-list.html',
  styleUrls: [basePath + 'user-list.css']
})
export class UserListComponent {

  @Input() private users: User[];

}