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
            <div className={`w-full md:w-48 h-32 rounded-xl shrink-0 ${course.imageHash} relative overflow-hidden shadow-inner`}>
                {/* Play overlay mockup */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full">
                <div className="flex justify-between items-start mb-2">
                    <Link href={`/profile/my-courses/${course.id}`}>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer">
                            {course.title}
                        </h3>
                    </Link>
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
                            className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
                        />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 pt-1">
                        <span>{course.completedLessons}/{course.totalLessons} lessons completed</span>
                        <span>Last accessed {course.lastAccessed}</span>
                    </div>
                </div>
            </div>

            <div className="md:border-l md:border-gray-200 md:dark:border-gray-800 md:pl-6 shrink-0 w-full md:w-auto mt-4 md:mt-0">
                <Link href={`/profile/my-courses/${course.id}`}>
                    <Button variant="outline" className="w-full md:w-auto font-bold whitespace-nowrap hidden md:flex">
                        Continue
                    </Button>
                </Link>
                <Link href={`/profile/my-courses/${course.id}`}>
                    <Button variant="default" className="w-full md:w-auto font-bold whitespace-nowrap md:hidden mt-2 md:mt-0">
                        Continue Learning
                    </Button>
                </Link>
            </div>
        </motion.div>
    );
}
