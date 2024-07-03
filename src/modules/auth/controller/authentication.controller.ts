import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { LoginDocs } from '../docs/login.docs';
import { DTOLogin } from '../dtos';
import { Response } from 'src/common/response/decorators/response.decorator';

@Controller({
  path: 'auth',
  version: '2',
})
export class AuthenticationController {


  @Post('/')
  @LoginDocs()
  @Response('Login successfully')
  async login(@Body() body: DTOLogin) {
    return {
      ...body,
    };
  }
}
