import { ApiModelProperty } from "@nestjs/swagger";

export class Rank {

  @ApiModelProperty()
  public id: number;

  @ApiModelProperty()
  public value: string;

  @ApiModelProperty()
  public minScore: number;

  @ApiModelProperty()
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
