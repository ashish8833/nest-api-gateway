import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HelperEncryptionService } from "src/common/helper/services/helper.encryption.service";


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
        private readonly helperEncryptionService: HelperEncryptionService
    ) {

        this.accessTokenSecretKey = this.configService.get<string>('auth.accessToken.secretKey');

    }



}