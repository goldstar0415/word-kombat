import {Rank} from "./rank.entity";
import {
    AutoIncrement, Column, CreatedAt, ForeignKey, Model, PrimaryKey, Sequelize, Table, Unique,
    UpdatedAt
} from "sequelize-typescript";

@Table({
    tableName: 'user',
    timestamps: true
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

    @Column
    password: string;

    @Column
    icon: string;

    @Column
    score: number;

    @Column
    @ForeignKey(() => Rank)
    rankId: number;

    @UpdatedAt
    @Column({
        type: Sequelize.DATE,
        field: 'updated_at'
    })
    updatedAt: Date;

    @CreatedAt
    @Column({
        type: Sequelize.DATE,
        field: 'created_at'
    })
    createdAt: Date;

}
