import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import swaggerInit from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const enableSwagger = configService.get<boolean>(
    'api-gateway.swaggerDocument'
  );
  if (enableSwagger) {
    await swaggerInit(app);
  }
  await app.listen(3000);
}
bootstrap();
