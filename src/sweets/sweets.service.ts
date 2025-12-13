import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import Redis from 'ioredis';
import { getPagination, getSorting } from '../common/utils/pagination.util';
import { Prisma, Sweet as SweetType } from '@prisma/client';

@Injectable()
export class SweetsService {
  constructor(
    private prisma: PrismaService,
    @Inject('REDIS_CLIENT') private redis: Redis,
  ) {}

  // 🔄 Clear all sweets cache
  private async clearCache() {
    await this.redis.del('sweets:all');

    // Delete all search caches
    const keys = await this.redis.keys('sweets:search:*');
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }

  // CREATE
  async create(data: Prisma.SweetCreateInput): Promise<SweetType> {
    const sweet = await this.prisma.sweet.create({ data });
    await this.clearCache();
    return sweet;
  }

  // GET ALL (with pagination + sorting)
  async findAll(query?: any): Promise<{
    data: SweetType[];
    meta: { page: number; limit: number; total: number; totalPages: number };
  }> {
    const { page, limit, skip } = getPagination(query);
    const orderBy = getSorting(query.sort);

    const [data, total] = await this.prisma.$transaction([
      this.prisma.sweet.findMany({
        skip,
        take: limit,
        orderBy,
      }),
      this.prisma.sweet.count(),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // SEARCH (proper Prisma types)
  async search(query: any): Promise<{
    data: SweetType[];
    meta: { page: number; limit: number; total: number; totalPages: number };
  }> {
    const { page, limit, skip } = getPagination(query);
    const orderBy = getSorting(query.sort);

    const { name, category, minPrice, maxPrice } = query;

    // Build conditions safely
    const conditions: Prisma.SweetWhereInput[] = [];

    if (name) {
      conditions.push({
        name: { contains: name, mode: Prisma.QueryMode.insensitive },
      });
    }

    if (category) {
      conditions.push({
        category: { contains: category, mode: Prisma.QueryMode.insensitive },
      });
    }

    if (minPrice) {
      conditions.push({ price: { gte: Number(minPrice) } });
    }

    if (maxPrice) {
      conditions.push({ price: { lte: Number(maxPrice) } });
    }

    const where: Prisma.SweetWhereInput = {
      AND: conditions.length > 0 ? conditions : undefined,
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.sweet.findMany({
        skip,
        take: limit,
        where,
        orderBy,
      }),
      this.prisma.sweet.count({ where }),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // FIND ONE
  async findOne(id: number): Promise<SweetType> {
    const sweet = await this.prisma.sweet.findUnique({ where: { id } });
    if (!sweet) throw new NotFoundException('Sweet not found');
    return sweet;
  }

  // UPDATE
  async update(id: number, data: Prisma.SweetUpdateInput): Promise<SweetType> {
    await this.findOne(id);

    const updated = await this.prisma.sweet.update({
      where: { id },
      data,
    });

    await this.clearCache();

    return updated;
  }

  // DELETE
  async delete(id: number): Promise<SweetType> {
    await this.findOne(id);

    const deleted = await this.prisma.sweet.delete({ where: { id } });

    await this.clearCache();

    return deleted;
  }
}
