import * as jwt from 'jsonwebtoken';
import { Middleware, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MessageCodeError } from '../config/error';
import { UserRepository } from '../repository/user/user.repository';

import * as dotenv from 'dotenv';

dotenv.config();

@Middleware()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userRepository: UserRepository) {}

  resolve() {
    return async (req: Request, res: Response, next: NextFunction) => {
      if (
        req.headers.authorization &&
        (req.headers.authorization as string).split(' ')[0] === 'Bearer'
      ) {
        const token = (req.headers.authorization as string).split(' ')[1];
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
        const user = await this.userRepository.findById(decoded.id);
        if (!user) throw new MessageCodeError('request:unauthorized');
        next();
      } else {
        throw new MessageCodeError('request:unauthorized');
      }
    };
  }
}
