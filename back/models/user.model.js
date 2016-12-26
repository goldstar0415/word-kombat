class User {

  constructor(id, email, name, password, icon, score, rank) {
    this._id = id;
    this._email = email;
    this._name = name;
    this._password = password;
    this._icon = icon;
    this._score = score;
    this._rank = rank;
  }

  get id() { return this._id; }
  get email() { return this._email; }
  get name() { return this._name; }
  get password() { return this._password; }
  get icon() { return this._icon; }
  get score() { return this._score; }
  get rank() { return this._rank; }

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

  set rank(rank) {
    this._rank = rank;
  }

  get values() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      password: this.password,
      icon: this.icon,
      score: this.score,
      rank: this.rank
    };
  }

}

module.exports = User;