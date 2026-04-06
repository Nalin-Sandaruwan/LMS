import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/roles.enum';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.TEACHER)
  async create(@Body() createCourseDto: CreateCourseDto, @Headers('x-user-id') userId: string) {
    console.log('✅ [CourseController] Create course request from user:', userId);
    const course = {
      ...createCourseDto,
      teacherId: parseInt(userId, 10), // Use teacherId from DTO or fallback to userId
    }
    const result = await this.courseService.create(course);
    return result;
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get('teacher-created')
  findAllTeacherCreated(@Headers('x-user-id') teacherId: string, @Headers('x-user-role') userRole: string) {
    return this.courseService.findAllTeacherCreated(parseInt(teacherId, 10));
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    const result = await this.courseService.update(+id, updateCourseDto);
    return result;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.courseService.remove(+id);
    return result;
  }
}
