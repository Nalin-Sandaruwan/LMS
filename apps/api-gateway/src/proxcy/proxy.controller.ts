// apps/gateway/src/proxy/proxy.controller.ts
import { Controller, All, Req, Res } from '@nestjs/common';
import { ProxyService } from './proxy.service';

@Controller()
export class ProxyController {
  constructor(private proxyService: ProxyService) {}

  // /auth/* → Auth Server
  @All('/auth/*') // ← Only routes /auth/...
  async proxyToAuth(@Req() req, @Res() res) {
    return this.proxyService.forward(req, res, 'AUTH');
  }

  // /api/* → LMS Server
  @All('/api/*') // ← Only routes /api/...
  async proxyToLms(@Req() req, @Res() res) {
    return this.proxyService.forward(req, res, 'LMS');
  }
}
