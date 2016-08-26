import { Component, OnInit } from 'angular2/core';

import { DictionaryService } from '../../../../services/dictionary.service';

const basePath = 'guess-word-app/app/components/account/user-info/user-dictionary/';

@Component({
  selector: 'user-dictionary',
  templateUrl: basePath + 'user-dictionary.html',
  styleUrls: [basePath + 'user-dictionary.css'],
  providers: [DictionaryService]
})
export class UserDictionaryComponent implements OnInit {

  private words: Array<any>;
  private dictionaryService: DictionaryService;

  constructor(dictionaryService: DictionaryService) {
    this.dictionaryService = dictionaryService;
  }

  ngOnInit() {
    this.words = this.dictionaryService.getWords();
  }

}