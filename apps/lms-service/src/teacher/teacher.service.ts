import { BadRequestException, Injectable } from '@nestjs/common';
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
  ) { }


  async create(createTeacherDto: CreateTeacherDto) {
    const existing = await this.teacherRepository.findOne({ 
      where: { email: createTeacherDto.email } 
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

  findOne(id: number) {
    return `This action returns a #${id} teacher`;
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return `This action updates a #${id} teacher`;
  }

  remove(id: number) {
    return `This action removes a #${id} teacher`;
  }
}
