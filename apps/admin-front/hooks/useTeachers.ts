"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi, TeacherUser } from "@/lib/api/admin";
import { toast } from "sonner";
import { AxiosError } from "axios";

export function useTeachers() {
  return useQuery({
    queryKey: ["teachers"],
    queryFn: adminApi.getTeachers,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useVerifyTeacher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isActive }: { id: number; isActive: boolean }) => 
      adminApi.verifyTeacher(id, isActive),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      const message = variables.isActive ? "Teacher verified successfully!" : "Teacher restricted successfully.";
      toast.success(message);
    },
    onError: (error) => {
      console.error("Verification failed:", error);
      toast.error("Action Failed", { description: "There was a problem updating the status." });
    },
  });
}

export function useTeacherProfile(id: number) {
  return useQuery({
    queryKey: ["teacher", id],
    queryFn: () => adminApi.getTeacherProfile(id),
    enabled: !!id,
  });
}

export function useTeacherCourses(id: number) {
  return useQuery({
    queryKey: ["teacher-courses", id],
    queryFn: () => adminApi.getTeacherCourses(id),
    enabled: !!id,
  });
}
