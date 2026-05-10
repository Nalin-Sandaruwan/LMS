import { Controller, Get, Headers, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { RolesGuard } from './auth/guards/roles.guard';
import { Roles } from './auth/decorators/roles.decorator';
import { Role } from './auth/enums/roles.enum';

@Controller('lms')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/lms')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.TEACHER)
  getLms(
    @Headers('x-user-id') userId: string,
    @Headers('x-user-role') userRole: string,
  ) {
    console.log('✅ [LMS] Request from user:', userId, 'Role:', userRole);
    return {
      message: 'Hello from LMS',
      userId: userId,
      userRole: userRole,
    };
  }
}
