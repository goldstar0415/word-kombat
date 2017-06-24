class Match {

  constructor(id, startTime, endTime) {
    this.id = id;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  toString() {
    return JSON.stringify(this);
  }

}

module.exports = Match;