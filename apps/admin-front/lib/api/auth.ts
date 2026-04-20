import { apiClient } from "./axios";

export interface UserProfile {
  id: number;
  email: string;
  role: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const authApi = {
  login: async (payload: LoginPayload) => {
    const response = await apiClient.post("/auth/login", payload);
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post("/auth/logout");
    return response.data;
  },

  fetchUserProfile: async (): Promise<UserProfile> => {
    const response = await apiClient.get("/auth/verify"); // Basic verify to check session
    return response.data.result;
  },
};
