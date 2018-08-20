import { UserDto } from './user.model';

export class Message {
  public text: string;
  public user: UserDto;
  public points: number;

  constructor(text: string, user: UserDto, points: number) {
    this.text = text;
    this.user = user;
    this.points = points;
  }

  toString(): string {
    return JSON.stringify(this);
  }
}
