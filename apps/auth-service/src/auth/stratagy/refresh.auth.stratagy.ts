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
        // ✅ Try to extract token from cookies FIRST
        (req: Request) => {
          let token = null;
          if (req && req.cookies) {
            token = req.cookies['refreshToken'];
            if (token) {
              console.log("🔐 [REFRESH-STRATEGY] Token extracted from cookies ✓");
              return token;
            }
          }
          console.log("⚠️ [REFRESH-STRATEGY] No token in cookies, checking body...");
          
          // ✅ Fallback: Check body (for inter-service calls)
          if (req.body && req.body.refreshToken) {
            console.log("🔐 [REFRESH-STRATEGY] Token extracted from body ✓");
            return req.body.refreshToken;
          }
          
          console.log("❌ [REFRESH-STRATEGY] No token found in cookies or body");
          return null;
        },
      ]),
      secretOrKey: configService.get<string>('REFRESH_JWT_SECRET') || process.env.REFRESH_JWT_SECRET,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    console.log("🔄 [REFRESH-STRATEGY] Validating refresh token...");
    console.log("🔄 [REFRESH-STRATEGY] Payload:", payload);
    console.log("🔄 [REFRESH-STRATEGY] Cookies received:", req.cookies ? Object.keys(req.cookies) : "NO COOKIES");

    const refreshToken = req.cookies?.['refreshToken'];
    if (!refreshToken) {
      console.error("❌ [REFRESH-STRATEGY] Refresh token not found in cookies");
      console.error("   Available cookies:", req.cookies ? Object.keys(req.cookies) : "NONE");
      throw new UnauthorizedException('Refresh token not found in cookies');
    }

    const userIdNum = Number(payload.sub);
    if (Number.isNaN(userIdNum)) {
      console.error("❌ [REFRESH-STRATEGY] Invalid user ID in payload");
      throw new UnauthorizedException('Invalid token payload');
    }

    console.log("✅ [REFRESH-STRATEGY] User ID:", userIdNum);
    console.log("✅ [REFRESH-STRATEGY] JWT signature valid (verified by passport-jwt)");

    // ✅ Get user to verify they still exist
    const user = await this.authService.validateJwtToken(userIdNum);
    if (!user) {
      console.error("❌ [REFRESH-STRATEGY] User not found in DB");
      throw new UnauthorizedException('User not found');
    }

    console.log("✅ [REFRESH-STRATEGY] User found and verified:", user.email);
    console.log("✅ [REFRESH-STRATEGY] Refresh token validation successful!");
    
    // ✅ Return user info for the guard
    return {
      id: userIdNum,
      email: user.email,
    };
  }
}