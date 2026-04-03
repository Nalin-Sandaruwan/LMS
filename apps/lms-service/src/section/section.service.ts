import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { Section } from './entities/section.entity';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
  ) {}

  async create(createSectionDto: CreateSectionDto) {
    const section = this.sectionRepository.create(createSectionDto);
    return await this.sectionRepository.save(section);
  }

  async findAll() {
    return await this.sectionRepository.find({ relations: ['course'] });
  }

  async findOne(id: number) {
    return await this.sectionRepository.findOne({
      where: { id },
      relations: ['course'],
    });
  }

  async update(id: number, updateSectionDto: UpdateSectionDto) {
    await this.sectionRepository.update(id, updateSectionDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const section = await this.findOne(id);
    if (section) {
      return await this.sectionRepository.remove(section);
    }
    return null;
  }
}
