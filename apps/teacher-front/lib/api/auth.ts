import { apiClient } from "./axios";

export interface UserProfile {
  id: number;
  email: string;
  name?: string;
  role?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface TeacherSignupPayload {
  name: string;
  email: string;
  phone?: string;
  expertise: string;
  bio?: string;
  password?: string;
}

export interface TeacherLoginPayload {
  email: string;
  password?: string;
}

export const authApi = {
  fetchUserProfile: async (): Promise<UserProfile> => {
    const response = await apiClient.get("/auth/profile/teacher");
    return response.data?.user || response.data;
  },

  teacherSignup: async (data: TeacherSignupPayload) => {
    const response = await apiClient.post("/auth/signup/teacher", data);
    return response.data;
  },

  teacherLogin: async (data: TeacherLoginPayload) => {
    const response = await apiClient.post("/auth/login", data);
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post("/auth/logout");
    return response.data;
  },

  // Get teacher data from the LMS server by auth user ID
  getTeacherData: async (id: number) => {
    const response = await apiClient.get(`/api/teacher/${id}`);
    return response.data;
  },

  // Update teacher data in the LMS server
  updateTeacherData: async (id: number, data: Partial<TeacherSignupPayload>) => {
    const response = await apiClient.patch(`/api/teacher/${id}`, data);
    return response.data;
  },
};
