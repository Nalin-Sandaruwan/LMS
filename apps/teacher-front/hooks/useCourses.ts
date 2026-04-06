import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/axios';
import { Course } from '@/components/your-courses/types';
import { CourseDetail } from '@/components/course/courseTypes';

export const useCourses = () => {
    return useQuery({
        queryKey: ['courses'],
        queryFn: async (): Promise<Course[]> => {
            // Making the request to your /api/course endpoint
            const { data } = await apiClient.get('/api/course/teacher-created');
            
            // If backend returns { message: "No courses found for this teacher" } when empty:
            if (!Array.isArray(data)) {
                return [];
            }
            
            return data;
        },
    });
};

export const useCourse = (id: string) => {
    return useQuery({
        queryKey: ['course', id],
        queryFn: async (): Promise<CourseDetail> => {
            const { data } = await apiClient.get(`/api/course/${id}`);
            return data;
        },
        enabled: !!id,
    });
};
