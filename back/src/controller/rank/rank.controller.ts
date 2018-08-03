import { Controller, Get, Param } from '@nestjs/common';
import { Rank } from '../../model/rank.model';
import { RankRepository } from '../../repository/rank/rank.repository';
import { ApiUseTags } from '@nestjs/swagger';
import * as Seq from 'sequelize';

@ApiUseTags('rank')
@Controller('/api/ranks')
export class RankController {
  constructor(private readonly rankRepository: RankRepository) {}

  @Get('/')
  async getRanks(): Promise<Rank[]> {
    return this.rankRepository.findAll({});
  }

  @Get('/:score/next')
  async getNextScore(@Param('score') score: number): Promise<Rank | null> {
    const ranks = await this.rankRepository.findAll({
      where: {
        minScore: {
          [Seq.Op.gt]: score,
        },
      },
      order: [['minScore', 'ASC']],
      limit: 1,
    });

    return ranks && ranks[0] ? ranks[0] : null;
  }
}
