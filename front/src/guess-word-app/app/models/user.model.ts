export class User {
  
  constructor(
    private _id=0,
    private _email="",
    private _name="",
    private _score=0,
    private _icon="",
    private _rank=0) {
  }

  get id() {
    return this._id;
  }

  get email() {
    return this._email;
  }

  get name() {
    return this._name;
  }

  get score() {
    return this._score;
  }

  get icon() {
    return this._icon;
  }

  get rank() {
    return this._rank;
  }

  get values() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      score: this.score,
      icon: this.icon,
      rank: this.rank
    }
  }

}