// apps/gateway/src/proxy/proxy.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProxyService {
  private targets = {
    AUTH: 'http://localhost:3001',
    LMS: 'http://localhost:3002',
  };

  constructor(
    private http: HttpService,
    private config: ConfigService,
  ) {}

  async forward(req, res, target: 'AUTH' | 'LMS') {
    let url = req.url;

    if (target === 'LMS') {
      url = url.replace(/^\/api/, ''); // /api/lms → /lms
    }

    const fullUrl = `${this.targets[target]}${url}`;

    console.log('🔄 PROXY FORWARD');
    console.log('📍 Target:', target);
    console.log('📍 Full URL:', fullUrl);
    console.log('📍 Method:', req.method);
    console.log('📍 Request headers x-user-id:', req.headers['x-user-id']);
    console.log('📍 Request headers x-user-role:', req.headers['x-user-role']);
    console.log(
      '📍 ALL request headers keys:',
      Object.keys(req.headers).filter(
        (k) => k.includes('user') || k.includes('x-'),
      ),
    );

    try {
      const headersToForward = {
        ...req.headers,
        host: undefined,
      };

      console.log('✅ About to forward with headers:');
      console.log('   x-user-id:', headersToForward['x-user-id']);
      console.log('   x-user-role:', headersToForward['x-user-role']);

      const response: any = await this.http
        .request({
          method: req.method,
          url: fullUrl,
          data: req.body,
          headers: headersToForward,
        })
        .toPromise();

      console.log('✅ Response from', target, ':', response.status);

      // Forward the Set-Cookie headers if any
      if (response.headers['set-cookie']) {
        res.setHeader('set-cookie', response.headers['set-cookie']);
      }

      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('❌ Proxy error:', error.message);

      // Forward error response cookies as well, crucial for logout
      if (error.response?.headers?.['set-cookie']) {
        res.setHeader('set-cookie', error.response.headers['set-cookie']);
      }

      res
        .status(error.response?.status || 500)
        .json(error.response?.data || { error: error.message });
    }
  }
}
