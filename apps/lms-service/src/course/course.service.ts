import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Teacher } from '../teacher/entities/teacher.entity';
import { BunnyStreamService } from '../lessons/bunny-stream.service';

@Injectable()
export class CourseService {
  private readonly logger = new Logger(CourseService.name);

  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    private readonly bunnyStreamService: BunnyStreamService,
  ) {}

  //create the courses
  async create(createCourseDto: CreateCourseDto) {
    if (!createCourseDto.teacherId) {
      throw new Error('Teacher ID is required to create a course');
    }

    // Ensure the teacher exists to prevent Foreign Key constraints
    let teacher = await this.teacherRepository.findOneBy({
      id: createCourseDto.teacherId,
    });
    if (!teacher) {
      // Auto-create a stub teacher record so the course can be connected
      teacher = this.teacherRepository.create({
        id: createCourseDto.teacherId,
        fullName: `Teacher ${createCourseDto.teacherId}`,
        email: `teacher${createCourseDto.teacherId}@platform.local`,
        mobileNumber: 'N/A',
        teachingExpert: 'General',
        shortBio: 'Auto-generated stub profile.',
      });
      await this.teacherRepository.save(teacher);
    }

    const course = this.courseRepository.create(createCourseDto);
    const savedCourse = await this.courseRepository.save(course);
    return savedCourse;
  }

  //find all without lessons getting Mostly public
  //find all without lessons getting Mostly public
  async findAllWithoutLessons() {
    const courses = await this.courseRepository.find({
      where: { isActive: true },
      relations: ['teacher', 'sections'],
    });

    // Manually strip lessons and sensitive data to ensure absolute optimization
    return courses.map((course) => ({
      id: course.id,
      title: course.title,
      thumbnail: course.thumbnail,
      lessonCount: course.lessonCount,
      isActive: course.isActive,
      description: course.description
        ? course.description.substring(0, 160) + '...'
        : '',
      createdAt: course.createdAt,
      teacher: course.teacher
        ? {
            id: course.teacher.id,
            fullName: course.teacher.fullName,
            profilePicture: course.teacher.profilePicture,
          }
        : null,
      sections: course.sections?.map((s) => ({
        id: s.id,
        title: s.title,
        duration: s.duration,
      })),
    }));
  }

  // Find a specific course without heavy relations
  async findOneWithoutVideo(id: number) {
    return await this.courseRepository.findOne({
      where: { id },
      relations: ['teacher', 'sections'],
    });
  }

  //Teacher Creaated cources showcase
  async findAllTeacherCreated(teacherId: number) {
    const courses = await this.courseRepository.find({
      where: { teacherId },
      relations: ['teacher', 'sections', 'sections.lessons'],
    });

    if (!courses || courses.length === 0) {
      return {
        message: 'No courses found for this teacher',
      };
    }
    return courses;
  }

  // finde one by id
  async findOne(id: number) {
    return await this.courseRepository.findOne({
      where: { id },
      relations: ['teacher', 'sections', 'sections.lessons'],
    });
  }

  // update the course
  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const course = await this.findOne(id);
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    // Apply updates to the database
    await this.courseRepository.update(id, updateCourseDto);

    // If title has changed and a Bunny collection exists, rename it asynchronously
    if (
      updateCourseDto.title &&
      updateCourseDto.title !== course.title &&
      course.bunnyCollectionId
    ) {
      this.bunnyStreamService
        .updateCollection(course.bunnyCollectionId, updateCourseDto.title)
        .catch((err) => {
          this.logger.error(
            `Failed to rename Bunny collection for course ${id}: ${err.message}`,
          );
        });
    }

    return this.findOne(id);
  }

  // remove the course
  async remove(id: number) {
    const course = await this.findOne(id);
    if (course) {
      // ✅ Automatically delete the Bunny.net collection if it exists
      if (course.bunnyCollectionId) {
        this.logger.log(
          `Deleting Bunny.net collection ${course.bunnyCollectionId} for course ${id}...`,
        );
        await this.bunnyStreamService.deleteCollection(
          course.bunnyCollectionId,
        );
      }

      // Use a transaction to ensure complete cleanup and prevent orphans
      await this.courseRepository.manager.transaction(
        async (transactionalEntityManager) => {
          if (course.sections && course.sections.length > 0) {
            // 1. Remove all lessons from all sections
            for (const section of course.sections) {
              if (section.lessons && section.lessons.length > 0) {
                await transactionalEntityManager.remove(section.lessons);
              }
            }
            // 2. Remove all sections
            await transactionalEntityManager.remove(course.sections);
          }

          // 3. Remove the course itself
          await transactionalEntityManager.remove(course);
        },
      );
      return course;
    }
    return null;
  }

  // --- Bunny.net Integration ---

  async getOrCreateBunnyCollection(courseId: number): Promise<string> {
    const course = await this.findOne(courseId);
    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    if (course.bunnyCollectionId) {
      return course.bunnyCollectionId;
    }

    this.logger.log(
      `Creating Bunny.net collection for course: ${course.title}`,
    );
    const collectionId = await this.bunnyStreamService.createCollection(
      course.title,
    );

    await this.courseRepository.update(courseId, {
      bunnyCollectionId: collectionId,
    });
    this.logger.log(
      `Registered Bunny collection ${collectionId} for course ${courseId}`,
    );

    return collectionId;
  }
}
