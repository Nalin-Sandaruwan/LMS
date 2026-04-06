import { Test, TestingModule } from '@nestjs/testing';
import { TeacherService } from './teacher.service';

import { getRepositoryToken } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';

describe('TeacherService', () => {
  let service: TeacherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeacherService,
        { provide: getRepositoryToken(Teacher), useValue: {} }
      ],
    }).compile();

    service = module.get<TeacherService>(TeacherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
