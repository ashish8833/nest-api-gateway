import { Module } from '@nestjs/common';
import { AuthenticationController } from './controller/authentication.controller';
import { LoginServices } from './services';
import { JWTAccessStrategy } from './guards/jwt-access/jwt-access.strategy';

@Module({
  controllers: [AuthenticationController],
  providers: [JWTAccessStrategy, LoginServices],
  imports: [],
})
export class AuthModule {}
