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
      const loginDto = {
        email: 'student@example.com',
        password: 'password123',
      };
      const expectedTokens = {
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        user: { id: 1, email: 'student@example.com' },
      };

      // Tell our mock service what to return when called
      mockAuthService.login.mockResolvedValue(expectedTokens);

      // Act: Call the controller method
      const result = await controller.login(loginDto, mockResponse);

      // Assert: Verify the behavior
      // 1. Did it call the auth service with the correct email/password?
      expect(authService.login).toHaveBeenCalledWith(
        loginDto.email,
        loginDto.password,
      );

      // 2. Did it try to clear old cookies? (Checking based on your controller logic)
      expect(mockResponse.clearCookie).toHaveBeenCalledWith('accessToken');
      expect(mockResponse.clearCookie).toHaveBeenCalledWith('refreshToken');

      // 3. Did it return the expected data?
      // (Note: If your controller manually sets cookies and returns something else,
      // you would test `mockResponse.cookie` instead of returning the result directly)
      expect(result).toEqual(expectedTokens);
    });
  });
});
