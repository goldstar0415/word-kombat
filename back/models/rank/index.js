class Rank {

  constructor(id, name, minScore) {
    this._id = id;
    this.name = name;
    this.minScore = minScore;
  }

  get id() { return this._id; }
  get name() { return this._name; }
  get minScore() { return this._minScore; }

  set id(id) {
    this._id = id;
  }

  set name(name) {
    this._name = name;
  }

  set minScore(minScore) {
    this._minScore = minScore;
  }

}

module.exports = Rank;