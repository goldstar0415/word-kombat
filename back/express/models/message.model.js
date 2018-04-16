class Message {

  constructor(text, user, points) {
    this.text = text;
    this.user = user;
    this.points = points;
  }

  toString() {
    return JSON.stringify(this);
  }

}

module.exports = Message;