import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { Response } from 'express';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  // 1. Mock the services that the controller depends on
  const mockAuthService = {
    login: jest.fn(),
  };

  const mockUsersService = {}; // Add mock methods here when you test registration

  // 2. Mock the Express Response object to track cookie operations
  const mockResponse = {
    clearCookie: jest.fn(),
    cookie: jest.fn(),
    send: jest.fn(),
  } as unknown as Response;

  beforeEach(async () => {
    // 3. Set up the testing module with our mocks
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Reset all mock counts between tests
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should authenticate the user, clear old cookies, and return tokens', async () => {
      // Arrange: Setup mock data and service responses
      const mockUser = { id: 1, email: 'student@example.com', role: 'STUDENT' };
      const mockReq = { user: mockUser };

      const expectedTokens = {
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        user: mockUser,
      };

      // Tell our mock service what to return when called
      mockAuthService.login.mockResolvedValue(expectedTokens);

      // Act: Call the controller method
      const result = await controller.login(mockReq, mockResponse);

      // Assert: Verify the behavior
      // 1. Did it call the auth service with the user object from the request?
      expect(authService.login).toHaveBeenCalledWith(mockUser);

      // 2. Did it try to clear old cookies?
      expect(mockResponse.clearCookie).toHaveBeenCalledWith('accessToken');
      expect(mockResponse.clearCookie).toHaveBeenCalledWith('refreshToken');

      // 3. Did it return the expected data?
      expect(result).toEqual(expectedTokens);
    });
  });
});
