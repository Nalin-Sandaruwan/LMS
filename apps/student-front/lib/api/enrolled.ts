import { apiClient } from "./axios";

/**
 * Fetches all courses the current student is enrolled in.
 * The userId is automatically derived from headers by the backend.
 */
export const getUserEnrolledCourses = async () => {
  const response = await apiClient.get("/api/enrollment/user-enrolled-courses");
  return response.data;
};

//create enrollment
export const createEnrollment = async (classId: number) => {
  const response = await apiClient.post("/api/enrollment", {
    classId,
    status: "active",
    progressCalculation: 0,
  });
  return response.data;
};

export const getEnrollmentById = async (id: string | number) => {
  const response = await apiClient.get(`/api/enrollment/${id}`);
  return response.data;
};

export const updateEnrollment = async (id: string, data: any) => {
  const response = await apiClient.patch(`/api/enrollment/${id}`, data);
  return response.data;
};

