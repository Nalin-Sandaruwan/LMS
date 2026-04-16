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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
    private readonly UserService: UsersService,
    private readonly jwtService: JwtService,
    @Inject('REFRESH_JWT_SERVICE') private readonly refreshJwtService: any, // ✅ Inject custom refresh JWT service
  ) {}

  //that mainly for local strategy
  async validateUser(email: string, password: string) {
    const user = await this.UserService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Compare plain text password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

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

  async login(email: string, password: string) {
    const user = await this.UserService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new NotFoundException('Invalid credentials');
    }

    const { accessToken, refreshToken } = await this.generateAccessToken(
      user.id,
      String(user.role), // ✓ Converts to string
    );
    await this.UserRepository.update(user.id, { refreshToken });
    // Attach user to request for later use

    return {
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email, role: user.role },
    };
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

    // Safely parse the database date string into a Date object just in case it returns as a string
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
      otp: null as any,
      otpExpiresAt: null as any,
      otpSucess: false,
    });

    return { message: 'Password reset successful' };
  }
}
