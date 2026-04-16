import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserProfile, loginUser, logoutUser, registerUser } from "../../../lib/api/auth";

export const useAuth = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    retry: false, // Do not retry on failure (e.g., if unauthorized)
    refetchOnWindowFocus: true, // Re-check auth status on window focus
    select: (data) => {
      // Normalize: If data has a 'user' property, use that. Otherwise, data is the user.
      if (data && data.user) return data.user;
      return data;
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      // Refresh the user profile in the cache after a successful login
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      // Clear the user profile from the cache on logout
      queryClient.setQueryData(["userProfile"], null);
      // Optionally force a refetch to ensure everything is cleared
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
};
