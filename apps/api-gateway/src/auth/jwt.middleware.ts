// apps/gateway/src/auth/jwt.middleware.ts
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  
  // Public routes — token නොඕනේ
  private publicPaths = [
    '/auth/login',
    '/auth/register',
    '/auth/refresh',
  ];

  constructor(private jwtService: JwtService) {}

  use(req, res, next) {
    const isPublic = this.publicPaths.some(p => req.url.startsWith(p));
    
    if (isPublic) {
      return next(); // Token check skip
    }

    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      throw new UnauthorizedException('Token නොමැත');
    }

    try {
      const payload = this.jwtService.verify(token);
      req.user = payload; // User info request එකට attach
      next();
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}