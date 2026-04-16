import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { Course } from './entities/course.entity';
import { Teacher } from '../teacher/entities/teacher.entity';
import { LessonsModule } from '../lessons/lessons.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, Teacher]),
    forwardRef(() => LessonsModule),
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [TypeOrmModule, CourseService],
})
export class CourseModule {}
