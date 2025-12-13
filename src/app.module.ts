import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ThrottlerModule } from '@nestjs/throttler';

import { AppConfig } from './config/app.config';
import { JwtConfig } from './config/jwt.config';
import { RedisConfig } from './config/redis.config';

import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SweetsModule } from './sweets/sweets.module';
import { InventoryModule } from './inventory/inventory.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig, JwtConfig, RedisConfig],
    }),

    ThrottlerModule.forRoot([
      {
        name: 'global',
        ttl: 60 * 1000, // 1 minute
        limit: 100, // 100 requests per minute
      },
    ]),
    RedisModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    SweetsModule,
    InventoryModule,
  ],
})
export class AppModule {}
