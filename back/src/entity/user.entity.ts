import { Rank } from './rank.entity';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Sequelize,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { ApiModelProperty } from "@nestjs/swagger";

@Table({
  tableName: 'account',
  timestamps: true,
})
export class User extends Model<User> {

  @ApiModelProperty()
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ApiModelProperty()
  @Unique
  @Column
  email: string;

  @ApiModelProperty()
  @Unique
  @Column
  name: string;

  @Column({
    type: Sequelize.STRING(255),
  })
  password: string;

  @ApiModelProperty()
  @Column icon: string;

  @ApiModelProperty()
  @Column({ defaultValue: 0 })
  score: number;

  @ApiModelProperty()
  @Column({ field: 'rank_id', defaultValue: 1 })
  @ForeignKey(() => Rank)
  rankId: number;

  @ApiModelProperty({type: Rank})
  @BelongsTo(() => Rank)
  rank: Rank;

  @UpdatedAt
  @Column({
    type: Sequelize.DATE,
    field: 'updated_at',
  })
  updatedAt: Date;

  @CreatedAt
  @Column({
    type: Sequelize.DATE,
    field: 'created_at',
  })
  createdAt: Date;
}
