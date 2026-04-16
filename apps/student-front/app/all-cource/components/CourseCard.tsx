"use client"
import * as React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Course } from '@/lib/types/course';

interface CourseCardProps {
    course: Course;
    gradient: string;
}

export function CourseCard({ course, gradient }: CourseCardProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-shadow group flex flex-col"
        >
            {/* Thumbnail */}
            <div className="h-48 w-full relative overflow-hidden">
                {course.thumbnail ? (
                    <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                        <BookOpen className="w-12 h-12 text-white/60" />
                    </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                {course.level && (
                    <span className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                        {course.level}
                    </span>
                )}
            </div>

            <div className="p-6 flex flex-col grow">
                <div className="flex items-center gap-2 mb-3">
                    {course.category && (
                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-md">
                            {course.category}
                        </span>
                    )}
                    {course.isActive && (
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-md">
                            Published
                        </span>
                    )}
                    {course.rating != null && (
                        <div className="flex items-center text-yellow-500 text-xs font-bold gap-1 ml-auto">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {Number(course.rating).toFixed(1)}
                            {course.reviews != null && (
                                <span className="text-gray-400 font-normal">({course.reviews})</span>
                            )}
                        </div>
                    )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {course.title}
                </h3>

                {course.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                        {course.description}
                    </p>
                )}

                <div className="mt-auto border-t border-gray-100 dark:border-gray-800 pt-4 flex items-center justify-end">
                    <Button variant="default" asChild>
                        <Link href={`/all-cource/${course.id}`}>View Course</Link>
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
