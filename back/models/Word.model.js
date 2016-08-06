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
      letters: this.shuffleLetters(this.value),
      image: this.image,
      hint: this.hint
    };
  }

  shuffleLetters(word) {
    let letters = word.split('');
    let currentIndex = letters.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = letters[currentIndex];
      letters[currentIndex] = letters[randomIndex];
      letters[randomIndex] = temporaryValue;
    }

    return letters;
  }
}

module.exports = Word;