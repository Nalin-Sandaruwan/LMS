import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTeacherDto {
    @IsNumber()
    id: number;

    @IsString()
    fullName: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    mobileNumber: string;

    @IsString()
    @IsOptional()
    teachingExpert: string;

    @IsString()
    @IsOptional()
    shortBio: string;

    @IsString()
    @IsOptional()
    socialLinks: string;

    @IsString()
    @IsOptional()
    profilePicture?: string;
}





