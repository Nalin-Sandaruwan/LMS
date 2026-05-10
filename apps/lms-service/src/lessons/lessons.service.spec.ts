import { Test, TestingModule } from '@nestjs/testing';
import { LessonsService } from './lessons.service';

import { getRepositoryToken } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Section } from '../section/entities/section.entity';
import { BunnyStreamService } from './bunny-stream.service';
import { CourseService } from '../course/course.service';

describe('LessonsService', () => {
  let service: LessonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LessonsService,
        { provide: getRepositoryToken(Lesson), useValue: {} },
        { provide: getRepositoryToken(Section), useValue: {} },
        { provide: BunnyStreamService, useValue: {} },
        { provide: CourseService, useValue: {} },
      ],
    }).compile();

    service = module.get<LessonsService>(LessonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
