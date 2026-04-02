import { Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
