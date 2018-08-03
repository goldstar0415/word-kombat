import { Controller, Get, Render } from '@nestjs/common';
import { WordRepository } from '../../repository/word/word.repository';
import { Word } from '../../entity/word.entity';

@Controller()
export class AppController {
  constructor(private readonly wordRepository: WordRepository) {}

  @Render('index')
  @Get('/')
  async index(): Promise<{ words: Word[] }> {
    const words = await this.wordRepository.getRandomWords(6);
    return { words };
  }
}
