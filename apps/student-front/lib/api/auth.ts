import { apiClient } from "./axios";
import { LoginParams, RegisterParams } from "../types/auth";

export const getUserProfile = async () => {
  const response = await apiClient.get("/auth/profile/user");
  return response.data;
};

export const loginUser = async (data: LoginParams) => {
  const response = await apiClient.post("/auth/login", data);
  return response.data;
};

export const logoutUser = async () => {
  const response = await apiClient.post("/auth/logout");
  return response.data;
};

export const registerUser = async (data: RegisterParams) => {
  const response = await apiClient.post("/auth/signup/student", {
    ...data,
    isActive: true,
    role: "user",
  });
  return response.data;
};

//LMS user Data getting
export const getStudentById = async (id: number) => {
  const response = await apiClient.get(`/api/student/${id}`);
  return response.data;
};

// LMS server User Data Update
export const updateStudentProfile = async (id: number, data: any) => {
  const response = await apiClient.patch(`/api/student/${id}`, data);
  return response.data;
};
