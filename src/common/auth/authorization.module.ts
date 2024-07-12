import { Module } from '@nestjs/common';
import { JWTAccessStrategy } from './guards/jwt-access/jwt-access.strategy';
import { JWTRefreshStrategy } from './guards/jwt-refresh/jwt-refresh.strategy';

@Module({
  providers: [JWTAccessStrategy, JWTRefreshStrategy],
  imports: [],
})
export class AuthorizationModule {}
