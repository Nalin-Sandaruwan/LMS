import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sectionApi, CreateSectionData } from "@/lib/api/section";
import { toast } from "sonner";

export const useSection = () => {
  const queryClient = useQueryClient();

  const createSectionMutation = useMutation({
    mutationFn: (data: CreateSectionData) => sectionApi.createSection(data),
    onSuccess: (newSection) => {
      // Invalidate course query to refresh the section list
      queryClient.invalidateQueries({
        queryKey: ["course", String(newSection.courseId)],
      });
      toast.success("Section created successfully");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to create section";
      toast.error(message);
    },
  });

  const deleteSectionMutation = useMutation({
    mutationFn: (id: number) => sectionApi.deleteSection(id),
    onSuccess: () => {
      // Refresh any course queries to reflect the deleted section
      queryClient.invalidateQueries({
        queryKey: ["course"],
      });
      toast.success("Section deleted successfully");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to delete section";
      toast.error(message);
    },
  });

  return {
    createSection: createSectionMutation.mutateAsync,
    isCreating: createSectionMutation.isPending,
    deleteSection: deleteSectionMutation.mutateAsync,
    isDeleting: deleteSectionMutation.isPending,
    error: createSectionMutation.error || deleteSectionMutation.error,
  };
};
