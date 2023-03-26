import { Module } from '@nestjs/common';
import { CoopModule } from '~/modules/coop/coop.module';
import { ChickenModule } from './chicken/chicken.module';

import { ConfigModule } from './config/config.module';
import { PrismaModule } from './prisma/prisma.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [ConfigModule, StatusModule, ChickenModule, CoopModule, PrismaModule],
})
export class APIModule { }
