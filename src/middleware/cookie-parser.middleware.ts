import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as cookieParser from 'cookie-parser';

@Injectable()
export class CookieParserMiddleware implements NestMiddleware {
  private cookieParserMiddleware = cookieParser();

  use(req: Request, res: Response, next: NextFunction) {
    this.cookieParserMiddleware(req, res, (err?: any) => {
      if (err) {
        next(err);
      } else {
        const userId = req.cookies.userId;

        req['userId'] = userId; 
        next();
      }
    });
  }
}