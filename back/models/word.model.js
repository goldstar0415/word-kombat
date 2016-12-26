class Word {

  constructor(id, value, image, hint) {
    this._id = id;
    this._value = value;
    this._image = image;
    this._hint = hint;
  }

  get id() { return this._id; }
  get value() { return this._value; }
  get image() { return this._image; }
  get hint() { return this._hint; }

  set id(id) {
    this._id = id;
  }

  set value(value) {
    this._value = value;
  }
  
  set image(image) {
    this._image = image;
  }

  set hint(hint) {
    this._hint = hint;
  }

  get values() {
    return {
      id: this.id,
      value: this.value,
      image: this.image,
      hint: this.hint
    };
  }
}

module.exports = Word;