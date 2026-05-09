import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';
import { Section } from '../section/entities/section.entity';
import { BunnyStreamService } from './bunny-stream.service';
import { CourseService } from '../course/course.service';

@Injectable()
export class LessonsService {
  private readonly logger = new Logger(LessonsService.name);

  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
    private readonly bunnyStreamService: BunnyStreamService,
    private readonly courseService: CourseService,
  ) {}

  async create(createLessonDto: CreateLessonDto) {
    const lesson = this.lessonRepository.create(createLessonDto);
    return await this.lessonRepository.save(lesson);
  }

  async prepareUpload(title: string, sectionId: number) {
    const section = await this.sectionRepository.findOne({
      where: { id: sectionId },
      relations: ['course'],
    });

    if (!section) {
      throw new NotFoundException(`Section with ID ${sectionId} not found`);
    }

    // Get or create a specific collection for this course on Bunny.net
    const collectionId = await this.courseService.getOrCreateBunnyCollection(
      section.courseId,
    );

    // Create the video within that collection
    const videoId = await this.bunnyStreamService.createVideo(
      title,
      collectionId,
    );

    return this.bunnyStreamService.getUploadSignature(videoId);
  }

  async prepareReplaceVideo(id: number) {
    const lesson = await this.findOne(id);

    const section = await this.sectionRepository.findOne({
      where: { id: lesson.sectionId },
      relations: ['course'],
    });

    if (!section) {
      throw new NotFoundException(`Section for lesson ${id} not found`);
    }

    // ✅ Delete the OLD video from Bunny.net first to avoid orphaned storage
    // Non-blocking: if deletion fails we log a warning but continue the replace flow
    if (lesson.bunnyVideoId) {
      this.logger.log(
        `Deleting old Bunny video ${lesson.bunnyVideoId} for lesson ${id}...`,
      );
      await this.bunnyStreamService.deleteVideo(lesson.bunnyVideoId);
    }

    // Create a NEW empty video slot on Bunny.net
    const collectionId = await this.courseService.getOrCreateBunnyCollection(
      section.courseId,
    );
    const newVideoId = await this.bunnyStreamService.createVideo(
      lesson.title,
      collectionId,
    );

    // Update the lesson to point to the new video and reset status
    await this.lessonRepository.update(id, {
      bunnyVideoId: newVideoId,
      bunnyStatus: 'queued',
      status: 'draft',
      fileUrl: '', // Clear old video URL — will be set again after webhook fires
    });

    this.logger.log(
      `Prepared video replacement for lesson ${id}. New Bunny Video ID: ${newVideoId}`,
    );

    // Return upload credentials — the CLIENT must now upload the video file via TUS
    return this.bunnyStreamService.getUploadSignature(newVideoId);
  }

  async findAll() {
    return await this.lessonRepository.find({ relations: ['section'] });
  }

  async findOne(id: number) {
    const lesson = await this.lessonRepository.findOne({
      where: { id },
      relations: ['section'],
    });
    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }
    return lesson;
  }

  async update(id: number, updateLessonDto: UpdateLessonDto) {
    const lesson = await this.findOne(id);

    // If title is changing and there's a Bunny video, update Bunny metadata in parallel
    if (
      updateLessonDto.title &&
      updateLessonDto.title !== lesson.title &&
      lesson.bunnyVideoId
    ) {
      this.logger.log(
        `Title change detected for lesson ${id}. Parallel renaming Bunny video...`,
      );

      this.bunnyStreamService
        .updateVideo(lesson.bunnyVideoId, updateLessonDto.title)
        .then(() =>
          this.logger.log(`Bunny video for lesson ${id} renamed successfully.`),
        )
        .catch((err) =>
          this.logger.error(
            `Failed to rename Bunny video for lesson ${id}: ${err.message}`,
          ),
        );
    }

    await this.lessonRepository.update(id, updateLessonDto);
    return this.findOne(id);
  }

  async findByBunnyVideoId(bunnyVideoId: string) {
    return await this.lessonRepository.findOne({ where: { bunnyVideoId } });
  }

  async remove(id: number) {
    const lesson = await this.findOne(id);

    // ✅ Automatically delete the video from Bunny.net if it exists
    if (lesson.bunnyVideoId) {
      this.logger.log(
        `Deleting associated Bunny.net video ${lesson.bunnyVideoId} for lesson ${id}...`,
      );
      // We call this without awaiting if we want to speed up the response,
      // but awaiting is safer to ensure we don't have orphaned storage.
      await this.bunnyStreamService.deleteVideo(lesson.bunnyVideoId);
    }

    return await this.lessonRepository.remove(lesson);
  }
}
