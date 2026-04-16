import { apiClient } from "./axios";

export interface CreateLessonFormData {
  sectionId: number;
  title: string;
  type: "video" | "audio" | "pdf" | "doc" | "text" | "article" | "quiz";
  description?: string;

  status?: "published" | "draft";
  fileUrl?: string;
  bunnyVideoId?: string;
  bunnyStatus?: string;
}

export interface UpdateLessonFormData extends Partial<CreateLessonFormData> {
  id: number;
}

export const lessonApi = {
  /**
   * Create a new lesson
   */
  createLesson: async (data: CreateLessonFormData) => {
    const response = await apiClient.post("/api/lessons", data);
    return response.data;
  },

  /**
   * Fetch a single lesson by ID — used for polling bunnyStatus after upload
   */
  getLesson: async (id: number) => {
    const response = await apiClient.get(`/api/lessons/${id}`);
    return response.data;
  },

  /**
   * Get an upload session for a video (Bunny.net)
   */
  getUploadSession: async (title: string, sectionId: number) => {
    const response = await apiClient.post("/api/lessons/upload-session", {
      title,
      sectionId,
    });
    return response.data;
  },

  getReplaceUploadSession: async (id: number) => {
    const response = await apiClient.post(`/api/lessons/${id}/replace-video`);
    return response.data;
  },

  // update the lesson
  updateLesson: async (id: number, data: Partial<CreateLessonFormData>) => {
    const response = await apiClient.patch(`/api/lessons/${id}`, data);
    return response.data;
  },

  deleteLesson: async (id: number) => {
    const response = await apiClient.delete(`/api/lessons/${id}`);
    return response.data;
  },
};
