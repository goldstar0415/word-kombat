import { Component } from '@nestjs/common';
import { Rank } from '../../entity/rank.entity';
import { IFindOptions } from 'sequelize-typescript';

@Component()
export class RankRepository {
  async findById(id: number): Promise<Rank> {
    return Rank.findById(id);
  }

  async findAll(options: IFindOptions<Rank>): Promise<Rank[]> {
    return Rank.all(options);
  }
}
