import { Component, OnInit } from 'angular2/core';

import { UserProgressComponent } from './user-progress/user-progress.component';
import { UserDictionaryComponent } from './user-dictionary/user-dictionary.component';
import { UserMatchesComponent } from './user-matches/user-matches.component';

declare let $:any;

const basePath = 'guess-word-app/app/components/account/user-info/';

@Component({
  selector: 'user-info',
  templateUrl: basePath + 'user-info.html',
  styleUrls: [basePath + 'user-info.css'],
  directives: [
    UserProgressComponent,
    UserDictionaryComponent,
    UserMatchesComponent
  ]
})
export class UserInfoConponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
    $('.collapsible').collapsible({
      accordion: true
    });
  }

}