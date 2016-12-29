import { Component, OnInit } from '@angular/core';

declare const __moduleName: string;
declare const $: any;

@Component({
  moduleId: __moduleName,
  selector: 'user-info',
  templateUrl: 'user-info.html',
  styleUrls: ['user-info.css']
})
export class UserInfoConponent implements OnInit {

  ngOnInit() {
    $('.collapsible').collapsible({
      accordion: true
    });
  }

}