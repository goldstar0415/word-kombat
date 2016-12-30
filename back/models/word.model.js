class Word {

  constructor(id, value, image, hint) {
    this.id = id;
    this.value = value;
    this.image = image;
    this.hint = hint;
  }

  get values() {
    return {
      id: this.id,
      value: this.value,
      image: this.image,
      hint: this.hint
    };
  }

  toString() {
    return JSON.stringify(this);
  }
}

module.exports = Word;