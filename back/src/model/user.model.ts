import {
  IsDefined,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Dto } from 'nestjs-extensions';
import { Exclude } from 'class-transformer';
import { Rank } from '../entity/rank.entity';
import { ApiModelProperty } from "@nestjs/swagger";

@Dto()
export class UserDto {

  @ApiModelProperty()
  @IsOptional()
  public id: number;

  @ApiModelProperty()
  @IsDefined()
  @IsEmail()
  public email: string;

  @ApiModelProperty()
  @IsDefined()
  @IsString()
  public name: string;

  @ApiModelProperty()
  @IsDefined()
  @IsString()
  @Exclude()
  public password: string;

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  public icon: string;

  @ApiModelProperty()
  @IsOptional()
  @IsInt()
  @Min(0)
  public score: number;

  @ApiModelProperty()
  @IsOptional()
  @IsInt()
  @Min(1)
  public rankId: number;

  @ApiModelProperty()
  public rank?: Rank;

  constructor(id: number, email: string, name: string, password: string, icon: string, score: number,
              rankId: number, rank?: Partial<Rank>) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.password = password;
    this.icon = icon;
    this.score = score;
    this.rankId = rankId;
    this.rank = Object.assign(rank);
  }

  toString(): string {
    return JSON.stringify(this);
  }
}
