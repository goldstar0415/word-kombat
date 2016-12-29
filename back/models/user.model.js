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

  toString() {
    return JSON.strigify(this);
  }

}

module.exports = User;