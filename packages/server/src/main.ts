import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { APIModule } from './modules/api.module';
import { ConfigService } from './modules/config/config.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(APIModule);
  const configService = app.get(ConfigService);
  app.enableCors({ origin: configService.corsWhiteList });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(configService.port);
}

bootstrap();
