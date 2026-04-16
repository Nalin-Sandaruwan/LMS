"use client"
import * as React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { Course } from '@/lib/types/course';
import { CourseCard } from './CourseCard';
import { CourseSkeleton } from './CourseSkeleton';

const GRADIENT_COLORS = [
    "from-blue-500 to-indigo-600",
    "from-purple-500 to-pink-600",
    "from-emerald-500 to-teal-600",
    "from-orange-500 to-red-600",
    "from-cyan-500 to-blue-600",
    "from-rose-500 to-pink-600",
];

interface CourseGridProps {
    courses: Course[];
    isLoading: boolean;
    isError: boolean;
}

export function CourseGrid({ courses, isLoading, isError }: CourseGridProps) {
    if (isLoading) {
        return <CourseSkeleton />;
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Failed to load courses</h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                    Could not reach the server. Please check your connection or try again later.
                </p>
            </div>
        );
    }

    if (courses.length === 0) {
        return (
            <div className="text-center py-24 text-gray-500 dark:text-gray-400">
                No courses found for this category.
            </div>
        );
    }

    return (
        <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
            {courses.map((course, idx) => (
                <CourseCard 
                    key={course.id} 
                    course={course} 
                    gradient={GRADIENT_COLORS[idx % GRADIENT_COLORS.length]} 
                />
            ))}
        </motion.div>
    );
}
