import { User } from './user.model';

export class Message {

  private _text: string;
  private _user: User;
  private _points: number;

  constructor(text: string, user: User, points: number) {
    this._text = text;
    this._user = user;
    this._points = points;
  }

  get text() {
    return this._text;
  }

  get user() {
    return this._user;
  }

  get points() {
    return this._points;
  }

  set text(text: string) {
    this._text = text;
  }

  set points(points: number) {
    this._points = points;
  }

  get values() {
    return {
      text: this.text,
      user: this.user.values,
      points: this.points
    }
  }

}