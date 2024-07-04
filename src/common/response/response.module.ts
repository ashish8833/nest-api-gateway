import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseCustomHeadersInterceptor } from './interceptors/response.custom-headers.interceptor';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseCustomHeadersInterceptor,
    },
  ],
})
export class ResponseModule {}
