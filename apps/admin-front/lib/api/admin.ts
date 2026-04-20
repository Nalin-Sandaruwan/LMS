import { apiClient } from "./axios";

export interface TeacherUser {
  id: number;
  email: string;
  role: string;
  isActive: boolean;
  fullName?: string;
  teachingExpert?: string;
  shortBio?: string;
}

export interface GeneralUser {
  id: number;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export const adminApi = {
  getTeachers: async (): Promise<TeacherUser[]> => {
    const response = await apiClient.get("/auth/admin/teachers");
    return response.data;
  },

  verifyTeacher: async (id: number, isActive: boolean) => {
    const response = await apiClient.patch(`/auth/admin/teachers/verify/${id}`, { isActive });
    return response.data;
  },

  getUsers: async (): Promise<GeneralUser[]> => {
    const response = await apiClient.get("/auth/admin/users");
    return response.data;
  },

  updateUserStatus: async (id: number, isActive: boolean) => {
    const response = await apiClient.patch(`/auth/admin/users/status/${id}`, { isActive });
    return response.data;
  },
};
