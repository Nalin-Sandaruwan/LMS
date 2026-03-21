// apps/gateway/src/proxy/proxy.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProxyService {
  private targets = {
    AUTH: 'http://localhost:3001',
    LMS:  'http://localhost:3002',
  };

  constructor(
    private http: HttpService,
    private config: ConfigService,
  ) {}

  async forward(req, res, target: 'AUTH' | 'LMS') {
    let url = req.url;
    
    if (target === 'LMS') {
      url = url.replace(/^\/api/, '');   // /api/lms → /lms
    }
    
    const fullUrl = `${this.targets[target]}${url}`;
    
    console.log("🔄 PROXY FORWARD");
    console.log("📍 Target:", target);
    console.log("📍 Full URL:", fullUrl);
    console.log("📍 Method:", req.method);
    
    try {
      const response: any = await this.http.request({
        method: req.method,
        url: fullUrl,
        data: req.body,
        headers: {
          ...req.headers,
          host: undefined,
        },
      }).toPromise();

      console.log("✅ Response from LMS:", response.status);
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error("❌ Proxy error:", error.message);
      res.status(error.response?.status || 500).json(error.response?.data || { error: error.message });
    }
  }
}