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
  BadRequestException,
} from '@nestjs/common';
import { response, type Request, type Response } from 'express';
import { AuthService } from './auth.service';
import {
  CreateStudentDto,
  CreateTeacherDto,
  CreateUserDto,
} from 'src/users/dto/create-user.dto';
import { loginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './guard/jwt.auth.guard';
import { LocalAuthGuard } from './guard/local.auth.guard';
import { RefreshAuthGuard } from './guard/refresh.auth.guard';
import { Role } from './enums/roles.enum';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/role/roles.guard';
import { get } from 'http';
import { UsersService } from 'src/users/users.service';
import { patch } from 'axios';

import { GoogleAuthGuard } from './guard/google.auth.guard';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  // --- Google OAuth ---

  @Get('google/student')
  @UseGuards(GoogleAuthGuard)
  async googleAuthStudent(@Req() req) {
    // Redirects to Google (handled by passport)
  }

  @Get('google/teacher')
  @UseGuards(GoogleAuthGuard)
  async googleAuthTeacher(@Req() req) {
    // Redirects to Google (handled by passport)
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(
    @Req() req,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { user } = req;
    const state = req.query.state; // 'state' contains the role (student/teacher)
    const role = (state as Role) || Role.USER;

    console.log(`📡 [GOOGLE-CALLBACK] Role from state: ${role}`);

    const validatedUser = await this.authService.validateGoogleUser(user, role);

    // If teacher is inactive, redirect to a special pending page
    if (validatedUser.role === Role.TEACHER && !validatedUser.isActive) {
      console.log(
        `⏳ [GOOGLE-CALLBACK] Teacher pending approval: ${validatedUser.email}`,
      );
      const frontendUrl =
        process.env.TEACHER_FRONTEND_URL || 'http://localhost:5174';
      return response.redirect(`${frontendUrl}/pending-approval`);
    }

    const result = await this.authService.login(validatedUser);

    // Set cookies
    this.setAuthCookies(response, result);

    const frontendUrl =
      validatedUser.role === Role.TEACHER
        ? process.env.TEACHER_FRONTEND_URL || 'http://localhost:5174'
        : process.env.STUDENT_FRONTEND_URL || 'http://localhost:5173';

    return response.redirect(`${frontendUrl}/teacher/your-courses`);
  }

  private setAuthCookies(response: Response, result: any) {
    response.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 15 * 60 * 1000,
    });

    response.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Res({ passthrough: true }) response: Response) {
    const user = req.user;
    console.log(
      '🔑 [AUTH-LOGIN] Generating tokens for verified user:',
      user.email,
    );

    const result = await this.authService.login(user);

    // ✅ Clear any old cookies first
    response.clearCookie('accessToken');
    response.clearCookie('refreshToken');

    // ✅ Set FRESH cookies
    this.setAuthCookies(response, result);

    console.log('✅ [AUTH-LOGIN] Cookies set for user:', result.user.email);
    return result;
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

  // student signupendpoint

  // teacher signup endpoint
  @Post('signup/teacher')
  async signUpTeacher(@Body() createTeacherDto: CreateTeacherDto) {
    createTeacherDto.role = Role.TEACHER; // Set role to 'teacher' for teacher signup
    const teacher = await this.userService.TeacherSignUp(createTeacherDto);
    return teacher;
  }

  // student signup endpoint
  @Post('signup/student')
  async signUpStudent(@Body() createStudentDto: CreateStudentDto) {
    createStudentDto.role = Role.USER;
    const student = await this.userService.StudentSignUp(createStudentDto);
    return student;
  }

  //login user
  // @UseGuards(LocalAuthGuard)
  // @Post('login/student')
  // async loginStudent(
  //   @Body() loginDto: loginDto,
  //   @Res({ passthrough: true }) response: Response,
  // ) {
  //   console.log('🔑 [AUTH-LOGIN] Logging in user:', loginDto.email);

  //   const result = await this.authService.login(
  //     loginDto.email,
  //     loginDto.password,
  //   );

  //   // ✅ Clear any old cookies first
  //   response.clearCookie('accessToken');
  //   response.clearCookie('refreshToken');
  //   response.clearCookie('refresh_token'); // Clear duplicate
  //   response.clearCookie('accessToken');

  //   // ✅ Set FRESH cookies with consistent names
  //   response.cookie('accessToken', result.accessToken, {
  //     httpOnly: true,
  //     secure: false,
  //     sameSite: 'lax',
  //     path: '/',
  //     maxAge: 60 * 1000, // 60 seconds
  //   });

  //   response.cookie('refreshToken', result.refreshToken, {
  //     httpOnly: true,
  //     secure: false,
  //     sameSite: 'lax',
  //     path: '/',
  //     maxAge: 7 * 24 * 60 * 60 * 1000,
  //   });

  //   console.log('✅ [AUTH-LOGIN] Cookies set for user:', result.user.email);
  //   console.log(
  //     '✅ [AUTH-LOGIN] accessToken set:',
  //     result.accessToken.substring(0, 30) + '...',
  //   );
  //   console.log(
  //     '✅ [AUTH-LOGIN] refreshToken set:',
  //     result.refreshToken.substring(0, 30) + '...',
  //   );

  //   // Now standard 'return' works again!
  //   return result;
  // }

  //I need to make the user delete endpoint
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER, Role.TEACHER)
  @Patch('users/:id')
  async deleteUser(@Param('id') id: number) {
    return await this.userService.update(id, { isActive: false }); // Soft delete by setting isActive to false
  }

  //I need add editprofile endpoint
  @UseGuards(JwtAuthGuard)
  @Patch('users/edit/:id')
  //getall  users // testing /port
  @Get('users')
  async getAllUsers() {
    const users = await this.userService.findAll();
    return users;
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TEACHER)
  @Get('profile/teacher')
  async getProfile(@Req() req) {
    const user = req.user;
    console.log('profile controller', user);
    const profile = await this.authService.getProfile(user.id);
    // This is just a placeholder. You would typically extract the user ID from the JWT token and fetch the user profile.
    return profile;
  }

  //get user profile endpoint
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER)
  @Get('profile/user')
  async getProfileUser(@Req() req) {
    const user = req.user;
    console.log('profile controller', user);
    const profile = await this.authService.getProfileUser(user.id);
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
    res.clearCookie('accessToken', { path: '/' });
    res.clearCookie('refreshToken', { path: '/' });
    res.status(200).json({ message: 'Logout successful' });
  }

  //I need testing route for the acess Token remove on cookiees
  @UseGuards(JwtAuthGuard)
  @Get('test')
  async test(@Req() req, @Res() res: Response) {
    res.clearCookie('accessToken', { path: '/' });
    res.status(HttpStatus.OK).json({ message: 'Access token cleared' });
  }

  //virify email endpoint
  @Post('verify-email')
  async verifyEmail(@Body() body: { email: string }) {
    if (!body || !body.email) {
      throw new BadRequestException('Email is required');
    }
    const user = await this.authService.findByEmail(body.email);
    return user;
  }

  //verify the otp
  @Post('verify-otp')
  async verifyOtp(@Body() body: { email: string; otp: string }) {
    if (!body || !body.email || !body.otp) {
      throw new BadRequestException('Email and OTP are required');
    }
    const user = await this.authService.verifyOtp(body.email, body.otp);
    return user;
  }

  // create the endpoint in the make the new password
  @Post('reset-password')
  async resetPassword(@Body() body: { email: string; password: string }) {
    if (!body || !body.email || !body.password) {
      throw new BadRequestException('Email and password are required');
    }
    const user = await this.authService.resetPassword(
      body.email,
      body.password,
    );
    return user;
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  async refreshToken(@Req() req, @Res() res: Response) {
    console.log('🔄 [AUTH-REFRESH] Refreshing tokens for user:', req.user?.id);

    const user = await this.authService.refreshToken(req.user.id);

    console.log('✅ [AUTH-REFRESH] New tokens generated');
    console.log(
      '✅ [AUTH-REFRESH] accessToken:',
      user.accessToken.substring(0, 30) + '...',
    );
    console.log('✅ [AUTH-REFRESH] refreshToken: (kept as is)');

    // ✅ Only clear and set accessToken
    res.clearCookie('accessToken');

    // ✅ Set new accessToken cookie (15 mins)
    res.cookie('accessToken', user.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    // ✅ NO NEED to update refreshToken cookie - it's still valid!
    // The browser already has it, and we didn't regenerate it

    console.log('✅ [AUTH-REFRESH] Response sent');

    return res.status(HttpStatus.OK).json({
      message: 'Token refreshed',
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
      result: {
        id: req.user.id,
        email: req.user.email,
        role: req.user.role, // ✅ Crucial for API Gateway role mapping
      },
    });
  }

  // Admin: Get all teachers
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('admin/teachers')
  async getTeachers() {
    return await this.userService.findAllTeachers();
  }

  // Admin: Verify a teacher (set isActive to true/false)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch('admin/teachers/verify/:id')
  async verifyTeacher(
    @Param('id') id: number,
    @Body() body: { isActive: boolean },
  ) {
    return await this.userService.update(id, { isActive: body.isActive });
  }

  // Admin: Get all users
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('admin/users')
  async getUsers() {
    return await this.userService.findAll();
  }

  // Admin: Toggle any user's active status
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch('admin/users/status/:id')
  async updateUserStatus(
    @Param('id') id: number,
    @Body() body: { isActive: boolean },
  ) {
    return await this.userService.update(id, { isActive: body.isActive });
  }
}
