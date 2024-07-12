import { Module } from '@nestjs/common';
import { AuthorizationModule } from 'src/common/auth/authorization.module';
import { AuthenticationController } from './controller/authentication.controller';
import { LoginServices, RefreshTokenServices } from './services';
@Module({
  controllers: [AuthenticationController],
  providers: [LoginServices, RefreshTokenServices],
  imports: [AuthorizationModule],
})
export class AuthModule {}
