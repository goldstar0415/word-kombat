import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user.model';
import { LeadersService } from '../../services/leaders.service';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'leaderboards',
  templateUrl: 'leaderboards.html',
  styleUrls: ['leaderboards.css'],
  providers: [LeadersService]
})
export class LeaderboardsComponent implements OnInit {

  private leaders: User[];

  constructor(private leadersService: LeadersService) {}

  ngOnInit() {
    this.leaders = [];
    this.leadersService.getLeaders()
      .subscribe(leaders  => {
        this.leaders = leaders.sort((prev, next) => next.score - prev.score);
      }, error =>  {
        console.error(error);
      });
  }

}