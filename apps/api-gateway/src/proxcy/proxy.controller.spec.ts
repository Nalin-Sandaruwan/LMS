import { Test, TestingModule } from '@nestjs/testing';
import { ProxyController } from './proxy.controller';
import { ProxyService } from './proxy.service';

describe('ProxyController', () => {
  let controller: ProxyController;
  let proxyService: ProxyService;

  // 1. Setup a "Mock" Service. We don't want to actually forward
  // real network requests during a unit test.
  const mockProxyService = {
    forward: jest.fn(),
  };

  // 2. This runs before every single test case
  beforeEach(async () => {
    // Create an isolated NestJS container just for this test
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProxyController],
      providers: [
        {
          provide: ProxyService,
          useValue: mockProxyService, // Inject our fake service instead of the real one
        },
      ],
    }).compile();

    controller = module.get<ProxyController>(ProxyController);
    proxyService = module.get<ProxyService>(ProxyService);
  });

  // 3. Clear our mocks after each test to prevent mixing data
  afterEach(() => {
    jest.clearAllMocks();
  });

  // 4. The actual test cases!
  describe('proxyToAuth', () => {
    it('should forward requests starting with /auth/* to the AUTH service', async () => {
      // Arrange (Setup mock request and response objects)
      const mockReq = { url: '/auth/login' };
      const mockRes = { status: jest.fn() };

      // Act (Call the actual method on your controller)
      await controller.proxyToAuth(mockReq, mockRes);

      // Assert (Verify that your controller called the mock service correctly)
      expect(proxyService.forward).toHaveBeenCalledTimes(1);
      expect(proxyService.forward).toHaveBeenCalledWith(
        mockReq,
        mockRes,
        'AUTH',
      );
    });
  });

  describe('proxyToLms', () => {
    it('should forward requests starting with /api/* to the LMS service', async () => {
      const mockReq = { url: '/api/courses' };
      const mockRes = { status: jest.fn() };

      await controller.proxyToLms(mockReq, mockRes);

      expect(proxyService.forward).toHaveBeenCalledTimes(1);
      expect(proxyService.forward).toHaveBeenCalledWith(
        mockReq,
        mockRes,
        'LMS',
      );
    });
  });
});
