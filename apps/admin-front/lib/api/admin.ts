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
  lastLogin?: string;
}

export const adminApi = {
  getTeachers: async (): Promise<TeacherUser[]> => {
    const response = await apiClient.get("/auth/admin/teachers");
    return response.data;
  },

  verifyTeacher: async (id: number, isActive: boolean) => {
    const response = await apiClient.patch(
      `/auth/admin/teachers/verify/${id}`,
      { isActive },
    );
    return response.data;
  },

  getUsers: async (): Promise<GeneralUser[]> => {
    const response = await apiClient.get("/auth/admin/users");
    return response.data;
  },

  updateUserStatus: async (id: number, isActive: boolean) => {
    const response = await apiClient.patch(`/auth/admin/users/status/${id}`, {
      isActive,
    });
    return response.data;
  },

  deleteUser: async (id: number) => {
    const response = await apiClient.delete(`/auth/admin/users/${id}`);
    return response.data;
  },

  getTeacherProfile: async (id: number): Promise<TeacherUser> => {
    // Fetch both from LMS (profile details) and Auth (account status)
    const [lmsResponse, authResponse] = await Promise.all([
      apiClient.get(`/api/teacher/${id}`),
      apiClient.get(`/auth/admin/users/${id}`),
    ]);

    return {
      ...lmsResponse.data,
      isActive: authResponse.data.isActive,
    };
  },

  getTeacherCourses: async (id: number) => {
    const response = await apiClient.get(`/api/course/admin/teacher/${id}`);
    return response.data;
  },
};
