import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  //create the courses
  async create(createCourseDto: CreateCourseDto) {
    if (!createCourseDto.teacherId) {
      throw new Error('Teacher ID is required to create a course');
    }
    const course = this.courseRepository.create(createCourseDto);
    const savedCourse = await this.courseRepository.save(course);
    return savedCourse;
  }

  //find all
  async findAll() {
    return await this.courseRepository.find({ 
      relations: ['teacher', 'sections', 'sections.lessons'] 
    });
  }


  // finde one by id
  async findOne(id: number) {
    return await this.courseRepository.findOne({
      where: { id },
      relations: ['teacher', 'sections', 'sections.lessons'],
    });
  }

  // update the course
  async update(id: number, updateCourseDto: UpdateCourseDto) {
    await this.courseRepository.update(id, updateCourseDto);
    return this.findOne(id);
  }

  // remove the course
  async remove(id: number) {
    const course = await this.findOne(id);
    if (course) {
      return await this.courseRepository.remove(course);
    }
  }
}
