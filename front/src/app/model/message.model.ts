import { User } from './user.model';

export class Message {

  constructor(
    public text: string="",
    public user: User=new User(),
    public points: number=0
  ) {}

  toString() {
    return JSON.stringify(this);
  }

}