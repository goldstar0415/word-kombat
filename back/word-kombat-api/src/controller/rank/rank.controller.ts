import {Controller, Get, Param} from '@nestjs/common';
import {Rank} from "../../model/rank.model";
import {RankRepository} from "../../repository/rank/rank.repository";
import {ApiUseTags} from "@nestjs/swagger";

@ApiUseTags('rank')
@Controller('/api/ranks')
export class RankController {

    constructor(private readonly rankRepository: RankRepository) {}

    @Get('/')
    async getRanks(): Promise<Rank[]> {
        return this.rankRepository.findAll();
    }

    @Get('/:score/next')
    async getNextScore(@Param('score') score: number): Promise<number> {
        const ranks = await this.rankRepository.findAll();
        const result = ranks.filter(rank => rank.minScore > score);
        return result && result[0] ? result[0].minScore : 0;
    }


}
