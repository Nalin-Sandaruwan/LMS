import { Test, TestingModule } from '@nestjs/testing';
import { SectionService } from './section.service';

import { getRepositoryToken } from '@nestjs/typeorm';
import { Section } from './entities/section.entity';
import { BunnyStreamService } from '../lessons/bunny-stream.service';

describe('SectionService', () => {
  let service: SectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SectionService,
        { provide: getRepositoryToken(Section), useValue: {} },
        { provide: BunnyStreamService, useValue: {} },
      ],
    }).compile();

    service = module.get<SectionService>(SectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
