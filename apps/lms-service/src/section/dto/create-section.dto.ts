import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateSectionDto {
    @IsNotEmpty()
    @IsNumber()
    courseId: number;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    duration: number;
}
