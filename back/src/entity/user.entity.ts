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

@Table({
  tableName: 'account',
  timestamps: true,
})
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Unique
  @Column
  email: string;

  @Unique
  @Column
  name: string;

  @Column({
    type: Sequelize.STRING(255),
  })
  password: string;

  @Column icon: string;

  @Column({ defaultValue: 0 })
  score: number;

  @Column({ field: 'rank_id', defaultValue: 1 })
  @ForeignKey(() => Rank)
  rankId: number;

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
