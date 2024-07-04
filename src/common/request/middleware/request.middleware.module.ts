import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import {
  RequestRawBodyParserMiddleware,
  RequestTextBodyParserMiddleware,
  RequestUrlencodedBodyParserMiddleware,
  RequestJsonBodyParserMiddleware,
} from './body-parser/request.body-parser.middleware';
import { RequestIdMiddleware } from './id/request.id.middleware';
import { RequestTimestampMiddleware } from './timestamp/request.timestamp.middleware';
import { RequestTimezoneMiddleware } from './timezone/request.timezone.middleware';

@Module({})
export class RequestMiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        RequestRawBodyParserMiddleware,
        RequestTextBodyParserMiddleware,
        RequestUrlencodedBodyParserMiddleware,
        RequestJsonBodyParserMiddleware,
        RequestIdMiddleware,
        RequestTimezoneMiddleware,
        RequestTimestampMiddleware
      )
      .forRoutes('*');
  }
}
