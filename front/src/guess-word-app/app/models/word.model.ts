export class Word {
  private _id: number;
  private _letters: string[];
  private _image: string;
  private _hint: string;

  constructor(id, letters, image, hint) {
    this._id = id;
    this._letters = letters.slice();
    this._image = image;
    this._hint = hint;
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