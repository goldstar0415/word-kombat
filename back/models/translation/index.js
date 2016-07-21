class Translation {

  constructor(id, translation) {
    this._id = id;
    this._translation = translation;
  }

  get id() { return this._id; }
  get translation() { return this._translation; }

  set id(id) {
    this._id = id;
  }

  set translation(translation) {
    this._translation = translation;
  }

}