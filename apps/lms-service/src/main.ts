import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(cookieParser());
  await app.listen(3002, 'localhost');
  console.log('LMS Service is running on http://localhost:3002');
}
bootstrap();
