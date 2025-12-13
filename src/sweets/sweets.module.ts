import { Module } from '@nestjs/common';
import { SweetsService } from './sweets.service';
import { SweetsController } from './sweets.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SweetsController],
  providers: [SweetsService],
  exports: [SweetsService],
})
export class SweetsModule {}
