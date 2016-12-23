import { Injectable } from '@angular/core';

@Injectable()
export class DictionaryService {

  getWords(): Array<any> {
    return [
      {value: "Cat", image: "images/words/cat.jpg", timesRepeated: 20},
      {value: "Add", image: "images/words/add.png", timesRepeated: 12},
      {value: "Bird", image: "images/words/bird.jpg", timesRepeated: 8},
      {value: "Break", image: "images/words/break.jpg", timesRepeated: 2},
      {value: "Explore", image: "images/words/explore.jpg", timesRepeated: 1},
    ];
  }

}