import { Role } from 'src/auth/enums/roles.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true  })
  refreshToken: string;

  @Column({
    type: 'enum',
    enum:Role,
    default: Role.USER,
  })
  role: Role;

  @Column()
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
