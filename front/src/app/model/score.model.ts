import { User } from './user.model';

export class Score {

  constructor(
    public user: User = new User(),
    public points: number = 0,
    public words: number = 0
  ) {}

  toString() {
    return JSON.stringify(this);
  }

}