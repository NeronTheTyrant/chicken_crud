import { Module } from '@nestjs/common';
import { ChickenService } from './chicken.service';
import { ChickenController } from './chicken.controller';

@Module({
  controllers: [ChickenController],
  providers: [ChickenService]
})
export class ChickenModule {}
