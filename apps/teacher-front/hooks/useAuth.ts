"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi, UserProfile, TeacherSignupPayload, TeacherLoginPayload } from "@/lib/api/auth";
import { toast } from "sonner";
import { AxiosError } from "axios";

export function useAuth() {
  const query = useQuery({
    queryKey: ["authUser"],
    queryFn: authApi.fetchUserProfile,
    retry: false, // If it fails with 401, don't attempt to retry immediately.
    staleTime: 5 * 60 * 1000, // Data remains fresh for 5 minutes
  });

  return {
    user: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    isAuthenticated: !!query.data && !query.isError,
  };
}

export function useTeacherSignup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TeacherSignupPayload) => authApi.teacherSignup(data),
    onSuccess: (data) => {
      // On successful signup, you might want to log them in automatically
      // or invalidate the 'authUser' query so useAuth refetches.
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Account created successfully!");
    },
    onError: (error) => {
      let errorMessage = "Failed to create account.";
      if (error instanceof AxiosError && error.response?.data?.message) {
        const msg = error.response.data.message;
        errorMessage = Array.isArray(msg) ? msg[0] : msg;
      } else if (error instanceof AxiosError && error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error("Signup Failed", { description: errorMessage });
    },
  });
}

export function useTeacherLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TeacherLoginPayload) => authApi.teacherLogin(data),
    onSuccess: () => {
      // Invalidate the 'authUser' query so useAuth refetches new logged-in state.
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Successfully logged in!");
    },
    onError: (error) => {
      let errorMessage = "Invalid email or password.";
      if (error instanceof AxiosError && error.response?.data?.message) {
        const msg = error.response.data.message;
        errorMessage = Array.isArray(msg) ? msg[0] : msg;
      } else if (error instanceof AxiosError && error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error("Login Failed", { description: errorMessage });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // Clear the query cache for authUser so it resets safely
      queryClient.setQueryData(["authUser"], null);
      toast.success("Successfully logged out.");
      window.location.href = "/login";
    },
    onError: (error) => {
      console.error("Logout failed", error);
      toast.error("Logout Failed", {
        description: "There was a problem signing you out. Please try again.",
      });
    },
  });
}
