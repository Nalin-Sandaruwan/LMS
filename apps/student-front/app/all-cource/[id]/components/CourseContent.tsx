"use client"
import * as React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Course } from '@/lib/types/course';
import { CourseCurriculum } from './CourseCurriculum';

interface CourseContentProps {
    course: Course;
}

export function CourseContent({ course }: CourseContentProps) {
    return (
        <div className="lg:w-2/3 space-y-12">
            {/* What you'll learn */}
            {course.whatYouWillLearn && course.whatYouWillLearn.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-sm"
                >
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">
                        What you'll learn
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        {course.whatYouWillLearn.map((item: string, i: number) => (
                            <div key={i} className="flex gap-3 items-start">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                <span className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Description */}
            <div className="space-y-4">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                    Description
                </h2>
                <div className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium whitespace-pre-wrap">
                    {course.description}
                </div>
            </div>

            {/* Curriculum */}
            <CourseCurriculum course={course} />
        </div>
    );
}
