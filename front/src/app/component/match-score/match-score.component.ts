import { Component, OnInit } from '@angular/core';

import { Rank } from '../../model/rank.model';
import { User } from '../../model/user.model';
import { Score } from '../../model/score.model';

@Component({
  selector: 'wk-match-score',
  templateUrl: './match-score.component.html',
  styleUrls: ['./match-score.component.scss']
})
export class MatchScoreComponent implements OnInit {

  scores: Array<Score>;

  constructor() { }

  ngOnInit() {
    this.scores = this.generateScores(10);
  }

  getScores(): Array<Score> {
    return this.scores.sort((score1, score2) => score2.points - score1.points);
  }

  getWinner(): User {
    return this.getScores()[0].user;
  }

  private generateScores(amount: number): Array<Score> {
    let scores = [];

    for(let i = 0; i < amount; i++) {
      scores.push(new Score(
        new User(
          0,
          "",
          "USER" + i,
          i * 10,
          "https://robohash.org/" + i,
          new Rank(0, '0', 0, "/assets/images/ranks/1.png")
        ),
        Math.round(Math.random() * 10) + 1,
        Math.round(Math.random() * 10) + 1)
      );
    }

    return scores;
  }

}
