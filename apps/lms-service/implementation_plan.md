# Implementation Plan - Bunny.net Video Upload (1GB+)

Uploading large video files (1GB+) requires a robust approach to handle potential network interruptions and server timeouts. We will implement **Bunny.net Stream** with the **TUS Resumable Upload Protocol**.

## User Review Required

> [!IMPORTANT]
> **Direct Client-to-Edge Upload**: To handle 1GB+ files efficiently, we will use direct client-to-Bunny.net uploads. The backend will only handle initialization and security signatures. This avoids server bottlenecks and timeouts on your NestJS service.

> [!CAUTION]
> **API Credentials**: You will need to provide `BUNNY_STREAM_API_KEY` and `BUNNY_STREAM_LIBRARY_ID` in your `.env` file. These can be found in your Bunny.net Dashboard under "Stream" -> "API Settings".

## Proposed Changes

### 1. [NEW] Bunny Stream Service
We will create a dedicated service to interact with the Bunny.net API.

#### [NEW] [bunny-stream.service.ts](file:///d:/Software%20Eng%20(03-2026)/LMS%20System/pro/lms/apps/lms-service/src/lessons/bunny-stream.service.ts)
- `createVideo(title: string)`: Calls Bunny API to create a video entry and returns the `videoId`.
- `getUploadSignature(videoId: string)`: Generates the SHA256 signature required for secure client-side TUS uploads.

### 2. [MODIFY] Lessons Module
Integrate the new `BunnyStreamService` and ensure it's exported/available.

#### [MODIFY] [lessons.module.ts](file:///d:/Software%20Eng%20(03-2026)/LMS%20System/pro/lms/apps/lms-service/src/lessons/lessons.module.ts)
- Add `BunnyStreamService` to providers.

### 3. [MODIFY] Lessons Controller
Add an endpoint for the frontend to request an upload session.

#### [MODIFY] [lessons.controller.ts](file:///d:/Software%20Eng%20(03-2026)/LMS%20System/pro/lms/apps/lms-service/src/lessons/lessons.controller.ts)
- `POST /lessons/upload-session`: 
  - Takes a title.
  - Returns `videoId`, `libraryId`, `signature`, and `expiration`.

### 4. [MODIFY] Lesson Entity
Store Bunny-specific information to manage videos later (e.g., checking status, deleting).

#### [MODIFY] [lesson.entity.ts](file:///d:/Software%20Eng%20(03-2026)/LMS%20System/pro/lms/apps/lms-service/src/lessons/entities/lesson.entity.ts)
- Add `bunnyVideoId` column.

## Frontend Implementation Guide (React)

The frontend should use the `@tus/tus-js-client` library.

1. **Get Session**: Call `POST /lessons/upload-session` to get the signature.
2. **Start Upload**:
```javascript
import * as tus from 'tus-js-client';

const upload = new tus.Upload(file, {
  endpoint: 'https://video.bunnycdn.com/tusupload',
  retryDelays: [0, 3000, 5000, 10000, 20000],
  headers: {
    AuthorizationSignature: signature, // from backend
    AuthorizationExpire: expiration,   // from backend
    VideoId: videoId,                  // from backend
    LibraryId: libraryId,              // from backend
  },
  metadata: {
    filetype: file.type,
    title: file.name,
  },
  onError: (error) => console.error('Upload failed:', error),
  onProgress: (bytesUploaded, bytesTotal) => {
    const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
    console.log(`Progress: ${percentage}%`);
  },
  onSuccess: () => {
    console.log('Upload finished');
    // Save the lesson with the bunnyVideoId to your backend
  },
});
upload.start();
```

## Open Questions

- Do you already have a Bunny.net Stream Library created?
- Would you like me to also implement the logic to fetch the video status (e.g., 'Processing' vs 'Finished')?

## Verification Plan

### Automated Tests
- Mock Bunny.net API responses for video creation.
- Test signature generation matches Bunny's SHA256 requirements.

### Manual Verification
- Verify the `/lessons/upload-session` endpoint returns the correct fields.
- Guide the user to run a test upload using a small file first to ensure the signature works.
