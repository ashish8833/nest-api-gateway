import { UseInterceptors, applyDecorators } from "@nestjs/common";
import { IResponseOptions } from "../interfaces/response.interface";
import { ResponseDefaultInterceptor } from "../interceptors/response.default.interceptors";



export function Response<T>(
    messagePath: string,
    options?: IResponseOptions<T>
): MethodDecorator {

    return applyDecorators(
        UseInterceptors(ResponseDefaultInterceptor)
    )

}