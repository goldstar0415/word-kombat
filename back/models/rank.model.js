class Rank {

  constructor(id, name, minScore, image) {
    this.id = id;
    this.name = name;
    this.minScore = minScore;
    this.image = image;
  }

  toString() {
    return JSON.stringify(this);
  }

}

module.exports = Rank;