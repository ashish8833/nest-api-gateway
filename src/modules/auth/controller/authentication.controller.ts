import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { LoginDocs } from '../docs/login.docs';

@Controller({
  path: 'auth',
  version: '2',
})
export class AuthenticationController {
  @Post('/')
  @LoginDocs()
  async login(@Body() body) {
    return {
      ...body,
    };
  }
}
