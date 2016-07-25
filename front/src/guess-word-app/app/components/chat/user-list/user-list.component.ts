import { Component } from 'angular2/core';

const basePath = 'guess-word-app/app/components/chat/user-list/';

@Component({
  selector: 'user-list',
  templateUrl: basePath + 'user-list.html',
  styleUrls: [basePath + 'user-list.css']
})
export class UserListComponent {

  users = [
    { name: 'random name1', icon: 'images/users/noIco.png' },
    { name: 'random name2', icon: 'images/users/noIco.png' },
    { name: 'random name3', icon: 'images/users/noIco.png' },
    { name: 'random name4', icon: 'images/users/noIco.png' },
    { name: 'random name5', icon: 'images/users/noIco.png' },
    { name: 'random name6', icon: 'images/users/noIco.png' },
    { name: 'random name7', icon: 'images/users/noIco.png' },
    { name: 'random name8', icon: 'images/users/noIco.png' }
  ]

}