import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn, ManyToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Teacher } from "../../teacher/entities/teacher.entity";
import { Section } from "../../section/entities/section.entity";

@Entity('courses')
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ nullable: true })
    teacherId: number;

    // relationship with the teacher entity
    @ManyToOne(() => Teacher, (teacher) => teacher.courses)
    @JoinColumn({ name: 'teacherId' })
    teacher: Teacher;

    // relationship with the section entity
    @OneToMany(() => Section, (section) => section.course)
    sections: Section[];

    @Column({ nullable: true })
    thumbnail: string;

    @Column({ default: 0 })
    lessonCount: number;

    @Column({ default: false })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
