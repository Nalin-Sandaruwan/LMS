import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateLessonDto {
  @IsNumber()
  @IsNotEmpty()
  sectionId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(['video', 'audio', 'pdf', 'doc', 'text', 'article', 'quiz'])
  @IsNotEmpty()
  type: 'video' | 'audio' | 'pdf' | 'doc' | 'text' | 'article' | 'quiz';

  @IsString()
  @IsOptional()
  fileUrl?: string;

  @IsString()
  @IsOptional()
  bunnyVideoId?: string;

  @IsString()
  @IsOptional()
  bunnyStatus?: string;

  @IsEnum(['published', 'draft'])
  @IsOptional()
  status?: string;
}
