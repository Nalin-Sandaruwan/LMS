import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto, CreateTeacherDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { catchError, firstValueFrom, of } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Role } from '../auth/enums/roles.enum';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  // inject the user repository to interact with the database
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly httpService: HttpService,
  ) {}

  // that implimented find by the email to validate the user in the local strategy
  // logic to find user by email
  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      this.logger.warn(`User with email ${email} not found`);
      // throw new NotFoundException(`User with email ${email} not found`);
      return null; // Return null instead of throwing an exception
    }
    return user;
  }

  //find by Id
  async findOneById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      this.logger.warn(`User with ID ${id} not found`);
      return null;
    }
    return user;
  }

  //find by email
  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      this.logger.warn(`User with email ${email} not found`);
      return null;
    }
    return user;
  }

  //find all
  async findAll() {
    return await this.userRepository.find();
  }

  // find all teachers
  async findAllTeachers() {
    return await this.userRepository.find({
      where: { role: 'teacher' as any },
    });
  }

  // create new teacher
  async TeacherSignUp(teacherUser: CreateTeacherDto) {
    const existingUser = await this.findOneByEmail(teacherUser.email);

    // Check if a user with the same email already exists
    if (existingUser) {
      this.logger.warn(`User with email ${teacherUser.email} already exists`);
      throw new BadRequestException(
        `User with email ${teacherUser.email} already exists`,
      );
    }

    //auth server Create the new user role as teacher and save it to the database
    const hashedPassword = await bcrypt.hash(teacherUser.password, 10);
    const teacher = this.userRepository.create({
      ...teacherUser,
      password: hashedPassword,
    });
    console.log(teacherUser);
    const savedTeacher = await this.userRepository.save(teacher);

    // Call another server (LMS Service) using HttpService
    try {
      const lmsResponse = await firstValueFrom(
        this.httpService
          .post(`${process.env.LMS_SERVICE_URL}/teacher/create`, {
            id: savedTeacher.id,
            fullName: teacherUser.fullName,
            email: teacherUser.email,
            mobileNumber: teacherUser.mobileNumber,
            teachingExpert: teacherUser.teachingExpert,
            shortBio: teacherUser.shortBio,
            socialLinks: teacherUser.socialLinks,
            profilePicture: teacherUser.profilePicture,
          })
          .pipe(
            catchError((error) => {
              this.logger.error(`Failed to call LMS Service: ${error.message}`);
              // If the LMS side fails, you might want to throw an error
              // so the user creation doesn't proceed without sync
              throw new BadRequestException(
                'LMS Service synchronization failed',
              );
            }),
          ),
      );
      this.logger.log(
        `LMS Service response: ${JSON.stringify(lmsResponse.data)}`,
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      this.logger.error(`Error during LMS Service sync: ${errorMessage}`);
      // Depending on requirements, you might want to rollback the user creation or just log it
    }

    // After save the teache into the LMS database
    return savedTeacher;
  }

  // create new student
  async StudentSignUp(studentUser: CreateStudentDto) {
    const existingUser = await this.findOneByEmail(studentUser.email);
    if (existingUser) {
      this.logger.warn(`User with email ${studentUser.email} already exists`);
      throw new BadRequestException(
        `User with email ${studentUser.email} already exists`,
      );
    }

    //auth server Create the new user role as teacher and save it to the database
    const hashedPassword = await bcrypt.hash(studentUser.password, 10);
    const student = this.userRepository.create({
      ...studentUser,
      password: hashedPassword,
      isActive: true, // Students are active by default
    });
    console.log(studentUser);
    const savedStudent = await this.userRepository.save(student);

    // Call another server (LMS Service) using HttpService
    try {
      const lmsResponse = await firstValueFrom(
        this.httpService
          .post(`${process.env.LMS_SERVICE_URL}/student/create`, {
            id: savedStudent.id,
            fullName: studentUser.fullName,
            email: studentUser.email,
            mobileNumber: studentUser.mobileNumber,
          })
          .pipe(
            catchError((error) => {
              this.logger.error(`Failed to call LMS Service: ${error.message}`);
              // If the LMS side fails, you might want to throw an error
              // so the user creation doesn't proceed without sync
              throw new BadRequestException(
                'LMS Service synchronization failed',
              );
            }),
          ),
      );
      this.logger.log(
        `LMS Service response: ${JSON.stringify(lmsResponse.data)}`,
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      this.logger.error(`Error during LMS Service sync: ${errorMessage}`);
      // Depending on requirements, you might want to rollback the user creation or just log it
    }
    return savedStudent;
  }

  // Generic sync method for social logins
  async syncUserWithLMS(user: User, fullName: string) {
    const endpoint =
      user.role === Role.TEACHER ? 'teacher/create' : 'student/create';
    const payload: any = {
      id: user.id,
      fullName: fullName || user.email.split('@')[0], // Fallback if name is missing
      email: user.email,
      mobileNumber: '',
    };

    if (user.role === Role.TEACHER) {
      payload.teachingExpert = 'General';
      payload.shortBio = 'Teacher joined via Google';
    }

    console.log(
      `📡 [AUTH-SERVICE] Syncing user with LMS... Payload:`,
      JSON.stringify(payload),
    );

    try {
      await firstValueFrom(
        this.httpService
          .post(`${process.env.LMS_SERVICE_URL}/${endpoint}`, payload)
          .pipe(
            catchError((error) => {
              const errorMsg = error.response?.data?.message || error.message;
              this.logger.error(
                `Failed to call LMS Service for sync: ${errorMsg}`,
              );
              // Return a dummy object so firstValueFrom doesn't throw EmptyError
              return of({ success: false, error: errorMsg });
            }),
          ),
      );
      this.logger.log(
        `✅ [USERS-SERVICE] Synced user ${user.id} with LMS Service`,
      );
    } catch (err) {
      this.logger.error(`Error during LMS Service sync: ${err}`);
    }
  }

  // restrict user(Like Remove)
  async updateRestricted(id: number) {
    return await this.userRepository.update(id, { isActive: false });
  }

  // update user
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      this.logger.warn(`User with ID ${id} not found for update`);
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Update only allowed fields (e.g., fullName, mobileNumber, etc.)
    // Assuming UpdateUserDto has optional fields for updating

    return await this.userRepository.update(id, { ...updateUserDto });
  }

  // remove the User
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
