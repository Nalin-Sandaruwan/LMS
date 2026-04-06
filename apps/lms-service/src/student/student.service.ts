import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const existing = await this.studentRepository.findOne({ 
      where: { email: createStudentDto.email } 
    });
    if (existing) {
      throw new Error('Student with this email already exists');
    }
    const student = this.studentRepository.create(createStudentDto);
    return await this.studentRepository.save(student);
  }

  async findAll() {
    return await this.studentRepository.find();
  }

  async findOne(id: number) {
    return await this.studentRepository.findOne({ where: { id } });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    await this.studentRepository.update(id, updateStudentDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.studentRepository.delete(id);
    return { deleted: true };
  }
}
