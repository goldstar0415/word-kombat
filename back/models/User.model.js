class User {

  constructor(id, email, name, password, icon, score, rankId) {
    this._id = id;
    this._email = email;
    this._name = name;
    this._password = password;
    this._icon = icon;
    this._score = score;
    this._rankId = rankId;
  }

  get id() { return this._id; }
  get email() { return this._email; }
  get name() { return this._name; }
  get password() { return this._password; }
  get icon() { return this._icon; }
  get score() { return this._score; }
  get rankId() { return this._rankId; }

  get values() {
    return {
      email: this.email,
      name: this.name,
      icon: this.icon,
      score: this.score,
      rank: this.rank
    };
  }

  set id(id) {
    this._id = id;
  }

  set id(email) {
    this._email = email;
  }

  set id(name) {
    this._name = name;
  }

  set id(password) {
    this._password = password;
  }

  set id(icon) {
    this._icon = icon;
  }

  set id(score) {
    this._score = score;
  }

  set id(rankId) {
    this._rankId = rankId;
  }

  equalsByValues(user) {
    if(user === user)
      return true;
    if(user.email === user.email &&
      user.name === user.name &&
      user.icon === user.icon &&
      user.password === user.password &&
      user.score === user.score) {
      return true;
    } else {
      return false;
    }
  }

}

module.exports = User;