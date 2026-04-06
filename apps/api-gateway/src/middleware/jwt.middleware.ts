import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  private readonly logger = new Logger(JwtMiddleware.name);
  private readonly AUTH_BASE = 'http://localhost:3001';

  constructor(private readonly httpService: HttpService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    console.log('=====================================');
    console.log('🚀 [MIDDLEWARE-START] URL:', req.url, 'Method:', req.method);
    console.log('🍪 Cookies available:', Object.keys(req.cookies));
    console.log('=====================================');

    // ✅ ONLY skip these public paths - NO middleware
    const publicPaths = [
      '/auth/login',
      '/auth/signup',
      '/auth/refresh',
      '/auth/signup/teacher',
      '/auth/users',
      '/auth/signup/student',
    ];
    if (publicPaths.includes(req.url)) {
      console.log('✅ [GATEWAY-AUTH] Public route - skipping middleware');
      return next();
    }

    // ✅ ALL other routes need middleware protection
    console.log('🔐 [GATEWAY-AUTH] Checking token for route:', req.url);
    console.log(
      '🍪 [GATEWAY-AUTH] Available cookies:',
      Object.keys(req.cookies),
    );

    const cookieHeader = this.serializeCookies(req.cookies);

    // ✅ If NO accessToken but HAS refreshToken → try refresh
    if (!req.cookies?.accessToken && req.cookies?.refreshToken) {
      console.log(
        '⚠️ [GATEWAY-AUTH] No accessToken but refreshToken exists - refreshing...',
      );

      const refreshed = await this.refresh(cookieHeader);

      if (!refreshed) {
        console.error('❌ [GATEWAY-AUTH] Refresh failed');
        throw new UnauthorizedException('Session invalid. Please login again.');
      }

      console.log('✅ [GATEWAY-AUTH] Refreshed successfully');
      console.log(
        '📊 [REFRESH-DATA] accessToken:',
        refreshed.data?.accessToken?.substring(0, 20),
        'result:',
        refreshed.data?.result,
      );

      this.forwardSetCookies(refreshed.headers['set-cookie'], res);
      this.patchRequestCookie(req, refreshed.data.accessToken);

      // ✅ NEW: After refresh, call verify to get user data
      const newCookieHeader = this.serializeCookies({
        ...req.cookies,
        accessToken: refreshed.data.accessToken,
      });

      const verifyResult = await this.verifyWithUserData(newCookieHeader);
      console.log('📊 [POST-REFRESH-VERIFY] userData:', verifyResult.userData);
      this.attachUserHeaders(req, verifyResult.userData);

      console.log('🎯 [BEFORE-NEXT-TOKEN-REFRESH] Headers:', {
        'x-user-id': req.headers['x-user-id'],
        'x-user-role': req.headers['x-user-role'],
      });

      return next();
    }

    // ✅ Check if ANY tokens exist
    if (!cookieHeader) {
      console.error('❌ [GATEWAY-AUTH] No tokens found');
      throw new UnauthorizedException('No session. Please login first.');
    }

    // ✅ Verify current access token and get user data
    const verifyResult = await this.verifyWithUserData(cookieHeader);
    console.log(
      '📊 [VERIFY-RESULT] isValid:',
      verifyResult.isValid,
      'userData:',
      verifyResult.userData,
    );

    if (verifyResult.isValid) {
      console.log('✅ [GATEWAY-AUTH] Token valid - proceeding');

      // ✅ Attach user info to headers
      console.log('🔍 [ATTACH] userData?.id:', verifyResult.userData?.id);
      if (verifyResult.userData?.id) {
        req.headers['x-user-id'] = String(verifyResult.userData.id);
        req.headers['x-user-role'] = verifyResult.userData.role || 'user';
        console.log(
          `✅ [GATEWAY-AUTH] User info attached - ID: ${verifyResult.userData.id}, Role: ${verifyResult.userData.role}`,
        );
        console.log(
          '📍 [HEADERS-SET] x-user-id:',
          req.headers['x-user-id'],
          'x-user-role:',
          req.headers['x-user-role'],
        );
      } else {
        console.warn(
          '⚠️ [ATTACH] userData is missing id:',
          verifyResult.userData,
        );
      }

      console.log('🎯 [BEFORE-NEXT] Calling next() - Headers now are:', {
        'x-user-id': req.headers['x-user-id'],
        'x-user-role': req.headers['x-user-role'],
      });
      return next();
    }

    // ✅ Token expired - attempt refresh
    console.log('⏰ [GATEWAY-AUTH] Token expired - attempting refresh...');

    const refreshed = await this.refresh(cookieHeader);

    if (!refreshed) {
      console.error('❌ [GATEWAY-AUTH] Refresh failed - force login');
      throw new UnauthorizedException('Session expired. Please log in again.');
    }

    console.log('✅ [GATEWAY-AUTH] Refresh successful');
    this.forwardSetCookies(refreshed.headers['set-cookie'], res);
    this.patchRequestCookie(req, refreshed.data.accessToken);

    // ✅ Attach user info to headers
    if (refreshed.data?.result?.id) {
      req.headers['x-user-id'] = String(refreshed.data.result.id);
      req.headers['x-user-role'] = refreshed.data.result.role || 'user';
      console.log(
        `✅ [GATEWAY-AUTH] User info attached - ID: ${refreshed.data.result.id}, Role: ${refreshed.data.result.role}`,
      );
    }

    console.log('🎯 [BEFORE-NEXT-REFRESH] Calling next() - Headers now are:', {
      'x-user-id': req.headers['x-user-id'],
      'x-user-role': req.headers['x-user-role'],
    });
    return next();
  }

  // ✅ New method: verify AND return user data
  private async verifyWithUserData(
    cookieHeader: string,
  ): Promise<{ isValid: boolean; userData?: any }> {
    try {
      console.log('📤 [VERIFY] Calling /verify...');

      const response = await this.httpService
        .get(`${this.AUTH_BASE}/verify`, {
          headers: {
            Cookie: cookieHeader,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
          validateStatus: () => true,
        })
        .toPromise();

      console.log('✅ [VERIFY] Response received - status:', response?.status);

      if (response?.status === 200) {
        console.log('✅ [VERIFY] Token valid');
        console.log(
          '📊 [VERIFY-RESPONSE] Full response data:',
          JSON.stringify(response?.data),
        );
        console.log('📊 [VERIFY-RESPONSE] result:', response?.data?.result);
        return { isValid: true, userData: response?.data?.result };
      }

      if (response?.status === 401 || response?.status === 403) {
        console.log('⏰ [VERIFY] Token expired - status:', response.status);
        return { isValid: false };
      }

      return { isValid: false };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error('❌ [VERIFY] Error:', errorMsg);
      return { isValid: false };
    }
  }

  private async refresh(
    cookieHeader: string,
  ): Promise<{ headers: Record<string, any>; data: any } | null> {
    try {
      console.log('📤 [REFRESH] Calling /auth/refresh...');

      const refreshTokenMatch = cookieHeader.match(/refreshToken=([^;]+)/);
      if (!refreshTokenMatch) {
        console.error('❌ [REFRESH] No refreshToken found');
        return null;
      }

      const refreshTokenValue = refreshTokenMatch[1];
      console.log('📦 [REFRESH] Extracted refreshToken from cookie header');

      const response = await this.httpService
        .post(
          `${this.AUTH_BASE}/refresh`,
          { refreshToken: refreshTokenValue }, // ✅ Send token in body as fallback
          {
            headers: {
              Cookie: cookieHeader,
              'Content-Type': 'application/json',
            },
            withCredentials: true,
            validateStatus: () => true,
          },
        )
        .toPromise();

      console.log('📥 [REFRESH] Response received - status:', response?.status);

      if (response?.status !== 200 && response?.status !== 201) {
        console.error('❌ [REFRESH] Failed - status:', response?.status);
        return null;
      }

      if (!response?.data?.accessToken) {
        console.error('❌ [REFRESH] Missing accessToken');
        return null;
      }

      console.log('✅ [REFRESH] New tokens received');
      return { headers: response.headers, data: response.data };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error('❌ [REFRESH] Error:', errorMsg);
      return null;
    }
  }

  private forwardSetCookies(
    setCookieHeaders: string[] | string | undefined,
    res: Response,
  ): void {
    if (!setCookieHeaders) {
      return;
    }

    const cookies = Array.isArray(setCookieHeaders)
      ? setCookieHeaders
      : [setCookieHeaders];

    res.setHeader('Set-Cookie', cookies);
  }

  private patchRequestCookie(req: Request, newAccessToken: string): void {
    if (!newAccessToken) {
      return;
    }

    req.cookies['accessToken'] = newAccessToken;

    const rawCookies = req.headers['cookie'] || '';
    req.headers['cookie'] = this.replaceOrAppendCookie(
      rawCookies,
      'accessToken',
      newAccessToken,
    );

    req.headers['authorization'] = `Bearer ${newAccessToken}`;
  }

  private replaceOrAppendCookie(
    raw: string,
    key: string,
    value: string,
  ): string {
    const regex = new RegExp(`(?:^|;\\s*)${key}=[^;]*`);
    const replacement = `${key}=${value}`;

    if (regex.test(raw)) {
      return raw.replace(regex, (match) =>
        match.startsWith(';') ? `; ${replacement}` : replacement,
      );
    }

    return raw ? `${raw}; ${replacement}` : replacement;
  }

  private serializeCookies(cookies: Record<string, string>): string {
    return Object.entries(cookies)
      .map(([k, v]) => `${k}=${v}`)
      .join('; ');
  }

  private attachUserHeaders(req: Request, userData: any): void {
    if (userData?.id) {
      req.headers['x-user-id'] = String(userData.id);
      req.headers['x-user-role'] = userData.role || 'user';
      console.log(
        `✅ [GATEWAY-AUTH] User info attached - ID: ${userData.id}, Role: ${userData.role}`,
      );
    }
  }
}
