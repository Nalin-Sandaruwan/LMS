import { Role } from 'src/auth/enums/roles.enum';

export class CreateUserDto {
	email: string;
	password: string;
	refreshToken?: string;
	role?: Role;
	isActive: boolean;
}
