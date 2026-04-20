"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi, LoginPayload } from "@/lib/api/auth";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export function useAuth() {
  const query = useQuery({
    queryKey: ["authUser"],
    queryFn: authApi.fetchUserProfile,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  return {
    user: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    isAuthenticated:
      !!query.data && !query.isError && query.data.role === "admin",
  };
}

export function useAdminLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginPayload) => authApi.login(data),
    onSuccess: (data) => {
      if (data.user?.role !== "admin") {
        toast.error("Access Denied", {
          description: "You do not have admin privileges.",
        });
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Successfully logged in!");
      router.push("/dashboard");
    },
    onError: (error) => {
      let errorMessage = "Invalid email or password.";
      if (error instanceof AxiosError && error.response?.data?.message) {
        const msg = error.response.data.message;
        errorMessage = Array.isArray(msg) ? msg[0] : msg;
      }
      
      if (errorMessage === "Unauthorized") {
        errorMessage = "Invalid email or password.";
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
      queryClient.setQueryData(["authUser"], null);
      toast.success("Successfully logged out.");
      window.location.href = "/login";
    },
    onError: (error) => {
      console.error("Logout failed", error);
      toast.error("Logout Failed");
    },
  });
}
