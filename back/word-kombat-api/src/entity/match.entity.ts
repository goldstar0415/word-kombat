import {AutoIncrement, Column, CreatedAt, Model, PrimaryKey, Sequelize, Table, UpdatedAt} from "sequelize-typescript";

@Table({
    tableName: 'match',
    timestamps: true
})
export class Match extends Model<Match> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column({
        type: Sequelize.DATE,
        field: 'start_time'
    })
    startTime: Date;

    @Column({
        type: Sequelize.DATE,
        field: 'end_time'
    })
    endTime: Date;

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
