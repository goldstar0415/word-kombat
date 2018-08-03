import {
  AutoIncrement,
  Column,
  CreatedAt,
  HasOne,
  Model,
  PrimaryKey,
  Sequelize,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from './user.entity';

@Table({
  tableName: 'rank',
  timestamps: true,
})
export class Rank extends Model<Rank> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column value: string;

  @Column({
    field: 'min_score',
  })
  minScore: number;

  @Column image: string;

  @HasOne(() => User)
  user: User;

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
