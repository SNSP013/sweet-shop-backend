import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import Redis from 'ioredis';

@Injectable()
export class InventoryService {
  constructor(
    private prisma: PrismaService,
    @Inject('REDIS_CLIENT') private redis: Redis,
  ) {}

  // Clear sweets cache anytime stock changes
  private async clearSweetsCache() {
    await this.redis.del('sweets:all');

    const searchKeys = await this.redis.keys('sweets:search:*');
    if (searchKeys.length > 0) {
      await this.redis.del(...searchKeys);
    }
  }

  // PURCHASE
  async purchase(sweetId: number, quantity: number) {
    const sweet = await this.prisma.sweet.findUnique({
      where: { id: sweetId },
    });

    if (!sweet) {
      throw new NotFoundException('Sweet not found');
    }

    if (sweet.quantity < quantity) {
      throw new BadRequestException(
        `Not enough stock. Available: ${sweet.quantity}`,
      );
    }

    const updated = await this.prisma.sweet.update({
      where: { id: sweetId },
      data: { quantity: sweet.quantity - quantity },
    });

    await this.clearSweetsCache();

    return updated;
  }

  // RESTOCK
  async restock(sweetId: number, quantity: number) {
    const sweet = await this.prisma.sweet.findUnique({
      where: { id: sweetId },
    });

    if (!sweet) {
      throw new NotFoundException('Sweet not found');
    }

    const updated = await this.prisma.sweet.update({
      where: { id: sweetId },
      data: { quantity: sweet.quantity + quantity },
    });

    await this.clearSweetsCache();

    return updated;
  }
}
