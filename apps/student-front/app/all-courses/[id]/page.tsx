"use client"
import * as React from 'react';
import { useParams } from 'next/navigation';
import { useCourseByIdWithoutVideo } from '../../hooks/api hooks/useCourse';
import { DetailSkeleton } from './components/DetailSkeleton';
import { ErrorState } from './components/ErrorState';
import { CourseHero } from './components/CourseHero';
import { CourseContent } from './components/CourseContent';
import { CourseSidebar } from './components/CourseSidebar';

export default function CourseDetailPage() {
    const params = useParams();
    const id = params?.id as string;
    const { data: course, isLoading, isError } = useCourseByIdWithoutVideo(id);

    if (isLoading) return <DetailSkeleton />;
    if (isError || !course) return <ErrorState />;

    return (
        <>
            <main className="grow pt-24">
                <CourseHero course={course} />

                <div className="container mx-auto px-4 md:px-6 py-12">
                    <div className="flex flex-col lg:flex-row gap-12 relative">
                        <CourseContent course={course} />
                        <CourseSidebar course={course} />
                    </div>
                </div>
            </main>
        </>
    );
}
