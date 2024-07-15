import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { HelperEncryptionService } from 'src/common/helper/services/helper.encryption.service';
import { Users } from 'src/modules/users/entity/users.entity';

@Injectable()
export class LoginServices {
  private readonly accessTokenSecretKey: string;
  private readonly accessTokenExpirationTime: number;
  private readonly accessTokenNotBeforeExpirationTime: number;
  private readonly accessTokenEncryptKey: string;
  private readonly accessTokenEncryptIv: string;

  private readonly refreshTokenSecretKey: string;
  private readonly refreshTokenExpirationTime: number;
  private readonly refreshTokenNotBeforeExpirationTime: number;
  private readonly refreshTokenEncryptKey: string;
  private readonly refreshTokenEncryptIv: string;

  private readonly payloadEncryption: boolean;
  private readonly prefixAuthorization: string;
  private readonly audience: string;
  private readonly issuer: string;
  private readonly subject: string;

  private readonly passwordExpiredIn: number;
  private readonly passwordSaltLength: number;

  constructor(
    private readonly configService: ConfigService,
    private readonly helperEncryptionService: HelperEncryptionService,
    @InjectModel(Users)
    private readonly userRepository: typeof Users
  ) {
    this.accessTokenSecretKey = this.configService.get<string>(
      'auth.accessToken.secretKey'
    );
    this.accessTokenExpirationTime = this.configService.get<number>(
      'auth.accessToken.expirationTime'
    );
    this.accessTokenNotBeforeExpirationTime = this.configService.get<number>(
      'auth.accessToken.notBeforeExpirationTime'
    );
    this.accessTokenEncryptKey = this.configService.get<string>(
      'auth.accessToken.encryptKey'
    );
    this.accessTokenEncryptIv = this.configService.get<string>(
      'auth.accessToken.encryptIv'
    );

    this.refreshTokenSecretKey = this.configService.get<string>(
      'auth.refreshToken.secretKey'
    );
    this.refreshTokenExpirationTime = this.configService.get<number>(
      'auth.refreshToken.expirationTime'
    );
    this.refreshTokenNotBeforeExpirationTime = this.configService.get<number>(
      'auth.refreshToken.notBeforeExpirationTime'
    );
    this.refreshTokenEncryptKey = this.configService.get<string>(
      'auth.refreshToken.encryptKey'
    );
    this.refreshTokenEncryptIv = this.configService.get<string>(
      'auth.refreshToken.encryptIv'
    );

    this.subject = this.configService.get<string>('auth.subject');
    this.audience = this.configService.get<string>('auth.audience');
    this.issuer = this.configService.get<string>('auth.issuer');
  }

  async login(email: string, password: string) {
    const users = await this.userRepository.findOne<Users>({
      where: {
        email,
      },
    });

    console.log(users.updatedAt);
    console.log(users.uuid);
    console.log(users.firstName);
    console.log(users.lastName);
    console.log(users.email);

    const accessToken = await this.helperEncryptionService.jwtEncrypt(
      {
        email,
        password,
      },
      {
        secretKey: this.accessTokenSecretKey,
        expiredIn: this.accessTokenExpirationTime,
        notBefore: this.accessTokenNotBeforeExpirationTime,
        audience: this.audience,
        issuer: this.issuer,
        subject: this.subject,
      }
    );

    const refreshToken = await this.helperEncryptionService.jwtEncrypt(
      {
        email,
        password,
      },
      {
        secretKey: this.refreshTokenSecretKey,
        expiredIn: this.refreshTokenExpirationTime,
        notBefore: this.refreshTokenNotBeforeExpirationTime,
        audience: this.audience,
        issuer: this.issuer,
        subject: this.subject,
      }
    );

    return users;
  }
}
