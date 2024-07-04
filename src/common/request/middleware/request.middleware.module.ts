import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RequestIdMiddleware } from './id/request.id.middleware';
import { RequestTimestampMiddleware } from './timestamp/request.timestamp.middleware';
import { RequestTimezoneMiddleware } from './timezone/request.timezone.middleware';

@Module({})
export class RequestMiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        RequestIdMiddleware,
        RequestTimezoneMiddleware,
        RequestTimestampMiddleware
      )
      .forRoutes('*');
  }
}
