import { getAllCourses, getCourseById } from "@/lib/api/course";
import { useQuery } from "@tanstack/react-query";

export const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: getAllCourses,
  });
};

export const useCourseById = (id: string | number) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => getCourseById(id),
    enabled: !!id,
  });
};
