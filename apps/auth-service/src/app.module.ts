import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import ormConfig from './config/orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes it available everywhere
      envFilePath: '.env', // optional (default is .env)
    }),
    TypeOrmModule.forRoot(ormConfig()),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
