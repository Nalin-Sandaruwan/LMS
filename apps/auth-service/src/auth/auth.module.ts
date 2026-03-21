import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module'; // Adjust path if needed
import { User } from 'src/users/entities/user.entity'; // Adjust path if needed
import { LocalAuthStrategy } from './stratagy/local.auth.stratagy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './stratagy/jwt.auth.stratagy';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { RefreshTokenStrategy } from './stratagy/refresh.auth.stratagy';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Provides UserRepository
    UsersModule, // Provides UsersService
    JwtModule.registerAsync(jwtConfig.asProvider()),
    PassportModule.register({ defaultStrategy: 'jwt' }), // Set JWT as the default strategy
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalAuthStrategy, JwtStrategy, RefreshTokenStrategy],
 
}) 
export class AuthModule {}
