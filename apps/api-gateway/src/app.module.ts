import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { ProxyService } from './proxcy/proxy.service';
import { ProxyController } from './proxcy/proxy.controller';
import { JwtMiddleware } from './middleware/jwt.middleware';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 3,
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [ProxyController],
  providers: [ProxyService, JwtMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser(), JwtMiddleware).forRoutes('*'); // Apply to all routes
  }
}
