import {AutoIncrement, Column, CreatedAt, Model, PrimaryKey, Sequelize, Table, UpdatedAt} from "sequelize-typescript";

@Table({
    tableName: 'rank',
    timestamps: true
})
export class Rank extends Model<Rank> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    name: string;

    @Column({
        field: 'min_score'
    })
    minScore: number;

    @Column
    image: string;

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
