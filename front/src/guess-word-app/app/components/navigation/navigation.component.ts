import { Component, Input } from '@angular/core';

import { User } from '../../models/user.model';

const basePath = 'guess-word-app/app/components/navigation/';

@Component({
  selector: 'navigation',
  templateUrl: basePath + 'navigation.html',
  styleUrls: [basePath + 'navigation.css'],
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