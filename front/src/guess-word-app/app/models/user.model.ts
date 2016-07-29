export class User {
  public _id: number;
  public _name: string;
  public _score: number;
  public _icon: string;
  public _rank: number;

  constructor(id, name, score, icon, rank) {
    this._id = id;
    this._name = name;
    this._score = score;
    this._icon = icon;
    this._rank = rank;
  }

  get id() {
    return this._id;
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

}