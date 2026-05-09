import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { Section } from './entities/section.entity';
import { LessonsModule } from '../lessons/lessons.module';

@Module({
  imports: [TypeOrmModule.forFeature([Section]), LessonsModule],
  controllers: [SectionController],
  providers: [SectionService],
  exports: [TypeOrmModule],
})
export class SectionModule {}
