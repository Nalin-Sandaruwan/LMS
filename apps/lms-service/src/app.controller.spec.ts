import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  const mockAppService = {
    getHello: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: mockAppService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getHello', () => {
    it('should return whatever the appService returns', () => {
      mockAppService.getHello.mockReturnValue('Hello from LMS!');

      const result = appController.getHello();

      expect(mockAppService.getHello).toHaveBeenCalledTimes(1);
      expect(result).toBe('Hello from LMS!');
    });
  });

  describe('getLms', () => {
    it('should log headers and return a success message', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      const result = appController.getLms('123', 'ADMIN') as any;

      expect(consoleSpy).toHaveBeenCalledWith(
        '✅ [LMS] Request from user:',
        '123',
        'Role:',
        'ADMIN',
      );
      expect(result).toEqual({
        message: 'Hello from LMS',
        userId: '123',
        userRole: 'ADMIN',
      });

      consoleSpy.mockRestore();
    });
  });
});
