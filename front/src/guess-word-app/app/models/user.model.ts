export class User {
  
  constructor(
    public id=0,
    public email="",
    public name="guest",
    public score=0,
    public icon="images/users/noIco.png",
    public rank=0
  ) {}

  toString() {
    return JSON.stringify(this);
  }

}