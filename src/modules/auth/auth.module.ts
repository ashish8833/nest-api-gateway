import { Module } from '@nestjs/common';
import { AuthenticationController } from './controller/authentication.controller';
import { LoginServices } from './services';
import { JWTStrategry } from './guards/jwt-access/jwt.strategy';

@Module({
  controllers: [AuthenticationController],
  providers: [JWTStrategry, LoginServices],
  imports: []
})
export class AuthModule { }
