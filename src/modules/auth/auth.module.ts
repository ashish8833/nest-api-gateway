import { Module } from '@nestjs/common';
import { AuthenticationController } from './controller/authentication.controller';
import { LoginServices } from './services';

@Module({
  controllers: [AuthenticationController],
  providers: [LoginServices]
})
export class AuthModule { }
