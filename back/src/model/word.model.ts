export class Word {
  public id: number;
  public value: string;
  public image: string;
  public hint: string;

  constructor(id: number, value: string, image: string, hint: string) {
    this.id = id;
    this.value = value;
    this.image = image;
    this.hint = hint;
  }

  toString(): string {
    return JSON.stringify(this);
  }
}
