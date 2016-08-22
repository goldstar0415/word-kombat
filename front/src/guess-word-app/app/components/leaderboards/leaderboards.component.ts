import { Component, OnInit } from 'angular2/core';

import { User } from '../../models/user.model';
import { LeadersService } from '../../services/leaders.service';

const basePath = 'guess-word-app/app/components/leaderboards/';

@Component({
  selector: 'leaderboards',
  templateUrl: basePath + 'leaderboards.html',
  styleUrls: [basePath + 'leaderboards.css'],
  providers: [LeadersService]
})
export class LeaderboardsComponent implements OnInit {

  private leaders: User[];
  private leadersService: LeadersService;

  constructor(leadersService: LeadersService) {
    this.leadersService = leadersService;
  }

  ngOnInit() {
    this.leaders = [];
    this.leadersService.getLeaders()
      .subscribe(leaders  => {
        this.leaders = leaders.sort((prev, next) => next.score - prev.score);
      }, error =>  {
        console.error(error)
      });
  }

}