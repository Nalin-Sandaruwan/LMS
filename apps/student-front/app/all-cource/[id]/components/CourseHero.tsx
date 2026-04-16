"use client"
import * as React from 'react';
import { motion } from 'framer-motion';
import { Star, Users, Calendar, Globe, CheckCircle2 } from 'lucide-react';
import { Course } from '@/lib/types/course';

interface CourseHeroProps {
    course: Course;
}

export function CourseHero({ course }: CourseHeroProps) {
    return (
        <div className="bg-gray-900 dark:bg-black py-16 text-white border-b border-gray-800">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <span className="text-blue-400 font-bold text-sm uppercase tracking-wider">
                            {course.category || "General"}
                        </span>
                        <span className="text-gray-600">&bull;</span>
                        <span className="text-gray-400 font-medium text-sm">
                            {course.level || "All Levels"}
                        </span>
                        {course.isActive && (
                            <>
                                <span className="text-gray-600">&bull;</span>
                                <span className="text-emerald-400 font-bold text-sm flex items-center gap-1">
                                    <CheckCircle2 className="w-4 h-4" /> Published
                                </span>
                            </>
                        )}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                        {course.title}
                    </h1>

                    <p className="text-lg text-gray-400 mb-8 max-w-3xl line-clamp-3 leading-relaxed font-medium">
                        {course.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
                        {course.rating != null && (
                            <div className="flex items-center gap-1.5 text-yellow-500 font-black text-base">
                                <span>{Number(course.rating).toFixed(1)}</span>
                                <Star className="w-5 h-5 fill-current" />
                                <span className="text-gray-400 font-medium ml-1">({course.reviews || 0} reviews)</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2 font-medium">
                            <Users className="w-4 h-4 text-gray-500" />
                            <span>{course.students || 0} students</span>
                        </div>
                        <div className="flex items-center gap-2 font-medium">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span>Last updated {course.lastUpdated || 'Recently'}</span>
                        </div>
                        <div className="flex items-center gap-2 font-medium">
                            <Globe className="w-4 h-4 text-gray-500" />
                            <span>English</span>
                        </div>
                    </div>

                    <div className="mt-8 flex items-center gap-4 group cursor-pointer">
                        <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center font-black text-gray-300 border border-gray-700 shadow-inner overflow-hidden">
                            {course.instructor ? course.instructor.charAt(0) : <Users className="w-6 h-6" />}
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-black tracking-widest mb-0.5">Instructor</p>
                            <p className="text-base text-blue-400 font-bold group-hover:underline">{course.instructor || "Platform Specialist"}</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
