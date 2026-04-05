import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStudentDto {
    @IsNumber()
    id: number;

    @IsString()
    fullName: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    mobileNumber: string;
}