class Word {

  constructor(id, value, image, hint) {
    this.id = id;
    this.value = value;
    this.image = image;
    this.hint = hint;
  }

  toString() {
    return JSON.stringify(this);
  }
}

module.exports = Word;