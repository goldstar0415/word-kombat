class Rank {

  constructor(id, name, minScore) {
    this.id = id;
    this.name = name;
    this.minScore = minScore;
  }

  toString() {
    return JSON.stringify(this);
  }

}

module.exports = Rank;