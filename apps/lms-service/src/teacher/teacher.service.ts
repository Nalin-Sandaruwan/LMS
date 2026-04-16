import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from './entities/teacher.entity';

@Injectable()
export class TeacherService {
  // private readonly logger = new Logger(UsersService.name);

  // inject the user repository to interact with the database
  constructor(
    @InjectRepository(Teacher) private teacherRepository: Repository<Teacher>,
  ) {}

  async create(createTeacherDto: CreateTeacherDto) {
    const existing = await this.teacherRepository.findOne({
      where: { email: createTeacherDto.email },
    });

    if (existing) {
      throw new BadRequestException('Teacher with this email already exists');
    }

    const teacher = this.teacherRepository.create(createTeacherDto);
    return await this.teacherRepository.save(teacher);
  }

  findAll() {
    return this.teacherRepository.find();
  }

  async findOne(id: number) {
    const teacher = await this.teacherRepository.findOne({ where: { id } });
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }
    return teacher;
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    await this.findOne(id); // Check if exists
    await this.teacherRepository.update(id, updateTeacherDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const teacher = await this.findOne(id);
    await this.teacherRepository.remove(teacher);
    return { message: `Teacher with ID ${id} removed successfully` };
  }
}
