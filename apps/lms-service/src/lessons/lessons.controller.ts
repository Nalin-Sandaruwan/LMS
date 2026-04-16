import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { BunnyStreamService } from './bunny-stream.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/roles.enum';

@Controller('lessons')
export class LessonsController {
  private readonly logger = new Logger(LessonsController.name);
  constructor(
    private readonly lessonsService: LessonsService,
    private readonly bunnyStreamService: BunnyStreamService,
  ) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.TEACHER)
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }

  @Post('upload-session')
  @UseGuards(RolesGuard)
  @Roles(Role.TEACHER)
  async createUploadSession(
    @Body('title') title: string,
    @Body('sectionId') sectionId: number,
  ) {
    return this.lessonsService.prepareUpload(title, sectionId);
  }

  @Post(':id/replace-video')
  @UseGuards(RolesGuard)
  @Roles(Role.TEACHER)
  async replaceVideo(@Param('id') id: string) {
    return this.lessonsService.prepareReplaceVideo(+id);
  }

  // ⚠️ No auth guard — this endpoint is called by Bunny.net's servers, not the teacher client
  @Post('bunny-webhook')
  async handleBunnyWebhook(@Body() body: any) {
    this.logger.log(`Received Bunny Webhook: ${JSON.stringify(body)}`);
    // Bunny.net Stream Status Codes:
    // 0: Queued, 1: Processing, 2: Encoding, 3: Finished, 4: Resolution Finished, 5: Failed
    const { VideoGuid, Status } = body;

    let statusText = 'processing';
    if (Status === 0) statusText = 'queued';
    if (Status === 3 || Status === 4) statusText = 'finished';
    if (Status === 5) statusText = 'failed';

    const lesson = await this.lessonsService.findByBunnyVideoId(VideoGuid);
    if (!lesson) {
      this.logger.warn(`Lesson with bunnyVideoId ${VideoGuid} not found`);
      return { success: false, message: 'Lesson not found' };
    }

    const updateData: Partial<CreateLessonDto> = {
      bunnyStatus: statusText,
    };

    if (statusText === 'finished') {
      const libraryId = process.env.BUNNY_STREAM_LIBRARY_ID;
      updateData.fileUrl = `https://iframe.mediadelivery.net/embed/${libraryId}/${VideoGuid}`;
      updateData.status = 'published';
    }

    await this.lessonsService.update(lesson.id, updateData as UpdateLessonDto);
    this.logger.log(`Updated lesson ${lesson.id} status to ${statusText}`);

    return { success: true };
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.TEACHER)
  findAll() {
    return this.lessonsService.findAll();
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.TEACHER)
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.TEACHER)
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(+id, updateLessonDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.TEACHER)
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(+id);
  }
}
