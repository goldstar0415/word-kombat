export class Word {

  constructor(
    public id = 0,
    public letters = [],
    public image = "assets/images/logo-mini.png",
    public hint = "No hints provided"
  ) {}

  toString() {
    return JSON.stringify(this);
  }

}