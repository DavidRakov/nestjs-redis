import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const { method, originalUrl } = req;

    const startAt = Date.now();
    res.on('finish', () => {
      const { statusCode } = res;
      const finishedAt = Date.now();

      const duration = finishedAt - startAt;
      console.log([`${method} ${originalUrl} ${statusCode} - ${duration}ms`]);
    });

    next();
  }
}
