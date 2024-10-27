import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const dateTime = new Date();
    console.log(
      `${dateTime} con el método ${req.method} en la ruta ${req.originalUrl}`,
    );

    next();
  }
}
