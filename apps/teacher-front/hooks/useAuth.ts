"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/axios';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

// Interface assuming standard response shape. Update to match actual API Gateway profile response structure
export interface UserProfile {
  id: number;
  email: string;
  name?: string;
  role?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export function useAuth() {
  const fetchUser = async (): Promise<UserProfile> => {
    // Calling the endpoint that returns verified user info
    const response = await apiClient.get('/auth/profile');
    // If the API returns { user: { ... } }, we extract it
    return response.data?.user || response.data;
  };

  const query = useQuery({
    queryKey: ['authUser'],
    queryFn: fetchUser,
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

// Payload based on the fields collected in the signup flow
export interface TeacherSignupPayload {
  name: string;
  email: string;
  phone?: string;
  expertise: string;
  bio?: string;
  password?: string;
}

export function useTeacherSignup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TeacherSignupPayload) => {
      // The apiClient automatically appends the baseURL (http://localhost:3000)
      const response = await apiClient.post('/auth/signup/teacher', data);
      return response.data;
    },
    onSuccess: (data) => {
      // On successful signup, you might want to log them in automatically
      // or invalidate the 'authUser' query so useAuth refetches.
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
      toast.success('Account created successfully!');
    },
    onError: (error) => {
      let errorMessage = 'Failed to create account.';
      if (error instanceof AxiosError && error.response?.data?.message) {
        const msg = error.response.data.message;
        errorMessage = Array.isArray(msg) ? msg[0] : msg;
      } else if (error instanceof AxiosError && error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error('Signup Failed', { description: errorMessage });
    },
  });
}

// Payload based on the fields collected in the login flow
export interface TeacherLoginPayload {
  email: string;
  password?: string;
}

export function useTeacherLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TeacherLoginPayload) => {
      const response = await apiClient.post('/auth/login', data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate the 'authUser' query so useAuth refetches new logged-in state.
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
      toast.success('Successfully logged in!');
    },
    onError: (error) => {
      let errorMessage = 'Invalid email or password.';
      if (error instanceof AxiosError && error.response?.data?.message) {
        const msg = error.response.data.message;
        errorMessage = Array.isArray(msg) ? msg[0] : msg;
      } else if (error instanceof AxiosError && error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error('Login Failed', { description: errorMessage });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await apiClient.post('/auth/logout');
      return response.data;
    },
    onSuccess: () => {
      // Clear the query cache for authUser so it resets safely
      queryClient.setQueryData(['authUser'], null);
      toast.success('Successfully logged out.');
      window.location.href = '/login';
    },
    onError: (error) => {
      console.error("Logout failed", error);
      toast.error('Logout Failed', {
        description: 'There was a problem signing you out. Please try again.',
      });
    }
  });
}

