export class Word {

  constructor(
    public id = 0,
    public letters = [],
    public image = "images/words/words.jpg",
    public hint = "No hints provided"
  ) {}

  toString() {
    return JSON.stringify(this);
  }

}