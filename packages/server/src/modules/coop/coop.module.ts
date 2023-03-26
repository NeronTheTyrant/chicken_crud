import { Module } from '@nestjs/common';
import { CoopService } from './coop.service';
import { CoopController } from './coop.controller';

@Module({
  controllers: [CoopController],
  providers: [CoopService]
})
export class CoopModule {}
