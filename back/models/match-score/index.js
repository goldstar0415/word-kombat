class MatchScore {

  constructor(score) {
    this._score = score;
  }

  get score() { return this._score; }

  set score(score) {
    this._score = score;
  }

}

module.exports = MatchScore;