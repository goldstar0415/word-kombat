class User {

  constructor(id, email, name, password, icon, score, rank) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.password = password;
    this.icon = icon;
    this.score = score;
    this.rank = rank;
  }

  toString() {
    return JSON.stringify(this);
  }

}

module.exports = User;