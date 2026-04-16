"use client"
import * as React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, CheckCircle, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export interface CourseData {
    id: string;
    title: string;
    instructor: string;
    progress: number;
    totalLessons: number;
    completedLessons: number;
    imageHash: string;
    lastAccessed: string;
    status: string;
    certificate?: boolean;
}

interface CourseGridProfileProps {
    course: CourseData;
    idx: number;
}

export function CourseGridProfile({ course, idx }: CourseGridProfileProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl hover:border-blue-500/50 transition-all group flex flex-col h-full cursor-pointer"
        >
            {/* Banner/Image Area */}
            <div className={`h-40 w-full ${course.imageHash} relative`}>
                {/* Play Icon Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                        <PlayCircle className="w-8 h-8 text-white ml-0.5" strokeWidth={1.5} />
                    </div>
                </div>

                {/* Course Status Badge */}
                <div className="absolute top-4 right-4">
                    {course.status === 'completed' ? (
                        <span className="bg-emerald-500/95 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Completed
                        </span>
                    ) : (
                        <span className="bg-white/95 dark:bg-black/80 backdrop-blur text-gray-900 dark:text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                            <Clock className="w-3.5 h-3.5 text-blue-500" />
                            {course.progress}%
                        </span>
                    )}
                </div>
            </div>

            {/* Course Details */}
            <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug mb-2">
                    {course.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-1 font-medium">{course.instructor}</p>

                <div className="space-y-4 mt-auto">
                    {/* Progress Bar */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm font-bold">
                            <span className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                {course.status === 'completed' ? 'Fully Completed' : 'Progress'}
                                {course.status !== 'completed' && (
                                    <span className="bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] px-1.5 py-0.5 rounded-sm uppercase tracking-tighter">
                                        {course.status === 'active' || course.status === 'in-progress' ? 'Active' : course.status}
                                    </span>
                                )}
                            </span>
                            <span className={`${course.status === 'completed' ? 'text-emerald-500' : 'text-blue-600 dark:text-blue-400'}`}>
                                {course.completedLessons}/{course.totalLessons} <span className="font-medium text-xs text-gray-500">Lessons</span>
                            </span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${course.progress}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className={`h-full rounded-full ${course.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-600 dark:bg-blue-500'}`}
                            />
                        </div>
                    </div>

                    {/* Footer Row */}
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-2 justify-between items-center">
                        <span className="text-xs text-gray-500 font-medium truncate pr-2">Accessed {course.lastAccessed}</span>
                        <div className="flex gap-2">
                            {course.status === 'completed' && course.certificate && (
                                <Button variant="ghost" size="sm" className="text-amber-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-500/10 px-2 h-8 font-bold whitespace-nowrap">
                                    <Award className="w-4 h-4 mr-1.5" />
                                    Certificate
                                </Button>
                            )}
                            <Link href={`/profile/my-courses/${course.id}`}>
                                <Button variant={course.status === 'completed' ? 'ghost' : 'default'} size="sm" className={`px-4 h-8 font-bold whitespace-nowrap ${course.status === 'completed' ? 'text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-500/10' : 'shadow-md shadow-blue-500/20'}`}>
                                    {course.status === 'completed' ? 'Rewatch' : 'Continue'}
                                </Button>
                            </Link>
                            {course.status === 'completed' && (
                                <Link href={`/profile/my-courses/${course.id}`}>
                                    <Button variant="default" size="sm" className="px-4 h-8 font-bold whitespace-nowrap shadow-md shadow-blue-500/20">
                                        Continue
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
