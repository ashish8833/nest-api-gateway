import { Body, Controller, Post } from '@nestjs/common';
import { LoginDocs } from '../docs/login.docs';
import { DTOLogin } from '../dtos';

@Controller({
  path: 'auth',
  version: '2',
})
export class AuthenticationController {
  @Post('/')
  @LoginDocs()
  async login(@Body() body: DTOLogin) {
    return {
      ...body,
    };
  }
}
