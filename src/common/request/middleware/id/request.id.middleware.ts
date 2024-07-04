import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { v4 as uuidV4 } from 'uuid';
import { IRequestApp } from 'src/common/request/interfaces/request.interface';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  async use(
    req: IRequestApp,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const uuid: string = uuidV4();
    req.__id = uuid;
    next();
  }
}
