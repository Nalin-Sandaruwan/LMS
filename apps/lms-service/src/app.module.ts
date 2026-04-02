import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import ormConfig from './config/orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes it available everywhere
      envFilePath: '.env', // optional (default is .env)
    }),
    TypeOrmModule.forRoot(ormConfig()),
    TeacherModule,
    StudentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
