class Match {

  constructor(id, startTime, endTime) {
    this._id = id;
    this._startTime = startTime;
    this._endTime = endTime;
  }

  get id() { return this._id; }
  get startTime() { return this._startTime; }
  get endTime() { return this._endTime; }

  set id(id) {
    this._id = id;
  }

  set startTime(startTime) {
    this._startTime = startTime;
  }

  set endTime(endTime) {
    this._endTime = endTime;
  }
}

module.exports = Match;