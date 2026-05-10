import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';

import { getRepositoryToken } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Teacher } from '../teacher/entities/teacher.entity';

import { BunnyStreamService } from '../lessons/bunny-stream.service';

describe('CourseService', () => {
  let service: CourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        { provide: getRepositoryToken(Course), useValue: {} },
        { provide: getRepositoryToken(Teacher), useValue: {} },
        { provide: BunnyStreamService, useValue: {} },
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
