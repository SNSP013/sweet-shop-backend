import { Controller, Post, Param, Body, UseGuards } from '@nestjs/common';

import { InventoryService } from './inventory.service';
import { PurchaseDto } from './dto/purchase.dto';
import { RestockDto } from './dto/restock.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('inventory')
@UseGuards(JwtAuthGuard)
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Post(':id/purchase')
  purchase(@Param('id') id: string, @Body() body: PurchaseDto) {
    return this.inventoryService.purchase(Number(id), body.quantity);
  }

  @Post(':id/restock')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  restock(@Param('id') id: string, @Body() body: RestockDto) {
    return this.inventoryService.restock(Number(id), body.quantity);
  }
}
