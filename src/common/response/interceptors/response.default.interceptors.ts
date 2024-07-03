import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ResponseDefaultSerialization } from "../serializations/response.default.serialization";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { Request, Response } from "express";


@Injectable()
export class ResponseDefaultInterceptor<T>
    implements NestInterceptor<Promise<T>> {

    constructor(
        private readonly reflector: Reflector
    ) { }

    async intercept(context: ExecutionContext, next: CallHandler<Promise<T>>) {

        console.log('Interceptor call by response');

        // if (context.getType() === 'http') {

        //     const ctx: HttpArgumentsHost = context.switchToHttp();
        //     const response: Response = ctx.getResponse();
        //     const request: Request = ctx.getRequest();



        //     return next.handle().pipe()

        // }

        return next.handle();
    }

}