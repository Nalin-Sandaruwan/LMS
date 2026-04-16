import { apiClient } from "./axios";
import { Course } from "@/components/your-courses/types";
import { CourseDetail } from "@/components/course/courseTypes";

export interface CreateCourseFormData {
  title: string;
  description: string;
  thumbnail: string;
}

export const coursesApi = {
  // Create a new course
  createCourse: async (courseData: CreateCourseFormData): Promise<Course> => {
    const { data } = await apiClient.post("/api/course", courseData);
    return data;
  },

  // Fetch all courses created by the teacher
  fetchTeacherCreatedCourses: async (): Promise<Course[]> => {
    const { data } = await apiClient.get("/api/course/teacher-created");
    if (!Array.isArray(data)) return [];
    return data;
  },

  // Fetch details for a specific course
  fetchCourseById: async (id: string): Promise<CourseDetail> => {
    const { data } = await apiClient.get(`/api/course/${id}`);
    return data;
  },

  // Update an existing course
  updateCourse: async (id: string, courseData: Partial<CreateCourseFormData>): Promise<Course> => {
    const { data } = await apiClient.patch(`/api/course/${id}`, courseData);
    return data;
  },

  // Delete a course permanently
  deleteCourse: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/course/${id}`);
  },
};
