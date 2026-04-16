"use client"
import * as React from 'react';
import { Navigation } from "@/components/base compo/navigation";
import { Footer } from "@/components/base compo/footer";
import { useCourses } from '../hooks/api hooks/useCourse';
import { PageHeader } from './components/PageHeader';
import { CategoryFilters } from './components/CategoryFilters';
import { CourseGrid } from './components/CourseGrid';
import { Course } from '@/lib/types/course';

export default function AllCoursesPage() {
    const { data: courses, isLoading, isError } = useCourses();
    const [activeCategory, setActiveCategory] = React.useState("All");

    // Build category list dynamically from live data
    const categories = React.useMemo(() => {
        if (!courses || !Array.isArray(courses)) return ["All"];
        const activeCourses = courses.filter((c: Course) => c.isActive);
        const unique = Array.from(
            new Set(activeCourses.map((c: Course) => c.category).filter((cat): cat is string => !!cat))
        );
        return ["All", ...unique];
    }, [courses]);

    const filteredCourses = React.useMemo(() => {
        if (!courses || !Array.isArray(courses)) return [];
        const activeCourses = courses.filter((c: Course) => c.isActive);
        if (activeCategory === "All") return activeCourses;
        return activeCourses.filter((c: Course) => c.category === activeCategory);
    }, [courses, activeCategory]);

    return (
        <div className="relative flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
            <Navigation />

            <main className="grow pt-32 pb-24">
                <PageHeader />

                {!isLoading && !isError && (
                    <CategoryFilters 
                        categories={categories} 
                        activeCategory={activeCategory} 
                        onCategoryChange={setActiveCategory} 
                    />
                )}

                <section className="container mx-auto px-4 md:px-6">
                    <CourseGrid 
                        courses={filteredCourses} 
                        isLoading={isLoading} 
                        isError={isError} 
                    />
                </section>
            </main>

            <Footer />
        </div>
    );
}
