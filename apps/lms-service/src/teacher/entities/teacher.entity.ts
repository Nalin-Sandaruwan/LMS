import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Course } from '../../course/entities/course.entity';

@Entity('teachers')
export class Teacher {
  @PrimaryColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  mobileNumber: string;

  @Column()
  teachingExpert: string;

  @Column('text')
  shortBio: string;

  @Column('simple-json', { nullable: true })
  socialLinks: string;

  @Column({ nullable: true })
  profilePicture: string;

  //relationship with the course entity
  @OneToMany(() => Course, (course) => course.teacher)
  courses: Course[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
