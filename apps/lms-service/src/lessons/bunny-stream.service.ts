import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class BunnyStreamService {
  private readonly logger = new Logger(BunnyStreamService.name);
  private readonly libraryId: string;
  private readonly apiKey: string;
  private readonly baseUrl = 'https://video.bunnycdn.com';

  constructor(private configService: ConfigService) {
    this.libraryId =
      this.configService.get<string>('BUNNY_STREAM_LIBRARY_ID') || '';
    this.apiKey = this.configService.get<string>('BUNNY_STREAM_API_KEY') || '';
  }

  async createVideo(title: string, collectionId?: string): Promise<string> {
    try {
      const response = await fetch(
        `${this.baseUrl}/library/${this.libraryId}/videos`,
        {
          method: 'POST',
          headers: {
            AccessKey: this.apiKey,
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
          body: JSON.stringify({ title, collectionId }),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        this.logger.error(`Bunny API error: ${response.status} ${errorText}`);
        throw new Error(
          `Failed to create video on Bunny.net: ${response.statusText}`,
        );
      }

      const data: any = await response.json();
      return data.guid;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error creating video: ${errorMessage}`);
      throw error;
    }
  }

  async createCollection(name: string): Promise<string> {
    try {
      const response = await fetch(
        `${this.baseUrl}/library/${this.libraryId}/collections`,
        {
          method: 'POST',
          headers: {
            AccessKey: this.apiKey,
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
          body: JSON.stringify({ name }),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        this.logger.error(
          `Bunny API collection create error: ${response.status} ${errorText}`,
        );
        throw new Error(
          `Failed to create collection on Bunny.net: ${response.statusText}`,
        );
      }

      const data: any = await response.json();
      return data.guid;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error creating collection: ${errorMessage}`);
      throw error;
    }
  }

  async updateCollection(collectionId: string, name: string): Promise<void> {
    try {
      const response = await fetch(
        `${this.baseUrl}/library/${this.libraryId}/collections/${collectionId}`,
        {
          method: 'POST',
          headers: {
            AccessKey: this.apiKey,
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
          body: JSON.stringify({ name }),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        this.logger.error(
          `Bunny API collection update error: ${response.status} ${errorText}`,
        );
        throw new Error(
          `Failed to update collection on Bunny.net: ${response.statusText}`,
        );
      }

      this.logger.log(
        `Successfully updated Bunny collection ${collectionId} name to: ${name}`,
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error updating collection: ${errorMessage}`);
      throw error;
    }
  }

  async deleteCollection(collectionId: string): Promise<void> {
    try {
      const response = await fetch(
        `${this.baseUrl}/library/${this.libraryId}/collections/${collectionId}`,
        {
          method: 'DELETE',
          headers: {
            AccessKey: this.apiKey,
            accept: 'application/json',
          },
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        this.logger.warn(
          `Could not delete Bunny collection ${collectionId}: ${response.status} ${errorText}`,
        );
        return;
      }

      this.logger.log(`Successfully deleted Bunny collection: ${collectionId}`);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.warn(
        `Error deleting Bunny collection ${collectionId}: ${errorMessage}`,
      );
    }
  }

  async updateVideo(videoId: string, title: string): Promise<void> {
    try {
      const response = await fetch(
        `${this.baseUrl}/library/${this.libraryId}/videos/${videoId}`,
        {
          method: 'POST',
          headers: {
            AccessKey: this.apiKey,
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
          body: JSON.stringify({ title }),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        this.logger.error(
          `Bunny API update error: ${response.status} ${errorText}`,
        );
        throw new Error(
          `Failed to update video on Bunny.net: ${response.statusText}`,
        );
      }

      this.logger.log(
        `Successfully updated Bunny video ${videoId} title to: ${title}`,
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error updating bunny video: ${errorMessage}`);
      throw error;
    }
  }

  /**
   * Deletes a video from Bunny.net library.
   * Called before replacing a video so old orphaned videos don't waste storage.
   */
  async deleteVideo(videoId: string): Promise<void> {
    try {
      const response = await fetch(
        `${this.baseUrl}/library/${this.libraryId}/videos/${videoId}`,
        {
          method: 'DELETE',
          headers: {
            AccessKey: this.apiKey,
            accept: 'application/json',
          },
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        // Log but don't throw — deletion failure shouldn't block the replace flow
        this.logger.warn(
          `Could not delete old Bunny video ${videoId}: ${response.status} ${errorText}`,
        );
        return;
      }

      this.logger.log(`Successfully deleted old Bunny video: ${videoId}`);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      // Log but don't throw — deletion failure shouldn't block the replace flow
      this.logger.warn(
        `Error deleting Bunny video ${videoId}: ${errorMessage}`,
      );
    }
  }

  getUploadSignature(videoId: string) {
    if (!this.libraryId || !this.apiKey) {
      this.logger.error('BUNNY_STREAM_LIBRARY_ID or BUNNY_STREAM_API_KEY is missing in environment variables!');
    }

    // Expiration: 1 hour from now
    const expirationTime = Math.floor(Date.now() / 1000) + 3600;

    // Bunny Signature Pattern: sha256(library_id + api_key + expiration_time + video_id)
    const signatureContent =
      this.libraryId + this.apiKey + expirationTime + videoId;
    
    this.logger.log(`Generating signature for Video: ${videoId}, Library: ${this.libraryId}`);
    
    const signature = crypto
      .createHash('sha256')
      .update(signatureContent)
      .digest('hex');

    return {
      signature,
      expiration: expirationTime,
      libraryId: this.libraryId,
      videoId: videoId,
      // ✅ TUS upload endpoint — the frontend must PUT the video file here
      uploadUrl: `https://video.bunnycdn.com/tusupload`,
    };
  }
}
