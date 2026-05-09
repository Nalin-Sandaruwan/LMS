import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Section } from '../../section/entities/section.entity';

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: ['video', 'audio', 'pdf', 'doc', 'text', 'article', 'quiz'],
    default: 'text',
  })
  type: string;

  @Column({ nullable: true })
  fileUrl: string;

  @Column({ nullable: true })
  bunnyVideoId: string;

  @Column({
    type: 'enum',
    enum: ['queued', 'processing', 'finished', 'failed'],
    default: 'queued',
  })
  bunnyStatus: string;

  @Column({ type: 'enum', enum: ['published', 'draft'], default: 'draft' })
  status: string;

  @Column()
  sectionId: number;

  @ManyToOne(() => Section, (section) => section.lessons, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'sectionId' })
  section: Section;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
