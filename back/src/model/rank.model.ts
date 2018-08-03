export class Rank {
  public id: number;
  public value: string;
  public minScore: number;
  public image: string;

  constructor(id: number, value: string, minScore: number, image: string) {
    this.id = id;
    this.value = value;
    this.minScore = minScore;
    this.image = image;
  }

  toString(): string {
    return JSON.stringify(this);
  }
}
