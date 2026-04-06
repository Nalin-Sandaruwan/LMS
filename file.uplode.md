## Plan: S3 Global Upload Architecture (Thumbnails & 1GB+ Videos)

**TL;DR** 
Use **Direct Backend Upload** for small thumbnails (< 5MB) and **S3 Pre-signed URLs** for massive video files (1GB+). Pushing 1GB through your API Gateway and NestJS memory buffers will crash your server and timeout the request. Instead, the frontend will ask the backend for a secure, temporary direct-to-S3 ticket (pre-signed URL) and automatically stream the 1GB video directly to AWS, bypassing your servers completely.

**Steps**

**Phase 1: Small File Uploads (Thumbnails - Proxy Strategy)**
1. **LMS Backend:** Extract `Express.Multer.File` in `uploade.controller.ts`, pass to `S3Service.uploadFile()`, and return the CDN URL.
2. **Frontend:** Use `FormData` to `POST` the image buffer through the API Gateway during the "Create Course" form submission.

**Phase 2: 1GB+ Video Uploads (Pre-signed URL Strategy)**
1. **LMS Backend (`S3Service`):** Implement `getPresignedVideoUploadUrl(fileName: string, contentType: string)` using the `@aws-sdk/s3-request-presigner` (which is already imported in your file).
   - This creates an encrypted, expiring URL allowing an unauthenticated frontend to `PUT` immediately to your private bucket. 
   - Create a corresponding GET endpoint in `uploade.controller.ts`.
2. **Frontend Video Uploader:**
   - **Step A:** User selects a 1GB `.mp4`.
   - **Step B:** Frontend calls the backend: `GET /api/upload/presigned-url?fileName=lesson-1.mp4`.
   - **Step C:** Backend returns `{ url: "https://your-bucket.s3...&signature=...", fileKey: "videos/..." }`.
   - **Step D:** Frontend uses `axios.put(url, file, { onUploadProgress })` to send the 1GB file *directly* to AWS S3. This provides native progress bars natively out-of-the-box.
   - **Step E:** Once complete, frontend posts the `fileKey` to your database to link the video to the course/lesson.

**Relevant files**
- [apps/lms-service/src/uploade/s3.service.ts](apps/lms-service/src/uploade/s3.service.ts) — Add `generatePresignedUrl` logic natively extracting AWS secrets.
- [apps/lms-service/src/uploade/uploade.controller.ts](apps/lms-service/src/uploade/uploade.controller.ts) — Expose endpoints for both direct-image drops and pre-signed video ticketing (you may need to create this controller).
- Frontend files in `apps/teacher-front` where the upload component resides.

**Verification**
1. Ensure the AWS S3 Bucket has a permissive CORS policy allowing `PUT` requests natively originating from your Next.js `localhost:3000` domains.

**Further Considerations**
1. Does your application need to support multi-part resumable uploads for even larger files (5GB+), or is standard direct PUT sufficient?