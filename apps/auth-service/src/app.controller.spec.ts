import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  // 1. Create a mock AppService
  // We define the methods that the controller uses, so we control what it returns.
  const mockAppService = {
    getHello: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        // 2. Inject our fake service instead of the real one
        {
          provide: AppService,
          useValue: mockAppService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  // 3. Reset our mocks after each test to ensure a clean slate
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getHello', () => {
    it('should return whatever the appService returns', () => {
      // Arrange (Setup)
      const expectedMessage = 'Hello from the mock service!';

      // Tell our fake service exactly what to say when asked
      mockAppService.getHello.mockReturnValue(expectedMessage);

      // Act (Execution)
      const result = appController.getHello();

      // Assert (Verification)
      // First, confirm the controller actually called our service's method once
      expect(mockAppService.getHello).toHaveBeenCalledTimes(1);

      // Second, confirm the controller returned the data from the service
      expect(result).toBe(expectedMessage);
    });
  });
});
