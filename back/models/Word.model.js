class Word {

  constructor(id, word, image, hint) {
    this._id = id;
    this._word = word;
    this._image = image;
    this._hint = hint;
  }

  get id() { return this._id; }
  get word() { return this._word; }
  get image() { return this._image; }
  get hint() { return this._hint; }

  set id(id) {
    this._id = id;
  }

  set word(word) {
    this._word = word;
  }
  
  set image(image) {
    this._image = image;
  }

  set hint(hint) {
    this._hint = hint;
  }
}

module.exports = Word;