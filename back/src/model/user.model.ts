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

@Dto()
export class UserDto {
  @IsOptional() public id: number;

  @IsDefined()
  @IsEmail()
  public email: string;

  @IsDefined()
  @IsString()
  public name: string;

  @IsDefined()
  @IsString()
  @Exclude()
  public password: string;

  @IsOptional()
  @IsString()
  public icon: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  public score: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  public rankId: number;

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
