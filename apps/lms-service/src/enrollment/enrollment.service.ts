import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { EnrollmentStatus } from './enums/enrollment-status.enum';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,
  ) {}

  async create(createEnrollmentDto: CreateEnrollmentDto) {
    const existingEnrollment = await this.enrollmentRepository.findOne({
      where: {
        userId: createEnrollmentDto.userId,
        classId: createEnrollmentDto.classId,
      },
    });

    if (existingEnrollment) {
      throw new BadRequestException('You are already enrolled in this course');
    }

    try {
      const enrollment = this.enrollmentRepository.create(createEnrollmentDto);
      return await this.enrollmentRepository.save(enrollment);
    } catch (error: any) {
      if (error?.code === '23503') {
        throw new BadRequestException(
          'Cannot create enrollment: The specified student or course does not exist.',
        );
      }
      throw error;
    }
  }

  async findAll() {
    return await this.enrollmentRepository.find({
      relations: ['student', 'course'],
    });
  }

  async findAllByUserId(userId: number) {
    return await this.enrollmentRepository.find({
      where: { userId },
      relations: [
        'student',
        'course',
        'course.sections',
        'course.sections.lessons',
        'course.teacher',
      ],
    });
  }

  async findOne(id: number) {
    const enrollment = await this.enrollmentRepository.findOne({
      where: { id },
      relations: [
        'student',
        'course',
        'course.sections',
        'course.sections.lessons',
        'course.teacher',
      ],
    });
    if (!enrollment) {
      throw new NotFoundException(`Enrollment with ID ${id} not found`);
    }
    return enrollment;
  }

  async update(id: number, updateEnrollmentDto: UpdateEnrollmentDto) {
    const enrollment = await this.findOne(id);

    if (updateEnrollmentDto.completedLessons) {
      // Calculate progress
      const totalLessons = enrollment.course.sections.reduce(
        (acc, sec) => acc + (sec.lessons?.length || 0),
        0,
      );

      if (totalLessons > 0) {
        const completedCount = updateEnrollmentDto.completedLessons.length;
        updateEnrollmentDto.progressCalculation = Math.round(
          (completedCount / totalLessons) * 100,
        );
      }
    }

    // Auto-update status based on progressCalculation (calculated above or provided directly)
    if (updateEnrollmentDto.progressCalculation !== undefined) {
      if (updateEnrollmentDto.progressCalculation >= 100) {
        updateEnrollmentDto.status = EnrollmentStatus.COMPLETED;
      } else if (updateEnrollmentDto.progressCalculation > 0) {
        updateEnrollmentDto.status = EnrollmentStatus.IN_PROGRESS;
      }
    }

    await this.enrollmentRepository.update(id, updateEnrollmentDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const enrollment = await this.findOne(id);
    if (!enrollment) {
      throw new NotFoundException(`Enrollment with ID ${id} not found`);
    }
    await this.enrollmentRepository.remove(enrollment);
    return { message: `Enrollment with ID ${id} removed successfully` };
  }
}
