import { getUserEnrolledCourses, createEnrollment, getEnrollmentById, updateEnrollment } from "@/lib/api/enrolled";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

/**
 * Hook to fetch all courses the current student is enrolled in.
 */
export const useUserEnrolledCourses = () => {
  return useQuery({
    queryKey: ["enrolled-courses"],
    queryFn: getUserEnrolledCourses,
  });
};

/**
 * Hook to enroll a student in a specific course.
 * Automatically invalidates the 'enrolled-courses' query on success.
 */
export const useCreateEnrollment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (classId: number) => createEnrollment(classId),
    onSuccess: () => {
      // Refresh the enrollment list after successful enrollment
      queryClient.invalidateQueries({ queryKey: ["enrolled-courses"] });
      toast.success("Enrolled successfully! Welcome to the course.");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to enroll in course";
      toast.error(message);
    },
  });
};

/**
 * Hook to fetch a specific enrollment by its ID.
 */
export const useEnrollmentById = (id: string | number) => {
  return useQuery({
    queryKey: ["enrollment", id],
    queryFn: () => getEnrollmentById(id),
    enabled: !!id,
  });
};

/**
 * Hook to update a specific enrollment (e.g., progress tracking).
 */
export const useUpdateEnrollment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => updateEnrollment(id, data),
        onSuccess: (data, variables) => {
            // Invalidate the specific enrollment query to reflect changes
            queryClient.invalidateQueries({ queryKey: ["enrollment", variables.id] });
            // Also invalidate the list of enrolled courses
            queryClient.invalidateQueries({ queryKey: ["enrolled-courses"] });
        },
    });
};
