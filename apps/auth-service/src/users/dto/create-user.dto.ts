import { Role } from 'src/auth/enums/roles.enum';

export class CreateUserDto {
	email: string;
	password: string;
	refreshToken?: string;
	role?: Role;
	isActive: boolean;
}

export class CreateTeacherDto {
  fullName: string;
  email: string;
  password: string;
  mobileNumber: string;
  teachingExpert: string;
  shortBio: string;
  refreshToken?: string;
  role?: Role;
  isActive: boolean;
  socialLinks: string;
  profilePicture?: string;
}

export class CreateStudentDto {
  fullName: string
  email: string;
  password: string;
  mobileNumber: string;
  refreshToken?: string;
  role?: Role;
  isActive: boolean; 
}
