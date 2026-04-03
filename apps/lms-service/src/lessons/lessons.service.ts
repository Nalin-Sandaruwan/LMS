import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}

  async create(createLessonDto: CreateLessonDto) {
    const lesson = this.lessonRepository.create(createLessonDto);
    return await this.lessonRepository.save(lesson);
  }

  async findAll() {
    return await this.lessonRepository.find({ relations: ['section'] });
  }

  async findOne(id: number) {
    const lesson = await this.lessonRepository.findOne({
      where: { id },
      relations: ['section'],
    });
    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }
    return lesson;
  }

  async update(id: number, updateLessonDto: UpdateLessonDto) {
    await this.lessonRepository.update(id, updateLessonDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const lesson = await this.findOne(id);
    return await this.lessonRepository.remove(lesson);
  }
}

