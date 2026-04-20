import { apiClient } from "./axios";

export interface CreateSectionData {
  courseId: number;
  title: string;
  description: string;
  duration?: number;
}

export const sectionApi = {
  //create section
  createSection: async (data: CreateSectionData) => {
    const response = await apiClient.post("/api/section", data);
    return response.data;
  },

  // delete section
  deleteSection: async (id: number) => {
    const response = await apiClient.delete(`/api/section/${id}`);
    return response.data;
  },

  // update section
  updateSection: async (id: number, data: CreateSectionData) => {
    const response = await apiClient.patch(`/api/section/${id}`, data);
    return response.data;
  },
};
