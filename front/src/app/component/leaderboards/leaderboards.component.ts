import { Component, OnInit } from '@angular/core';

import { User } from '../../model/user.model';
import { LeaderboardsService } from '../../service/leaderboards/leaderboards.service';

@Component({
  selector: 'wk-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.scss'],
  providers: [ LeaderboardsService ]
})
export class LeaderboardsComponent implements OnInit {

  leaders: Array<User>;

  constructor(private leaderboardsService: LeaderboardsService) {}

  ngOnInit() {
    this.leaders = [];
    this.leaderboardsService.getAll()
      .subscribe(leaders => {
        this.leaders = leaders;
      }, error => {
        console.error(error);
      });
  }

}
