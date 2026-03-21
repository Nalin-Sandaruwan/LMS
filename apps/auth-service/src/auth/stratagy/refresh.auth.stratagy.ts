import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { Request } from 'express';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh') {
  private readonly logger = new Logger(RefreshTokenStrategy.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          let token = null;
          if (req && req.cookies) {
            token = req.cookies['refreshToken'];
            console.log("🔐 [REFRESH-STRATEGY] Token extracted from cookies:", token ? "YES" : "NO");
          }
          return token;
        },
      ]),
      secretOrKey: configService.get<string>('JWT_SECRET') || process.env.JWT_SECRET,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    console.log("🔄 [REFRESH-STRATEGY] Validating refresh token...");
    console.log("🔄 [REFRESH-STRATEGY] Payload:", payload);

    const refreshToken = req.cookies?.['refreshToken'];
    if (!refreshToken) {
      console.error("❌ [REFRESH-STRATEGY] Refresh token not found in cookies");
      throw new UnauthorizedException('Refresh token not found in cookies');
    }

    const userIdNum = Number(payload.sub);
    if (Number.isNaN(userIdNum)) {
      console.error("❌ [REFRESH-STRATEGY] Invalid user ID in payload");
      throw new UnauthorizedException('Invalid token payload');
    }

    console.log("✅ [REFRESH-STRATEGY] User ID:", userIdNum);
    console.log("✅ [REFRESH-STRATEGY] Refresh token (sent):", refreshToken.substring(0, 20) + "...");

    // ✅ Get user to check stored token
    const user = await this.authService.validateJwtToken(userIdNum);
    if (!user) {
      console.error("❌ [REFRESH-STRATEGY] User not found in DB");
      throw new UnauthorizedException('User not found');
    }

    console.log("✅ [REFRESH-STRATEGY] User found:", user.email);
    console.log("✅ [REFRESH-STRATEGY] Token in DB (stored):", user.refreshToken ? user.refreshToken.substring(0, 20) + "..." : "EMPTY");

    // ✅ Compare tokens
    if (user.refreshToken !== refreshToken) {
      console.error("❌ [REFRESH-STRATEGY] Token mismatch!");
      console.error("   Sent:  ", refreshToken.substring(0, 50) + "...");
      console.error("   Stored:", user.refreshToken ? user.refreshToken.substring(0, 50) + "..." : "NULL");
      throw new UnauthorizedException('Invalid refresh token - tokens do not match');
    }

    console.log("✅ [REFRESH-STRATEGY] Token validation successful!");
    return this.authService.validateRefreshToken(userIdNum, refreshToken);
  }
}