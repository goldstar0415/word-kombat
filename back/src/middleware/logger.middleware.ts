import { Logger, Middleware, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Middleware()
export class LoggerMiddleware implements NestMiddleware {

  private readonly logger = new Logger('http');

  resolve() {
    return async (req: Request, res: Response, next: NextFunction) => {
      this.logger.log(req.method);
      next();
    };
  }

}
