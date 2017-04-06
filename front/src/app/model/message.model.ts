import { User } from './user.model';

export class Message {

  constructor(
    public text: string,
    public user: User,
    public points: number
  ) {}

  toString() {
    return JSON.stringify(this);
  }

}