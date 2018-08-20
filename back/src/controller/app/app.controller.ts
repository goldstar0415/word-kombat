import { Controller, Get, Render } from "@nestjs/common";
import { WordRepository } from "../../repository/word/word.repository";
import { Word } from "../../entity/word.entity";
import { ApiModelProperty, ApiOperation, ApiResponse, ApiUseTags } from "@nestjs/swagger";

export class TimestampResponse {

  @ApiModelProperty()
  alive: boolean;

  @ApiModelProperty()
  timestamp: string;
}

@ApiUseTags("info")
@Controller()
export class AppController {
  constructor(private readonly wordRepository: WordRepository) {}

  @ApiOperation({ title: "Renders home page" })
  @ApiResponse({ status: 200, description: 'Rendered home page'})
  @Render('index')
  @Get('/')
  async index(): Promise<{ words: Word[] }> {
    const words = await this.wordRepository.getRandomWords(6);
    return { words };
  }

  @ApiOperation({
    title: 'Returns server\'s timestamp',
    description: 'Checks if server is alive and returns server\'s timestamp'
  })
  @ApiResponse({ status: 200, description: 'Server is alive', type: TimestampResponse})
  @ApiResponse({ status: 502, description: 'Bad Gateway'})
  @Get('/timestamp')
  async timestamp(): Promise<TimestampResponse> {
    return {alive: true, timestamp: new Date().toISOString()};
  }

}
