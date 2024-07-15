import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthorizationModule } from 'src/common/auth/authorization.module';
import { Users } from '../users/entity/users.entity';
import { AuthenticationController } from './controller/authentication.controller';
import { LoginServices, RefreshTokenServices } from './services';
@Module({
  controllers: [AuthenticationController],
  providers: [LoginServices, RefreshTokenServices],
  imports: [SequelizeModule.forFeature([Users]), AuthorizationModule],
})
export class AuthModule {}
