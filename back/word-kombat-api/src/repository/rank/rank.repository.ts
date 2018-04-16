import {Component} from "@nestjs/common";
import {Rank} from "../../entity/rank.entity";

@Component()
export class RankRepository {

    async findById(id: number): Promise<Rank> {
        return Rank.findById(id);
    }

    async findAll(): Promise<Rank[]> {
        return Rank.findAll({order: 'min_score'});
    }

}
