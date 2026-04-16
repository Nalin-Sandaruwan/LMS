import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  BadRequestException,
} from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';

@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  create(
    @Body() createEnrollmentDto: CreateEnrollmentDto,
    @Headers('x-user-id') userId: string,
    @Headers('x-user-role') userRole: string,
  ) {
    if (!userId || isNaN(Number(userId))) {
      throw new BadRequestException('Invalid or missing x-user-id header');
    }

    // Security: Always trust the gateway header over the request body
    createEnrollmentDto.userId = Number(userId);

    //check the user role
    // if (userRole !== 'user') {
    //   throw new BadRequestException('Only students can enroll in courses');
    // }
    return this.enrollmentService.create(createEnrollmentDto);
  }

  //get user enrolled courses
  @Get('user-enrolled-courses')
  findAllByUser(@Headers('x-user-id') userId: string) {
    if (!userId || isNaN(Number(userId))) {
      throw new BadRequestException('Invalid or missing x-user-id header');
    }
    return this.enrollmentService.findAllByUserId(Number(userId));
  }

  @Get()
  findAll() {
    return this.enrollmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enrollmentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEnrollmentDto: UpdateEnrollmentDto,
  ) {
    return this.enrollmentService.update(+id, updateEnrollmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enrollmentService.remove(+id);
  }
}
