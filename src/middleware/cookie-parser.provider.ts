
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CookieParserMiddleware } from './cookie-parser.middleware';

@Module({})
export class CookieParserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CookieParserMiddleware).forRoutes('*');
  }
}