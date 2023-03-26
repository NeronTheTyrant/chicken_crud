import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { APIModule } from './modules/api.module';
import { ConfigService } from './modules/config/config.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(APIModule);
  const configService = app.get(ConfigService);
  app.enableCors({ origin: configService.corsWhiteList });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Chicken API")
    .setDescription('Chicken CRUD api')
    .setVersion('1.0')
    .build()

  const doc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, doc);
  await app.listen(configService.port);
}

bootstrap();
