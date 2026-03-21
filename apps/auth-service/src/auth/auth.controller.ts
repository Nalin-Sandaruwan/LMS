import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { response, type Request, type Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { loginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './guard/jwt.auth.guard';
import { LocalAuthGuard } from './guard/local.auth.guard';
import { RefreshAuthGuard } from './guard/refresh.auth.guard';
import { Role } from './enums/roles.enum';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/role/roles.guard';
import { get } from 'http';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: loginDto, @Res() response: Response) {
    console.log("🔑 [AUTH-LOGIN] Logging in user:", loginDto.email);

    const result = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );

    // ✅ Clear any old cookies first
    response.clearCookie('accessToken');
    response.clearCookie('refreshToken');
    response.clearCookie('refresh_token'); // Clear duplicate
    response.clearCookie('accessToken');

    // ✅ Set FRESH cookies with consistent names
    response.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 1000, // 60 seconds
    });

    response.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log("✅ [AUTH-LOGIN] Cookies set for user:", result.user.email);
    console.log("✅ [AUTH-LOGIN] accessToken set:", result.accessToken.substring(0, 30) + "...");
    console.log("✅ [AUTH-LOGIN] refreshToken set:", result.refreshToken.substring(0, 30) + "...");

    return response.status(HttpStatus.OK).json({
      message: 'Login successful',
      user: result.user,
    });
  }

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.signUp(createUserDto);
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
  //virefy the user endpoint
  @UseGuards(JwtAuthGuard)
  @Get('verify')
  async verifyUser(@Req() req) {
    const result = await this.authService.validateJwtToken(req.user.id);
    return {
      result,
    };
  }

  // <-- Add this guard to protect the route
  @UseGuards( JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.TEACHER)
  @Get('profile')
  async getProfile(@Req() req) {
    const user = req.user;
    console.log('profile controller', user);
    const profile = await this.authService.getProfile(user.id);
    // This is just a placeholder. You would typically extract the user ID from the JWT token and fetch the user profile.
    return profile;
  }

  //logout endpoint
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req, @Res() res: Response) {
    const userId = req.user.id;
    await this.authService.validateRefreshToken(
      userId,
      req.cookies.refreshToken,
    ); // Invalidate refresh token
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(HttpStatus.OK).json({ message: 'Logout successful' });
  }

  //I need testing route for the acess Token remove on cookiees
  @UseGuards(JwtAuthGuard)
  @Get('test')
  async test(@Req() req, @Res() res: Response) {
    res.clearCookie('accessToken');
    res.status(HttpStatus.OK).json({ message: 'Access token cleared' });
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  async refreshToken(@Req() req, @Res() res: Response) {
    console.log("🔄 [AUTH-REFRESH] Refreshing tokens for user:", req.user?.id);

    const user = await this.authService.refreshToken(req.user.id);

    console.log("✅ [AUTH-REFRESH] New tokens generated");
    console.log("✅ [AUTH-REFRESH] accessToken:", user.accessToken.substring(0, 30) + "...");
    console.log("✅ [AUTH-REFRESH] refreshToken:", user.refreshToken.substring(0, 30) + "...");

    // ✅ Clear old cookies
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.clearCookie('refresh_token');

    // ✅ Set new cookies
    res.cookie('accessToken', user.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      sameSite: 'lax', // Adjust based on your requirements
      path: '/',
      maxAge: 60 * 1000, // 60 seconds
    });

    res.cookie('refreshToken', user.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      sameSite: 'lax', // Adjust based on your requirements
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.cookie('refreshed_at', new Date().toISOString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      sameSite: 'lax', // Adjust based on your requirements
      path: '/',
    });

    // ✅ Return 200 OK
    return res.status(200).json({
      message: 'Token refreshed successfully',
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
    });
  }
}
 