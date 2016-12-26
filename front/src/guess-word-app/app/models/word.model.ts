export class Word {

  constructor(
    public id = 0,
    public letters = ['d', 'r', 'w', 'o'],
    public image = "images/words/words.jpg",
    public hint = "No hints provided"
  ) {}


  toString() {
    return JSON.stringify(this);
  }

}