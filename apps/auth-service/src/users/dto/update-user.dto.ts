import { PartialType } from '@nestjs/mapped-types';
import { CreateTeacherDto, CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateTeacherDto extends PartialType(CreateTeacherDto) {}
