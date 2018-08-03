import { Controller, Get } from '@nestjs/common';
import { UserRepository } from '../../repository/user/user.repository';
import { ApiUseTags } from '@nestjs/swagger';
import { User } from '../../entity/user.entity';
import { Rank } from '../../entity/rank.entity';

@ApiUseTags('leaderboards')
@Controller('/api/leaderboards')
export class LeaderboardController {
  constructor(private readonly userRepository: UserRepository) {}

  @Get('/')
  async getLeaderboards(): Promise<User[]> {
    return this.userRepository.findAll({
      limit: 100,
      order: [['score', 'DESC']],
      include: [
        {
          model: Rank,
        },
      ],
    });
  }
}
