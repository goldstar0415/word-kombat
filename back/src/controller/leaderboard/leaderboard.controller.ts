import { Controller, Get } from '@nestjs/common';
import { UserRepository } from '../../repository/user/user.repository';
import { ApiOperation, ApiResponse, ApiUseTags } from "@nestjs/swagger";
import { User } from '../../entity/user.entity';
import { Rank } from '../../entity/rank.entity';
import { MessageCodeError } from "../../config/error";

@ApiUseTags('leaderboards')
@Controller('/api/leaderboards')
export class LeaderboardController {
  constructor(private readonly userRepository: UserRepository) {}

  @ApiOperation({
    title: "Retrieves top 100 users",
    description: "Retrieves top 100 users ordered by score descending"
  })
  @ApiResponse({ status: 200, description: "Leader-boards", isArray: true, type: User })
  @ApiResponse({ status: 400, description: "Bad Request", type: MessageCodeError })
  @ApiResponse({ status: 401, description: "Unauthorized", type: MessageCodeError })
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
