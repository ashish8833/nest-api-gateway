import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import config from './config';
import { ResponseModule } from './common/response/response.module';
import { RequestModule } from './common/request/request.module';
import { HelperModule } from './common/helper/helper.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: config,
    }),
    HelperModule,
    RequestModule,
    ResponseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
