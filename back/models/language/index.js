class Language {

  constructor(id, name) {
    this._id = id;
    this._name = name;
  }

  get id() { return this._id; }
  get name() { return this._name; }

  set id(id) {
    this._id = id;
  }

  set name(name) {
    this._name = name;
  }
}

module.exports = Language;