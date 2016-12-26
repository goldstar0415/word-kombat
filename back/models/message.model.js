class Message {

  constructor(text, user, points) {
    this._text = text;
    this._user = user;
    this._points = points;
  }

  get text() {
    return this._text;
  }

  get user() {
    return this._user;
  }

  get points() {
    return this._points;
  }

  get values() {
    return {
      text: this.text,
      user: this.user.values,
      points: this.points
    }
  }

}

module.exports = Message;