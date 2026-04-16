import { apiClient } from "./axios";

export const getAllCourses = async () => {
  const response = await apiClient.get("/api/course");
  return response.data;
};

export const getCourseById = async (id: string | number) => {
  const response = await apiClient.get(`/api/course/${id}`);
  return response.data;
};
