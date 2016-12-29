import { Component, OnInit } from '@angular/core';

import { DictionaryService } from '../../../../services/dictionary.service';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'user-dictionary',
  templateUrl: 'user-dictionary.html',
  styleUrls: ['user-dictionary.css'],
  providers: [DictionaryService]
})
export class UserDictionaryComponent implements OnInit {

  private words: Array<any>;

  constructor(private dictionaryService: DictionaryService) {}

  ngOnInit() {
    this.words = this.dictionaryService.getWords();
  }

}