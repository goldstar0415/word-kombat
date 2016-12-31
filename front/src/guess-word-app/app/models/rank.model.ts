export class Rank {

  constructor(
    private id=0,
    private name='0',
    private minScore=0,
    private image=''
  ) {}

  toString() {
    return JSON.stringify(this);
  }

}