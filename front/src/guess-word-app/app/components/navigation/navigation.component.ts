import { Component, Input } from 'angular2/core';
import { ROUTER_DIRECTIVES} from 'angular2/router';

import { UserListComponent } from '../chat/user-list/user-list.component'; 

import { User } from '../../models/user.model';

const basePath = 'guess-word-app/app/components/navigation/';

@Component({
  selector: 'navigation',
  templateUrl: basePath + 'navigation.html',
  styleUrls: [basePath + 'navigation.css'],
  directives: [ROUTER_DIRECTIVES, UserListComponent]
})
export class NavigationComponent {

  private users: User[];

  constructor() {
    // Mock Data
    this.users = [
      new User(1, 'random@email.com', 'random1', 2500, 'images/users/noIco.png', 6),
      new User(2, 'random@email.com', 'random2', 2000, 'images/users/noIco.png', 1),
      new User(3, 'random@email.com', 'random3', 500, 'images/users/noIco.png', 2),
      new User(4, 'random@email.com', 'random4', 2500, 'images/users/noIco.png', 4),
      new User(5, 'random@email.com', 'random5', 2200, 'images/users/noIco.png', 3),
      new User(6, 'random@email.com', 'random6', 2500, 'images/users/noIco.png', 7),
      new User(7, 'random@email.com', 'random7', 1500, 'images/users/noIco.png', 8),
      new User(8, 'random@email.com', 'random8', 2500, 'images/users/noIco.png', 1),
      new User(9, 'random@email.com', 'random9', 2500, 'images/users/noIco.png', 2),
      new User(10, 'random@email.com', 'random10', 2500, 'images/users/noIco.png', 9),
    ]
    // End mock data
  }

}