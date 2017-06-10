import { Component, OnInit } from '@angular/core';

import { Rank } from '../../model/rank.model';
import { User } from '../../model/user.model';
import { Score } from '../../model/score.model';
import { MatchService } from '../../service/match/match.service';

@Component({
  selector: 'wk-match-score',
  templateUrl: './match-score.component.html',
  styleUrls: ['./match-score.component.scss']
})
export class MatchScoreComponent implements OnInit {

  scores: Array<Score>;

  constructor(private matchService: MatchService) {}

  ngOnInit() {
    this.scores = this.matchService.getWinners();
  }

  getScores(): Array<Score> {
    return this.scores.sort((score1, score2) => score2.points - score1.points);
  }

  getWinner(): User {
    return this.getScores()[0].user;
  }

}
