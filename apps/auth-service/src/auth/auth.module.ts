import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entities/user.entity';
import { LocalAuthStrategy } from './stratagy/local.auth.stratagy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './stratagy/jwt.auth.stratagy';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RefreshTokenStrategy } from './stratagy/refresh.auth.stratagy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    // ✅ Register access token JWT
    JwtModule.registerAsync(jwtConfig.asProvider()),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalAuthStrategy,
    JwtStrategy,
    RefreshTokenStrategy,
    // ✅ Custom provider for refresh JWT service
    {
      provide: 'REFRESH_JWT_SERVICE',
      useFactory: (configService: ConfigService) => {
        const jwt = require('jsonwebtoken');
        return {
          signAsync: (payload: any, options: any = {}) => {
            const secret =
              configService.get<string>('REFRESH_JWT_SECRET') ||
              process.env.REFRESH_JWT_SECRET;
            return new Promise((resolve, reject) => {
              jwt.sign(
                payload,
                secret,
                { expiresIn: '7d', ...options },
                (err: any, token: any) => {
                  if (err) reject(err);
                  else resolve(token);
                },
              );
            });
          },
        };
      },
      inject: [ConfigService],
    },
  ],
})
export class AuthModule {}
