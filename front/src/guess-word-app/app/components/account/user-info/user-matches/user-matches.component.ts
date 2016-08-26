import { Component, OnInit } from 'angular2/core';

import { MatchesService } from '../../../../services/matches.service';

const basePath = 'guess-word-app/app/components/account/user-info/user-matches/';

@Component({
  selector: 'user-matches',
  templateUrl: basePath + 'user-matches.html',
  styleUrls: [basePath + 'user-matches.css'],
  providers: [MatchesService]
})
export class UserMatchesComponent implements OnInit {
  
  private matches: Array<any>
  private matchesService: MatchesService;

  constructor(matchesService: MatchesService) {
    this.matchesService = matchesService;
  }

  ngOnInit() {
    this.matches = this.matchesService.getMatches();
  }

}