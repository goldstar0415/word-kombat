import { User } from './user.entity';
import {
  AutoIncrement,
  Column,
  CreatedAt,
  DefaultScope,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Sequelize,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@DefaultScope({
  include: [() => User],
})
@Table({
  tableName: 'message',
  timestamps: true,
})
export class Message extends Model<Message> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column text: string;

  @Column({
    type: Sequelize.BIGINT,
  })
  @ForeignKey(() => User)
  userId: number;

  @Column points: number;

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
