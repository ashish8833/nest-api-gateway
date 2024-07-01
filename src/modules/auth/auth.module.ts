import { Module } from '@nestjs/common';
import { AuthenticationController } from './controller/authentication/authentication.controller';

@Module({
  controllers: [AuthenticationController]
})
export class AuthModule { }
