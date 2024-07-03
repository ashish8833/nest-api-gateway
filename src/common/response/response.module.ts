import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseDefaultInterceptor } from './interceptors/response.default.interceptors';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseDefaultInterceptor,
    },
  ],
})
export class ResponseModule {}
