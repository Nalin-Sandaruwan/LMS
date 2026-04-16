import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  lessonApi,
  CreateLessonFormData,
  UpdateLessonFormData,
} from "@/lib/api/lesson";
import { toast } from "sonner";

export const useLesson = () => {
  const queryClient = useQueryClient();

  /**
   * Mutation for creating a generic lesson
   */
  const createLessonMutation = useMutation({
    mutationFn: (data: CreateLessonFormData) => lessonApi.createLesson(data),
    onSuccess: (newLesson) => {
      // No direct courseId in Lesson, but we can invalidate the 'course' query
      // If the course query key includes the ID, we might need a way to find it.
      // Usually, invalidating the course list or the current course detail is best.
      queryClient.invalidateQueries({ queryKey: ["course"] });
      toast.success("Lesson created successfully");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to create lesson";
      toast.error(message);
    },
  });

  /**
   * Mutation for getting a Bunny.net upload session
   */
  const uploadSessionMutation = useMutation({
    mutationFn: ({ title, sectionId }: { title: string; sectionId: number }) =>
      lessonApi.getUploadSession(title, sectionId),
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to initialize upload";
      toast.error(message);
    },
  });

  // update the lesson
  const updateLessonMutation = useMutation({
    mutationFn: ({ id, ...updateData }: UpdateLessonFormData) =>
      lessonApi.updateLesson(id, updateData),
    onSuccess: (updatedLesson) => {
      queryClient.invalidateQueries({ queryKey: ["course"] });
      toast.success("Lesson updated successfully");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to update lesson";
      toast.error(message);
    },
  });

  // delete the lesson
  const deleteLessonMutation = useMutation({
    mutationFn: (id: number) => lessonApi.deleteLesson(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course"] });
      toast.success("Lesson deleted successfully");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to delete lesson";
      toast.error(message);
    },
  });

  return {
    // Create Lesson
    createLesson: createLessonMutation.mutateAsync,
    isCreating: createLessonMutation.isPending,

    // Update Lesson
    updateLesson: updateLessonMutation.mutateAsync,
    isUpdating: updateLessonMutation.isPending,

    // Delete Lesson
    deleteLesson: deleteLessonMutation.mutateAsync,
    isDeleting: deleteLessonMutation.isPending,

    // Upload Session
    getUploadSession: uploadSessionMutation.mutateAsync,
    isGettingSession: uploadSessionMutation.isPending,

    // Replace Video
    replaceVideo: async ({
      id,
      file,
      onProgress,
      onUploadComplete,
    }: {
      id: number;
      file: File;
      onProgress?: (progress: number) => void;
      onUploadComplete?: () => void;
    }) => {
      try {
        // 1. Get replacement upload session
        const session = await lessonApi.getReplaceUploadSession(id);

        // 2. Upload to Bunny.net using TUS
        const tus = await import("tus-js-client");

        return new Promise((resolve, reject) => {
          const upload = new tus.Upload(file, {
            endpoint: "https://video.bunnycdn.com/tusupload",
            retryDelays: [0, 3000, 5000, 10000, 20000],
            headers: {
              AuthorizationSignature: session.signature,
              AuthorizationExpire: session.expiration,
              VideoId: session.videoId,
              LibraryId: session.libraryId,
            },
            metadata: {
              filetype: file.type,
              title: file.name,
            },
            onError: (error) => {
              console.error("TUS Upload failed:", error);
              const message = "Failed to upload video to Bunny.net";
              toast.error(message);
              reject(error);
            },
            onProgress: (bytesUploaded, bytesTotal) => {
              if (onProgress) {
                const progress = Math.round((bytesUploaded / bytesTotal) * 100);
                onProgress(progress);
              }
            },
            onSuccess: () => {
              // 3. Success
              queryClient.invalidateQueries({ queryKey: ["course"] });
              toast.success("New video upload started successfully");
              resolve(session);
            },
          });
          upload.start();
        });
      } catch (error: any) {
        const message =
          error.response?.data?.message ||
          "Failed to initialize video replacement";
        toast.error(message);
        throw error;
      }
    },

    error:
      createLessonMutation.error ||
      updateLessonMutation.error ||
      uploadSessionMutation.error,
  };
};
