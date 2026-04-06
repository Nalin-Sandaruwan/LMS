import { Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('students')
export class Student {
  @PrimaryColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  mobileNumber: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
