import { PartialType } from '@nestjs/mapped-types';
import { CreateEnrollmentDto } from './create-enrollment.dto';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateEnrollmentDto extends PartialType(CreateEnrollmentDto) {
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  completedLessons?: string[];
}
