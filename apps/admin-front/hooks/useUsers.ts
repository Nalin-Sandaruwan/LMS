"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi, GeneralUser } from "@/lib/api/admin";
import { toast } from "sonner";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: adminApi.getUsers,
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isActive }: { id: number; isActive: boolean }) => 
      adminApi.updateUserStatus(id, isActive),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      // Also invalidate teachers just in case a teacher status was toggled here
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      
      const message = variables.isActive ? "Account activated successfully!" : "Account restricted successfully.";
      toast.success(message);
    },
    onError: (error) => {
      console.error("Update failed:", error);
      toast.error("Action Failed", { description: "There was a problem updating the user status." });
    },
  });
}
