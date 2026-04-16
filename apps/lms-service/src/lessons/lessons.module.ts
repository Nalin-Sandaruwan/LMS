import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { Lesson } from './entities/lesson.entity';
import { Section } from '../section/entities/section.entity';
import { BunnyStreamService } from './bunny-stream.service';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lesson, Section]),
    forwardRef(() => CourseModule),
  ],
  controllers: [LessonsController],
  providers: [LessonsService, BunnyStreamService],
  exports: [TypeOrmModule, BunnyStreamService, LessonsService],
})
export class LessonsModule {}
