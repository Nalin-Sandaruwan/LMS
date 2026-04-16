"use client"
import * as React from 'react';
import { useParams } from 'next/navigation';
import { Navigation } from "@/components/base compo/navigation";
import { Footer } from "@/components/base compo/footer";
import { useCourseById } from '../../hooks/api hooks/useCourse';
import { DetailSkeleton } from './components/DetailSkeleton';
import { ErrorState } from './components/ErrorState';
import { CourseHero } from './components/CourseHero';
import { CourseContent } from './components/CourseContent';
import { CourseSidebar } from './components/CourseSidebar';

export default function CourseDetailPage() {
    const params = useParams();
    const id = params?.id as string;
    const { data: course, isLoading, isError } = useCourseById(id);

    if (isLoading) return <DetailSkeleton />;
    if (isError || !course) return <ErrorState />;

    return (
        <div className="relative flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
            <Navigation />

            <main className="grow pt-24">
                <CourseHero course={course} />

                <div className="container mx-auto px-4 md:px-6 py-12">
                    <div className="flex flex-col lg:flex-row gap-12 relative">
                        <CourseContent course={course} />
                        <CourseSidebar course={course} />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
