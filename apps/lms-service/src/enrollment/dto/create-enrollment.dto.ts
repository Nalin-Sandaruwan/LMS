import { IsEnum, IsNumber, IsOptional, Min, Max } from 'class-validator';
import { EnrollmentStatus } from '../enums/enrollment-status.enum';

export class CreateEnrollmentDto {
  @IsNumber()
  @IsOptional()
  userId: number;

  @IsNumber()
  // @IsOptional()
  classId: number;

  @IsEnum(EnrollmentStatus)
  @IsOptional()
  status?: EnrollmentStatus;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  progressCalculation?: number;
}
