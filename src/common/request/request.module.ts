import { Module } from '@nestjs/common';
import { RequestMiddlewareModule } from './middleware/request.middleware.module';

@Module({
  imports: [RequestMiddlewareModule],
})
export class RequestModule {}
