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

  set id(id) {
    this._id = id;
  }

  set email(email) {
    this._email = email;
  }

  set name(name) {
    this._name = name;
  }

  set password(password) {
    this._password = password;
  }

  set icon(icon) {
    this._icon = icon;
  }

  set score(score) {
    this._score = score;
  }

  set rankId(rankId) {
    this._rankId = rankId;
  }

  get values() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      password: this.password,
      icon: this.icon,
      score: this.score,
      RankId: this.rankId
    };
  }

}

module.exports = User;