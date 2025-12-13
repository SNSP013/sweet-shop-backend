import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { DatabaseModule } from '../database/database.module';
import { SweetsModule } from '../sweets/sweets.module';

@Module({
  imports: [DatabaseModule, SweetsModule],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
