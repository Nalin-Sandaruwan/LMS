import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { ProxyService } from './proxcy/proxy.service';
import { ProxyController } from './proxcy/proxy.controller';
import { JwtMiddleware } from './middleware/jwt.middleware';

import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 3,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development',
    }),
    // Rate Limiting: 10 requests per 60 seconds
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
  ],
  controllers: [ProxyController],
  providers: [
    ProxyService, 
    JwtMiddleware,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser(), JwtMiddleware).forRoutes('*'); // Apply to all routes
  }
}
