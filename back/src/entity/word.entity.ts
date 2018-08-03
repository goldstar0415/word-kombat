import {
  AutoIncrement,
  Column,
  CreatedAt,
  Model,
  PrimaryKey,
  Sequelize,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'word',
  timestamps: true,
})
export class Word extends Model<Word> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column value: string;

  @Column image: string;

  @Column hint: string;

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
