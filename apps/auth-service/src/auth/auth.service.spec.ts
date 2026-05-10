import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { HttpService } from '@nestjs/axios';

// 1. Mock the bcrypt library so we don't do real slow hashing in unit tests
jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;

  // 2. Setup reusable mock objects
  const mockUserRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
  };

  const mockUsersService = {
    findOneByEmail: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
    signAsync: jest.fn(),
  };

  const mockHttpService = {
    post: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: HttpService, useValue: mockHttpService },
        { provide: 'REFRESH_JWT_SERVICE', useValue: mockJwtService }, // Important: Mock the refresh token service too!
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);

    // Reset all mocks between tests so they don't leak data
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // --- Tests for validateUser ---
  describe('validateUser', () => {
    it('should return a user object (without password) if valid credentials are provided', async () => {
      // Arrange
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
        role: 'STUDENT',
      };
      mockUsersService.findOneByEmail.mockResolvedValue(mockUser);

      // Override bcrypt.compare to pretend the password is a match
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      // Act
      const result = await service.validateUser(
        'test@example.com',
        'password123',
      );

      // Assert
      expect(usersService.findOneByEmail).toHaveBeenCalledWith(
        'test@example.com',
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'password123',
        'hashedPassword',
      );
      expect(result).toEqual({
        id: 1,
        email: 'test@example.com',
        role: 'STUDENT',
      });
    });

    it('should throw NotFoundException if user is not found', async () => {
      mockUsersService.findOneByEmail.mockResolvedValue(null); // Pretend user doesn't exist

      await expect(
        service.validateUser('wrong@example.com', 'password'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw UnauthorizedException if password does not match', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
        role: 'STUDENT',
      };
      mockUsersService.findOneByEmail.mockResolvedValue(mockUser);

      // Override bcrypt.compare to pretend the password is FALSE
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.validateUser('test@example.com', 'wrongpassword'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  // --- Tests for login ---
  describe('login', () => {
    it('should throw NotFoundException if user is not found during login', async () => {
      mockUsersService.findOneByEmail.mockResolvedValue(null);

      await expect(
        service.loginWithCredentials('test@example.com', 'password'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException for invalid credentials during login', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
      };
      mockUsersService.findOneByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false); // Wrong password

      await expect(
        service.loginWithCredentials('test@example.com', 'wrongpassword'),
      ).rejects.toThrow(UnauthorizedException); // Should be UnauthorizedException based on validateUser fix
    });
  });
});
