"use client"
import * as React from 'react';
import { ProfileLayout } from '@/app/profile/ProfileLayout';
import { StatusGrid } from '@/components/profile compo/statusGrid';
import { EnrolledCourseCard } from '@/components/profile compo/enrolledCourseCard';
import { LearningActivity } from '@/components/profile compo/LearningActivity';
import { SkillMastery } from '@/components/profile compo/SkillMastery';
import { useUserEnrolledCourses } from '@/app/hooks/api hooks/useEnrolled';

export default function ProfileOverviewPage() {
    const { data: enrollments, isLoading: isEnrollmentsLoading } = useUserEnrolledCourses();

    // Map backend enrollment data to UI CourseData format (similar to MyCoursesPage)
    const inProgressCourses = React.useMemo(() => {
        if (!enrollments) return [];

        return enrollments
            .filter((e: any) => e.status?.toLowerCase() !== 'completed')
            .slice(0, 3) // Only show the last 3 for overview
            .map((enrollment: any) => {
                const course = enrollment.course;
                const status = 'in-progress';

                return {
                    id: enrollment.id.toString(),
                    title: course.title,
                    instructor: course.teacher?.fullName || "Expert Instructor",
                    progress: enrollment.progressCalculation || 0,
                    totalLessons: course.sections?.reduce((acc: number, sec: any) => acc + (sec.lessons?.length || 0), 0) || 0,
                    completedLessons: enrollment.completedLessons?.length || 0,
                    imageHash: course.thumbnail ? "" : "bg-linear-to-br from-blue-500 to-indigo-600",
                    thumbnail: course.thumbnail,
                    lastAccessed: new Date(enrollment.updatedAt).toLocaleDateString(),
                    status: status,
                };
            });
    }, [enrollments]);

    return (
        <ProfileLayout>
            <div className="space-y-12">
                {/* Stats Grid */}
                <StatusGrid />

                {/* Momentum & Skills Sections */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    <LearningActivity />
                    <SkillMastery />
                </div>
            </div>
        </ProfileLayout>
    );
}
