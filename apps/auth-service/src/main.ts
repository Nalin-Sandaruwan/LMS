import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // ✅ Add cookie parser middleware FIRST
  app.use(cookieParser());
  
  // ✅ Add debug middleware to log incoming cookies
  app.use((req, res, next) => {
    console.log("🔍 [COOKIE-DEBUG] Path:", req.path);
    console.log("🔍 [COOKIE-DEBUG] Cookie header:", req.headers.cookie);
    console.log("🔍 [COOKIE-DEBUG] Parsed cookies:", req.cookies);
    next();
  });
  
  await app.listen(3001, 'localhost');
  console.log('Auth Service is running on http://localhost:3001');
}
bootstrap();
