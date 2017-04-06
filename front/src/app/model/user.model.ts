import { Rank } from './rank.model';

export class User {
  
  constructor(
    public id=0,
    public email="",
    public name="guest",
    public score=0,
    public icon="",
    public rank=new Rank()
  ) {}

  toString() {
    return JSON.stringify(this);
  }

}