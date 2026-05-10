import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Course } from 'src/course/entities/course.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Enrollment } from 'src/enrollment/entities/enrollment.entity';

export default (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    entities: [Teacher, Course, Enrollment],
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
  };
};
