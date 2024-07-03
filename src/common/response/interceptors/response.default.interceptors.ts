import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ResponseDefaultSerialization } from '../serializations/response.default.serialization';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';
import { map } from 'rxjs/operators';
import {
  RESPONSE_MESSAGE_PATH_META_KEY,
  RESPONSE_MESSAGE_PROPERTIES_META_KEY,
  RESPONSE_SERIALIZATION_META_KEY,
  RESPONSE_SERIALIZATION_OPTIONS_META_KEY,
} from '../constants/response.constant';
import {
  ClassConstructor,
  ClassTransformOptions,
  plainToInstance,
} from 'class-transformer';
import { IMessageOptionsProperties } from 'src/common/message/interface/message.interface';
import { IResponse } from '../interfaces/response.interface';

@Injectable()
export class ResponseDefaultInterceptor<T>
  implements NestInterceptor<Promise<T>>
{
  constructor(private readonly reflector: Reflector) {}

  // async intercept(context: ExecutionContext, next: CallHandler<Promise<T>>) {
  //   console.log('Interceptor call by response');
  //   if (context.getType() === 'http') {
  //     return next.handle().pipe(
  //       map(async (responseData: Promise<Record<string, any>>) => {
  //         const ctx: HttpArgumentsHost = context.switchToHttp();
  //         const responseExpress: Response = ctx.getResponse();
  //         const requestExpress = ctx.getRequest();

  //         let messagePath: string = this.reflector.get<string>(
  //           RESPONSE_MESSAGE_PATH_META_KEY,
  //           context.getHandler()
  //         );
  //         const classSerialization: ClassConstructor<any> = this.reflector.get<
  //           ClassConstructor<any>
  //         >(RESPONSE_SERIALIZATION_META_KEY, context.getHandler());
  //         const classSerializationOptions: ClassTransformOptions =
  //           this.reflector.get<ClassTransformOptions>(
  //             RESPONSE_SERIALIZATION_OPTIONS_META_KEY,
  //             context.getHandler()
  //           );
  //         const messageProperties: IMessageOptionsProperties =
  //           this.reflector.get<IMessageOptionsProperties>(
  //             RESPONSE_MESSAGE_PROPERTIES_META_KEY,
  //             context.getHandler()
  //           );

  //         let statusCode: number = responseExpress.statusCode;
  //         let data: Record<string, any> = undefined;
  //         // response
  //         const response = (await responseData) as IResponse;

  //         if (response) {
  //           const { _metadata } = response;
  //           data = response.data;
  //           console.log(data);

  //           if (classSerialization) {
  //             data = plainToInstance(
  //               classSerialization,
  //               data,
  //               classSerializationOptions
  //             );
  //           }
  //         }

  //         return {
  //           data,
  //         };
  //       })
  //     );
  //   }
  //   return next.handle();
  // }

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data) => {
        return {
          statusCode: 200,
          data: data,
        };
      })
    );
  }
}
