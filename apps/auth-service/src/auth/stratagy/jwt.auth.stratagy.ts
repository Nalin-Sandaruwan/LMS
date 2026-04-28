import { Injectable, Inject } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtConfig from 'src/config/jwt.config';
import refreshJwtConfig from './../../config/jwt.config';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          let token = null;
          if (req && req.cookies) {
            token = req.cookies['accessToken'];
          }
          return token;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey:
        configService.get<string>('JWT_SECRET') || process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    console.log('JWT Payload:', payload); // See the token data
    const user = await this.authService.validateJwtToken(payload.sub);
    console.log('User found:', user); // See if user exists

    if (!user) {
      console.log('User not found for ID:', payload.sub); // User not in DB
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      role: String(user.role),
    };
  }
}
