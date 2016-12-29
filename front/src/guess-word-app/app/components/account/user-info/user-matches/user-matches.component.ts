import { Component, OnInit } from '@angular/core';

import { MatchesService } from '../../../../services/matches.service';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'user-matches',
  templateUrl: 'user-matches.html',
  styleUrls: ['user-matches.css'],
  providers: [MatchesService]
})
export class UserMatchesComponent implements OnInit {
  
  private matches: Array<any>

  constructor(private matchesService: MatchesService) {}

  ngOnInit() {
    this.matches = this.matchesService.getMatches();
  }

}