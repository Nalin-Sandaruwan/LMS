// Add this at the very top before anything else
process.noDeprecation = true;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpService } from '@nestjs/axios';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cookieParser from 'cookie-parser';
import { JwtMiddleware } from './middleware/jwt.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: [
      'http://localhost:5174',
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:1575',
      'http://31.97.135.164:5173',
      'http://31.97.135.164:5174',
      'http://31.97.135.164:1575',
      'http://31.97.135.164:3000',
    ], // Keep aligned with your front-end ports
    credentials: true,
  });

  // ✅ Get HttpService using the CLASS token (not string)
  const httpService = app.get(HttpService);
  const jwtMiddleware = new JwtMiddleware(httpService);

  // ✅ Step 1: Cookie parser
  app.use(cookieParser());

  // ✅ Step 2: JWT middleware (BEFORE proxy)
  app.use((req, res, next) => jwtMiddleware.use(req, res, next));

  // ✅ Step 3: Auth proxy
  app.use(
    '/auth/',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
      pathRewrite: { '^/auth': '' },
    }),
  );

  // ✅ Step 4: API proxy
  app.use(
    '/api/',
    createProxyMiddleware({
      target: 'http://localhost:3002',
      changeOrigin: true,
    }),
  );

  await app.listen(3000);
  console.log('API Gateway running on http://localhost:3000');
}

bootstrap();
