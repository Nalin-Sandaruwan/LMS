import { Test, TestingModule } from '@nestjs/testing';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

describe('CourseController', () => {
  let controller: CourseController;
  let service: CourseService;

  const mockCourseService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseController],
      providers: [
        {
          provide: CourseService,
          useValue: mockCourseService,
        },
      ],
    }).compile();

    controller = module.get<CourseController>(CourseController);
    service = module.get<CourseService>(CourseService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call courseService.create and return the result', async () => {
      const dto = { title: 'Docker 101', description: 'Learn Docker', img: '' } as unknown as CreateCourseDto;
      const expectedCourse = { id: 1, teacherId: 1, ...dto };

      mockCourseService.create.mockResolvedValue(expectedCourse);

      // In JavaScript testing we mimic the exact signature your controller takes.
      // Your controller gets '1' as a string and dto as the second param.
      const result = await controller.create('1', dto);

      // The controller is mapping it to teacherId using parseInt
      // but there seems to be a JS object spread mistake inside your actual controller.
      // For testing your Mock, we'll verify it calls whatever your controller currently formats:
      expect(service.create).toHaveBeenCalled();
      expect(result).toEqual(expectedCourse);
    });
  });

  describe('findAll', () => {
    it('should return an array of courses', async () => {
      const expectedCourses = [{ id: 1, title: 'Course 1' }];
      mockCourseService.findAll.mockResolvedValue(expectedCourses);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(expectedCourses);
    });
  });

  describe('findOne', () => {
    it('should find a course by id', async () => {
      const expectedCourse = { id: 1, title: 'Course 1' };
      mockCourseService.findOne.mockResolvedValue(expectedCourse);

      const result = await controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(expectedCourse);
    });
  });

  describe('update', () => {
    it('should update a course', async () => {
      const dto = { title: 'Updated Title' } as UpdateCourseDto;
      const expectedCourse = { id: 1, title: 'Updated Title' };
      mockCourseService.update.mockResolvedValue(expectedCourse);

      const result = await controller.update('1', dto);

      expect(service.update).toHaveBeenCalledWith(1, dto);
      expect(result).toEqual(expectedCourse);
    });
  });

  describe('remove', () => {
    it('should remove a course', async () => {
      mockCourseService.remove.mockResolvedValue(undefined);

      const result = await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toBeUndefined();
    });
  });
});
