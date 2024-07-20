import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from 'src/modules/users/entity/users.entity';
import {
  CAuthMessage,
  ENUM_USER_ROLE_AND_STATUS_ERROR,
} from '../constants/auth.constant';
import { IRequestApp } from 'src/common/request/interfaces/request.interface';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { ResponseMetadataSerialization } from 'src/common/response/serializations/response.default.serialization';

@Injectable()
export class UserStatus implements CanActivate {
  private request: IRequestApp;

  constructor(
    @InjectModel(Users)
    private readonly userRepository: typeof Users
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx: HttpArgumentsHost = context.switchToHttp();

    this.request = ctx.getRequest<IRequestApp>();

    const {
      user: { uuid },
    } = context.switchToHttp().getRequest();

    const user = await this.userRepository.findByPk(uuid, {
      raw: true,
      nest: true,
    });

    if (!user.isActive || !user.isDeleted) {
      const __customLang = this.request.__customLang;
      const __requestId = this.request.__id;
      const __path = this.request.path;
      const __timestamp = this.request.__xTimestamp ?? this.request.__timestamp;
      const __timezone = this.request.__timezone;
      const __version = this.request.__version;
      const __repoVersion = this.request.__repoVersion;

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
        errorCode: ENUM_USER_ROLE_AND_STATUS_ERROR.USER_DELETE_OR_INACTIVE,
        statusCode: HttpStatus.UNAUTHORIZED,
        message: CAuthMessage.UserInActiveOrDelete,
        metadata,
      });
    }

    return true;
  }
}
