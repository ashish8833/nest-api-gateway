import { Module } from '@nestjs/common';
import { AuthenticationController } from './controller/authentication.controller';
import { LoginServices, RefreshTokenServices } from './services';
import { JWTAccessStrategy } from './guards/jwt-access/jwt-access.strategy';

@Module({
  controllers: [AuthenticationController],
  providers: [JWTAccessStrategy, LoginServices, RefreshTokenServices],
  imports: [],
})
export class AuthModule {}
