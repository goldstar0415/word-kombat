export class User {
  private _id: number;
  private _email: string;
  private _name: string;
  private _icon: string;
  private _score: number;
  private _rank: number;

  constructor(id, email, name, score, icon, rank) {
    this._id = id;
    this._email = email;
    this._name = name;
    this._score = score;
    this._icon = icon;
    this._rank = rank;
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