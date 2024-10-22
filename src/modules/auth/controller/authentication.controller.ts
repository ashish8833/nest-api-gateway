import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { LoginDocs } from '../docs/login.docs';
import { DTOLogin, DTORefreshToken } from '../dtos';
import { Response } from 'src/common/response/decorators/response.decorator';
import { LoginSerialization } from '../serializations/login.serialization';
import { CAuthMessage } from '../constants/auth.constant';
import { LoginServices, RefreshTokenServices } from '../services';
import { MeDocs } from '../docs/me.docs';
import { RefreshDocs } from '../docs/refresh.docs';
import { RoleAccessPermission } from 'src/common/auth/decorators/roleAccess.decorators';
import { RefreshTokenDecorators } from 'src/common/auth/decorators/refreshToken.decorators';
import { ILoginResponse } from '../interfaces';

@Controller({
  path: 'auth',
  version: '2',
})
export class AuthenticationController {
  constructor(
    private readonly loginService: LoginServices,
    private readonly refreshTokenService: RefreshTokenServices
  ) {}

  @Post('/')
  @LoginDocs()
  @Response(CAuthMessage.Success, { serialization: LoginSerialization })
  async login(@Body() body: DTOLogin): Promise<ILoginResponse> {
    const { email, password } = body;

    const tokens = await this.loginService.login(email, password);

    return tokens;
  }

  @Get('/me')
  @RoleAccessPermission()
  @Response(CAuthMessage.Success)
  @MeDocs()
  async me(@Request() req) {
    return {
      ...req.user,
    };
  }

  @Post('/refresh')
  @RefreshTokenDecorators()
  @Response(CAuthMessage.Success)
  @RefreshDocs()
  async refresh(@Body() body: DTORefreshToken, @Request() req) {
    return this.refreshTokenService.token(req.user.email, req.user.password);
  }
}
