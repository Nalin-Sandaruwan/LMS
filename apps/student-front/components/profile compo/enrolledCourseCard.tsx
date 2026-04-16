"use client"
import * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function EnrolledCourseCard({ course, idx }: { course: any, idx: number }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15 }}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 md:p-6 shadow-sm flex flex-col md:flex-row gap-6 items-center group hover:border-blue-500 transition-colors cursor-pointer"
        >
            <div className={`w-full md:w-48 h-32 rounded-xl shrink-0 ${course.imageHash || 'bg-linear-to-br from-blue-500 to-indigo-600'} relative overflow-hidden shadow-inner`}>
                {course.thumbnail && (
                    <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                    />
                )}
                {/* Play overlay mockup */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full">
                <div className="flex justify-between items-start mb-2 gap-4">
                    <Link href={`/profile/my-courses/${course.id}`}>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer line-clamp-1">
                            {course.title}
                        </h3>
                    </Link>
                    {/* Status Badge */}
                    <div className="shrink-0">
                        {course.status === 'completed' ? (
                            <span className="bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md border border-emerald-200 dark:border-emerald-500/20">
                                Completed
                            </span>
                        ) : course.status === 'in-progress' ? (
                            <span className="bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md border border-blue-200 dark:border-blue-500/20">
                                In Progress
                            </span>
                        ) : (
                            <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md border border-gray-200 dark:border-gray-700">
                                {course.status || 'Pending'}
                            </span>
                        )}
                    </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{course.instructor}</p>

                <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                        <span className="text-gray-700 dark:text-gray-300">Progress</span>
                        <span className="text-blue-600 dark:text-blue-400 font-bold">{course.progress}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${course.progress}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                            className={`h-full rounded-full ${course.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-600 dark:bg-blue-500'}`}
                        />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 pt-1 font-medium">
                        <span>{course.completedLessons}/{course.totalLessons} lessons completed</span>
                        <span>Accessed {course.lastAccessed}</span>
                    </div>
                </div>
            </div>

            <div className="md:border-l md:border-gray-200 md:dark:border-gray-800 md:pl-6 shrink-0 w-full md:w-auto mt-4 md:mt-0 flex flex-col gap-2">
                <Link href={`/profile/my-courses/${course.id}`}>
                    <Button variant="default" className="w-full md:w-40 font-bold whitespace-nowrap shadow-lg shadow-blue-500/20">
                        {course.status === 'completed' ? 'Continue' : 'Continue Learning'}
                    </Button>
                </Link>
                {course.status === 'completed' && (
                    <Link href={`/profile/my-courses/${course.id}`}>
                        <Button variant="outline" className="w-full md:w-40 font-bold whitespace-nowrap border-emerald-500 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10">
                            Rewatch
                        </Button>
                    </Link>
                )}
            </div>
        </motion.div>
    );
}
