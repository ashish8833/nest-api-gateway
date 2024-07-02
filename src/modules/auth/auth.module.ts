import { Module } from '@nestjs/common';
import { AuthenticationController } from './controller/authentication.controller';

@Module({
  controllers: [AuthenticationController]
})
export class AuthModule { }
