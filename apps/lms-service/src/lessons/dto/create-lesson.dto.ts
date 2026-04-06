import { IsString, IsNotEmpty, IsEnum, IsOptional, IsNumber } from 'class-validator';

export class CreateLessonDto {
    @IsNumber()
    @IsNotEmpty()
    sectionId: number;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsEnum(['video', 'audio', 'pdf', 'doc', 'text'])
    @IsNotEmpty()
    type: 'video' | 'audio' | 'pdf' | 'doc' | 'text';

    @IsString()
    @IsOptional()
    fileUrl?: string;
}

