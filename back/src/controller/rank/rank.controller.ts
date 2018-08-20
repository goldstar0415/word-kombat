import { Controller, Get, Param } from "@nestjs/common";
import { Rank } from "../../model/rank.model";
import { RankRepository } from "../../repository/rank/rank.repository";
import { ApiOperation, ApiResponse, ApiUseTags } from "@nestjs/swagger";
import * as Seq from "sequelize";
import { MessageCodeError } from "../../config/error";

@ApiUseTags("rank")
@Controller("/api/ranks")
export class RankController {

  constructor(private readonly rankRepository: RankRepository) {
  }

  @ApiOperation({ title: "Retrieves list or ranks" })
  @ApiResponse({ status: 200, description: "List of ranks", isArray: true, type: Rank })
  @ApiResponse({ status: 400, description: "Bad Request", type: MessageCodeError })
  @ApiResponse({ status: 401, description: "Unauthorized", type: MessageCodeError })
  @Get("/")
  async getRanks(): Promise<Rank[]> {
    return this.rankRepository.findAll({});
  }

  @ApiOperation({
    title: "Retrieves rank by score",
    description: "Retrieves rank which min score is greater than specified"
  })
  @ApiResponse({ status: 200, description: "Rank", type: Rank })
  @ApiResponse({ status: 400, description: "Bad Request", type: MessageCodeError })
  @ApiResponse({ status: 401, description: "Unauthorized", type: MessageCodeError })
  @Get("/:score/next")
  async getNextScore(@Param("score") score: number): Promise<Rank | null> {
    const ranks = await this.rankRepository.findAll({
      where: {
        minScore: {
          [Seq.Op.gt]: score
        }
      },
      order: [["minScore", "ASC"]],
      limit: 1
    });

    return ranks && ranks[0] ? ranks[0] : null;
  }
}
