export class Rank {

  constructor(
    public id=0,
    public value='0',
    public minScore=0,
    public image=''
  ) {}

  toString() {
    return JSON.stringify(this);
  }

}
