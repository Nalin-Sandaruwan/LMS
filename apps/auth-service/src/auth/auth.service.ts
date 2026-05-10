import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { isString } from 'util';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

import { Role } from './enums/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
    private readonly UserService: UsersService,
    private readonly jwtService: JwtService,
    @Inject('REFRESH_JWT_SERVICE') private readonly refreshJwtService: any, // ✅ Inject custom refresh JWT service
  ) {}

  async validateGoogleUser(profile: any, role: Role = Role.USER) {
    const { email, googleId, firstName, lastName, avatar } = profile;

    let user = await this.UserRepository.findOne({
      where: [{ googleId }, { email }],
    });

    if (!user) {
      console.log(`🆕 [AUTH-SERVICE] Creating new Google user: ${email}`);
      // New user registration via Google
      user = this.UserRepository.create({
        email,
        googleId,
        firstName,
        lastName,
        avatar,
        role: role,
        isActive: role === Role.TEACHER ? false : true, // Teachers default to inactive
        password: '', // Social users have no local password
      });
      await this.UserRepository.save(user);
    } else {
      console.log(`👋 [AUTH-SERVICE] Existing Google user logged in: ${email}`);
      // Update profile info if it changed
      await this.UserRepository.update(user.id, {
        googleId,
        firstName,
        lastName,
        avatar,
      });
    }

    // ✅ Always attempt to sync with LMS Service to ensure the profile exists in both databases
    // (The LMS service handles "already exists" gracefully or we handle it in UsersService)
    await this.UserService.syncUserWithLMS(user, `${firstName} ${lastName}`);

    return user;
  }

  // that mainly for local strategy
  async validateUser(email: string, password: string) {
    console.log(`🔐 [AUTH-SERVICE] Validating user: ${email}`);
    const user = await this.UserService.findOneByEmail(email);

    if (!user) {
      console.warn(`❌ [AUTH-SERVICE] User not found: ${email}`);
      throw new NotFoundException('User with this email was not found');
    }

    // Compare plain text password with hashed password
    if (!user.password) {
      console.warn(`❌ [AUTH-SERVICE] User has no local password (social account?): ${email}`);
      throw new UnauthorizedException('This account uses social login. Please sign in with Google.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.warn(`❌ [AUTH-SERVICE] Password mismatch for user: ${email}`);
      throw new UnauthorizedException('Invalid password');
    }

    console.log(`✅ [AUTH-SERVICE] User validated: ${email}`);
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    const exsistingUser = await this.UserService.findOneByEmail(
      createUserDto.email,
    );
    if (exsistingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const hashedUser = {
      ...createUserDto,
      password: hashedPassword,
    };
    const user = await this.UserRepository.create(hashedUser);
    await this.UserRepository.save(user);
    return user;
  }

  // Simplified login that generates tokens without re-validating password
  // Useful when the user is already validated by a guard (LocalAuthGuard)
  async login(user: any) {
    const { accessToken, refreshToken } = await this.generateAccessToken(
      user.id,
      String(user.role),
    );

    await this.UserRepository.update(user.id, { refreshToken });

    return {
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email, role: user.role },
    };
  }

  // Legacy/Full login (if called directly without guard)
  async loginWithCredentials(email: string, password: string) {
    const validatedUser = await this.validateUser(email, password);
    if (!validatedUser) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return this.login(validatedUser);
  }

  //fint user profile logic
  async getProfile(id: number) {
    const user = await this.UserRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role !== 'teacher') {
      throw new UnauthorizedException('Access restricted to teachers only');
    }

    return {
      user,
    };
  }

  //fint user profile logic
  async getProfileUser(id: number) {
    const user = await this.UserRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role !== 'user') {
      throw new UnauthorizedException('Access restricted to user only');
    }

    return {
      user,
    };
  }

  async refreshToken(id: number) {
    console.log('🔄 [AUTH-SERVICE-REFRESH] Refreshing tokens for user:', id);

    const user = await this.UserRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // ✅ ONLY generate a NEW accessToken - keep the existing refreshToken
    const payload = { sub: user.id, role: String(user.role) };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });

    console.log('✅ [AUTH-SERVICE-REFRESH] New accessToken generated');
    console.log(
      '✅ [AUTH-SERVICE-REFRESH] accessToken:',
      accessToken.substring(0, 30) + '...',
    );
    console.log(
      '✅ [AUTH-SERVICE-REFRESH] Keeping existing refreshToken (no update to DB)',
    );

    // ✅ Return the NEW accessToken with the SAME refreshToken
    return {
      accessToken,
      refreshToken: user.refreshToken, // Keep the existing one
    };
  }

  //That was the main function for generating access and refresh token
  async generateAccessToken(id: number, role: string) {
    const payload = { sub: id, role };

    // ✅ Access token signed with JWT_SECRET (short-lived)
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });

    // ✅ Refresh token signed with REFRESH_JWT_SECRET (long-lived)
    const refreshToken = await this.refreshJwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    console.log('🔑 [TOKEN-GENERATION] Access token created with JWT_SECRET ✓');
    console.log(
      '🔑 [TOKEN-GENERATION] Refresh token created with REFRESH_JWT_SECRET ✓',
    );

    return { accessToken, refreshToken };
  }

  //that using for the access token stratagy
  async validateJwtToken(id: number): Promise<any> {
    const user = await this.UserRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user || null; // ✓ Return null instead
  }

  //that using for the refresh token stratagy
  async validateRefreshToken(userId: number, refreshToken: string) {
    const user = await this.UserService.findOneById(userId);

    if (!user || !user.refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (user.refreshToken !== refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return { id: userId };
  }

  // Clear refresh token from database on logout
  async clearRefreshToken(userId: number) {
    console.log(`🚪 [AUTH-SERVICE] Clearing refresh token for user: ${userId}`);
    await this.UserRepository.update(userId, { refreshToken: null });
  }

  //find user
  async findByEmail(email: string) {
    const user = await this.UserService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const genOTP = await this.generateOtp(user.id);

    return {
      user,
      otp: genOTP,
    };
  }

  //genarate the otp
  async generateOtp(userId: number) {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    console.log(otp);

    await this.UserRepository.update(userId, {
      otp: otp.toString(),
      otpExpiresAt: expiresAt,
    });

    return {
      otp: otp.toString(),
      expiresAt: expiresAt.toISOString(),
    };
  }

  //veryfy the otp
  async verifyOtp(email: string, otp: string | number) {
    const user = await this.UserService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Ensure both are compared as strings in case the JSON sent `otp` as a number
    if (user.otp !== String(otp)) {
      throw new UnauthorizedException('Invalid otp');
    }

    // Safely check if otpExpiresAt exists and parse it
    if (!user.otpExpiresAt) {
      throw new UnauthorizedException('Invalid or expired OTP');
    }

    const expiresAt = new Date(user.otpExpiresAt);
    if (expiresAt < new Date()) {
      throw new UnauthorizedException('Otp expired');
    }

    await this.UserRepository.update(
      { email },
      {
        otpSucess: true,
      },
    );

    return {
      user,
      otp: String(otp),
      otpSucess: true,
    };
  }

  //reset password
  async resetPassword(email: string, newPassword: string) {
    const user = await this.UserService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.otpSucess) {
      throw new UnauthorizedException('Otp not verified');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.UserRepository.update(user.id, {
      password: hashedPassword,
      otp: null,
      otpExpiresAt: null,
      otpSucess: false,
    });

    return { message: 'Password reset successful' };
  }
}
