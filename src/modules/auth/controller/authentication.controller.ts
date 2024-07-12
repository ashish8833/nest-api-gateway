import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LoginDocs } from '../docs/login.docs';
import { DTOLogin } from '../dtos';
import { Response } from 'src/common/response/decorators/response.decorator';
import { LoginSerialization } from '../serializations/login.serialization';
import { CAuthMessage } from '../constants/auth.constant';
import { LoginServices } from '../services';
import { JwtAuthGuard } from '../guards/jwt-access/jwt.guard';

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

    const tokens = await this.loginService.login(email, password)

    return {
      ...body,
      ...tokens
    };
  }



  @Get('/me')
  @UseGuards(JwtAuthGuard)
  @Response(CAuthMessage.Success)
  async me(@Request() req) {

    console.log(req.user)

    return {
      "email": "ashish.kadam83@gmail.com",
      "password": "Ashish123$"
    }

  }
}
