import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import config from './configs';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: config
        }),
        SequelizeModule.forRootAsync({
            imports: [
                ConfigModule
            ],
            useFactory: (configService: ConfigService) => ({
                dialect: configService.get('database.dialect'),
                host: configService.get('database.port'),
                port: +configService.get('database.port'),
                username: configService.get('database.username'),
                password: configService.get('database.password'),
                database: configService.get('database.name'),
                autoLoadModels: true,
            }),

        })
    ]
})
export class DatabaseModule { }