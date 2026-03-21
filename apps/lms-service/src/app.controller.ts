import { Controller, Get, Headers } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('lms')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/lms')
  getLms(@Headers('x-user-id') userId: string, @Headers('x-user-role') userRole: string) {
    console.log('✅ [LMS] Request from user:', userId, 'Role:', userRole);
    return {
      message: 'Hello from LMS',
      userId: userId,
      userRole: userRole,
    };
  }
}
