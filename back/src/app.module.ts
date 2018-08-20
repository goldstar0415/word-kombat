import {
  MiddlewaresConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './controller/app/app.controller';
import { AuthController } from './controller/auth/auth.controller';
import { RankController } from './controller/rank/rank.controller';
import { UserController } from './controller/user/user.controller';
import { LeaderboardController } from './controller/leaderboard/leaderboard.controller';
import { UserRepository } from './repository/user/user.repository';
import { RankRepository } from './repository/rank/rank.repository';
import { WordRepository } from './repository/word/word.repository';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { CompressionMiddleware } from '@nest-middlewares/compression';
import { ErrorHandlerMiddleware } from '@nest-middlewares/errorhandler';
import { AuthMiddleware } from './middleware/auth.middleware';
import { WordChatSocket } from './socket/chat/word-chat.socket';
import { ShuffleService } from './service/shuffle.service';
import { LoggerMiddleware } from "./middleware/logger.middleware";

@Module({
  imports: [],
  controllers: [
    AppController,
    AuthController,
    RankController,
    UserController,
    LeaderboardController,
  ],
  components: [
    UserRepository,
    RankRepository,
    WordRepository,
    ShuffleService,
    WordChatSocket,
  ],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void {
    HelmetMiddleware.configure({});

    consumer.apply(HelmetMiddleware);
    consumer.apply(CompressionMiddleware);
    consumer.apply(ErrorHandlerMiddleware);
    consumer.apply(LoggerMiddleware);

    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/api/users', method: RequestMethod.GET },
        { path: '/api/users/:id', method: RequestMethod.GET },
        { path: '/api/users/:id', method: RequestMethod.PUT },
        { path: '/api/users/:id/image', method: RequestMethod.PATCH },
        { path: '/api/users/:id', method: RequestMethod.DELETE },
      );
  }
}
