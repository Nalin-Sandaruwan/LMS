import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

export default (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    entities: [User],
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
  };
};
