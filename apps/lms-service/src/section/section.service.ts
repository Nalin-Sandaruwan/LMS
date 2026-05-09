import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { Section } from './entities/section.entity';
import { BunnyStreamService } from '../lessons/bunny-stream.service';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
    private readonly bunnyStreamService: BunnyStreamService,
  ) {}

  async create(createSectionDto: CreateSectionDto) {
    const section = this.sectionRepository.create(createSectionDto);
    return await this.sectionRepository.save(section);
  }

  async findAll() {
    return await this.sectionRepository.find({ relations: ['course'] });
  }

  //Teacher Creaated cources showcase
  async findAllTeacherCreated(teacherId: number) {
    return await this.sectionRepository.find({
      where: { course: { teacherId } },
      relations: ['course'],
    });
  }

  async findOne(id: number) {
    return await this.sectionRepository.findOne({
      where: { id },
      relations: ['course', 'lessons'],
    });
  }

  async update(id: number, updateSectionDto: UpdateSectionDto) {
    await this.sectionRepository.update(id, updateSectionDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const section = await this.findOne(id);
    if (section) {
      // ✅ Automatically delete all videos in this section from Bunny.net
      if (section.lessons && section.lessons.length > 0) {
        for (const lesson of section.lessons) {
          if (lesson.bunnyVideoId) {
            console.log(
              `Deleting Bunny.net video ${lesson.bunnyVideoId} for lesson ${lesson.id} (Section ${id} deletion)`,
            );
            await this.bunnyStreamService.deleteVideo(lesson.bunnyVideoId);
          }
        }
      }
      return await this.sectionRepository.remove(section);
    }
    return null;
  }
}
