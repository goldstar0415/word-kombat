import { Component, Input } from '@angular/core';

import { User } from '../../../models/user.model';

const basePath = 'guess-word-app/app/components/account/user-details/';

@Component({
  selector: 'user-details',
  templateUrl: basePath + 'user-details.html',
  styleUrls: [basePath+ 'user-details.css']
})
export class UserDetailsComponent {
  @Input() private user: User;
}