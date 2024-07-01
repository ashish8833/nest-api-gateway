import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default async function (app) {

  const logger = new Logger();

  const docName: string = 'API';

  const docDesc: string = 'API Description';

  const docVersion: string = '1';

  const docPrefix: string = 'api/v1/docs';

  const swaggerDocBuild = new DocumentBuilder()
    .setTitle(docName)
    .setDescription(docDesc)
    .setVersion(docVersion)
    .addTag("API's")
    .addServer(`/`)
    .addServer(`/staging`)
    .addServer(`/production`)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'accessToken'
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerDocBuild, {
    deepScanRoutes: true,
    extraModels: [],
  });

  SwaggerModule.setup(docPrefix, app, document, {
    explorer: true,
    customSiteTitle: docName,
  });

  logger.log(`==========================================================`);

  logger.log(`Docs will serve on ${docPrefix}`, 'NestApplication');

  logger.log(`==========================================================`);
}
