import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {
  HttpStatus,
  Logger,
  UnprocessableEntityException,
  ValidationError,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import swaggerInit from './swagger';
import { useContainer } from 'class-validator';
import { CustomValidationPipe } from './common/request/pipes/request.pipe';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const enableSwagger = configService.get<boolean>(
    'api-gateway.swaggerDocument'
  );

  const defaultVersion = configService.get<string>(
    'api-gateway.versioing.version'
  );

  const prefix = configService.get<string>('api-gateway.versioing.prefix');

  app.useGlobalPipes(new CustomValidationPipe());

  app.setGlobalPrefix('/api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'v',
  });

  const port = configService.get<number>('api-gateway.port');

  if (enableSwagger) {
    await swaggerInit(app);
  }

  logger.log('==========================================================');
  logger.log(`API GATEWAY Server running on port ${port}`);
  logger.log('==========================================================');

  await app.listen(port);
}
bootstrap();
