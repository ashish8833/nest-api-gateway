import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import config from './config';
import { ResponseModule } from './common/response/response.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: config,
    }),
    ResponseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
