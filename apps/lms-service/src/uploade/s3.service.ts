// upload/s3.service.ts
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private s3: S3Client;
  private bucket: string;

  constructor(private configService: ConfigService) {
    const region = this.configService.get<string>('AWS_REGION');
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY');
    this.bucket = this.configService.get<string>('AWS_S3_BUCKET') ?? '';

    if (!region || !accessKeyId || !secretAccessKey || !this.bucket) {
      throw new Error('AWS configuration is missing in environment variables');
    }

    this.s3 = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  // File upload (thumbnail / document)
  async uploadFile(
    file: Express.Multer.File,
    folder: string, // 'thumbnails' | 'lessons' | 'pdfs'
  ): Promise<string> {
    const key = `${folder}/${Date.now()}-${file.originalname}`;

    await this.s3.send(new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    }));

    // CloudFront URL return කරන්නෙ production එකේ
    const cloudFrontDomain = this.configService.get('CLOUDFRONT_DOMAIN');
    return cloudFrontDomain
      ? `https://${cloudFrontDomain}/${key}`
      : `https://${this.bucket}.s3.amazonaws.com/${key}`;
  }

  // Video upload (large files - streaming)
  async uploadVideo(
    file: Express.Multer.File,
    lessonId: number,
  ): Promise<string> {
    const key = `videos/lesson-${lessonId}/${Date.now()}-${file.originalname}`;

    await this.s3.send(new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype, // 'video/mp4'
      // Video content type set කරන එක ඉතා වැදගත්
      Metadata: {
        lessonId: String(lessonId),
      },
    }));

    return key; // Key save කරන්නෙ DB වල
  }

  // Delete file
  async deleteFile(key: string): Promise<void> {
    await this.s3.send(new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key,
    }));
  }
}