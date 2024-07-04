import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import config from './config';
import { CommonModule } from './common/common.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: config,
      isGlobal: true,
      cache: true,
    }),
    CommonModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
