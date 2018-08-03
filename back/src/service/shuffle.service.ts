import { Component } from '@nestjs/common';

@Component()
export class ShuffleService {

  public shuffle(word: string): string[] {
    if (!word) return [];

    const letters = word.split('');
    let currentIndex = letters.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = letters[currentIndex];
      letters[currentIndex] = letters[randomIndex];
      letters[randomIndex] = temporaryValue;
    }

    return letters;
  }

}
