import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configs from './configs';
import { DatabaseModule } from './database/database.module';
import { HelperModule } from './helper/helper.module';
import { RequestModule } from './request/request.module';
import { ResponseModule } from './response/response.module';
@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      cache: true,
    }),
    DatabaseModule,
    HelperModule,
    RequestModule,
    ResponseModule,
  ],
})
export class CommonModule {}
