import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wk-match-score',
  templateUrl: './match-score.component.html',
  styleUrls: ['./match-score.component.scss']
})
export class MatchScoreComponent implements OnInit {

  scores = [
    {
      user: "random",
      points: 10,
      words: 2
    },
    {
      user: "random",
      points: 10,
      words: 2
    },
    {
      user: "random",
      points: 10,
      words: 2
    },
    {
      user: "random",
      points: 10,
      words: 2
    },
    {
      user: "random",
      points: 10,
      words: 2
    },
    {
      user: "random",
      points: 10,
      words: 2
    },
    {
      user: "random",
      points: 10,
      words: 2
    },
    {
      user: "random",
      points: 10,
      words: 2
    },
    {
      user: "random",
      points: 10,
      words: 2
    },
    {
      user: "random",
      points: 10,
      words: 2
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
