export class Word {

  constructor(
    private _id,
    private _letters = [],
    private _image = "",
    private _hint = "") {
  }

  get id() {
    return this._id;
  }

  get letters() {
    return this._letters.slice();
  }

  get image() {
    return this._image;
  }
  
  get hint() {
    return this._hint;
  }

  set letters(letters) {
    this._letters = letters.slice();
  }

}