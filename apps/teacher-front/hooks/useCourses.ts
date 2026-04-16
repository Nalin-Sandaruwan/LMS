import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { coursesApi } from "@/lib/api/courses";
import { toast } from "sonner";

// get all courses
export const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: coursesApi.fetchTeacherCreatedCourses,
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: coursesApi.createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Course created successfully");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to create course";
      toast.error(message);
    },
  });
};

// update course
export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      coursesApi.updateCourse(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["course", id] });
      toast.success("Course updated successfully");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to update course";
      toast.error(message);
    },
  });
};

// delete course
export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => coursesApi.deleteCourse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Course deleted successfully");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to delete course";
      toast.error(message);
    },
  });
};

// get course by id
export const useCourse = (id: string) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => coursesApi.fetchCourseById(id),
    enabled: !!id,
  });
};
