import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';
import { SectionModule } from './section/section.module';
import { LessonsModule } from './lessons/lessons.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import ormConfig from './config/orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes it available everywhere
      envFilePath: '.env', // optional (default is .env)
    }),
    TypeOrmModule.forRoot(ormConfig()),
    TeacherModule,
    StudentModule,
    CourseModule,
    SectionModule,
    LessonsModule,
    EnrollmentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
