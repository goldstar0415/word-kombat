import { Component, OnInit } from '@angular/core';

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

  constructor(private leadersService: LeadersService) {
  }

  ngOnInit() {
    this.leaders = [];
    this.leadersService.getLeaders()
      .subscribe(leaders  => {
        console.log(leaders);
        this.leaders = leaders.sort((prev, next) => next.score - prev.score);
      }, error =>  {
        console.error(error);
      });
  }

}