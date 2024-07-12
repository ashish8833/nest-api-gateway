import {
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { IRequestApp } from 'src/common/request/interfaces/request.interface';
import { ResponseMetadataSerialization } from 'src/common/response/serializations/response.default.serialization';
import {
  CAuthMessage,
  ENUM_ACCESS_TOKEN_CODE_ERROR,
} from '../../constants/auth.constant';

@Injectable()
export class JwtRefreshAuthGuar extends AuthGuard('jwt-refresh') {
  private request: IRequestApp;

  canActivate(context: ExecutionContext) {
    const ctx: HttpArgumentsHost = context.switchToHttp();
    this.request = ctx.getRequest<IRequestApp>();

    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    const __customLang = this.request.__customLang;
    const __requestId = this.request.__id;
    const __path = this.request.path;
    const __timestamp = this.request.__xTimestamp ?? this.request.__timestamp;
    const __timezone = this.request.__timezone;
    const __version = this.request.__version;
    const __repoVersion = this.request.__repoVersion;

    if (info instanceof TokenExpiredError) {
      let metadata: ResponseMetadataSerialization = {
        languages: __customLang,
        timestamp: __timestamp,
        timezone: __timezone,
        requestId: __requestId,
        path: __path,
        version: __version,
        repoVersion: __repoVersion,
      };

      throw new UnauthorizedException({
        errorCode: ENUM_ACCESS_TOKEN_CODE_ERROR.ACCESS_TOKEN_EXPIRE_CODE,
        statusCode: HttpStatus.UNAUTHORIZED,
        message: CAuthMessage.AccessTokenExpire,
        metadata,
      });
    }

    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}
