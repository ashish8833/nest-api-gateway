import { Body, Controller, Post } from '@nestjs/common';
import { LoginDocs } from '../docs/login.docs';
import { DTOLogin } from '../dtos';
import { Response } from 'src/common/response/decorators/response.decorator';
import { LoginSerialization } from '../serializations/login.serialization';
import { CAuthMessage } from '../constants/auth.constant';
import { LoginServices } from '../services';

@Controller({
  path: 'auth',
  version: '2',
})
export class AuthenticationController {

  constructor(private readonly loginService: LoginServices) { }

  @Post('/')
  @LoginDocs()
  @Response(CAuthMessage.Success, { serialization: LoginSerialization })
  async login(@Body() body: DTOLogin) {

    const {
      email,
      password
    } = body;

    await this.loginService.login(email, password)

    return {
      ...body,
    };
  }
}
