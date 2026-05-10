"use client"
import * as React from 'react';
import { PlayCircle, FileText } from 'lucide-react';
import { Course } from '@/lib/types/course';

interface CourseCurriculumProps {
    course: Course;
}

export function CourseCurriculum({ course }: CourseCurriculumProps) {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                    Course Content
                </h2>
                <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                    <span>{course.sections?.length || 0} sections</span>
                    {/* <span className="text-gray-300 dark:text-gray-800">&bull;</span>
                    <span>{course.sections?.reduce((acc: number, s: any) => acc + (s.lessons?.length || 0), 0) || course.lessonCount || 0} lessons</span>
                    <span className="text-gray-300 dark:text-gray-800">&bull;</span>
                    <span>{course.hours || '0'} hours total length</span> */}
                </div>
            </div>

            <div className="space-y-4">
                {course.sections && course.sections.length > 0 ? (
                    course.sections.map((section: any, idx: number) => (
                        <div key={idx} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:border-blue-500/50 transition-colors">
                            <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gray-50/50 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-800">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black">
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white">
                                            {section.title}
                                        </h4>
                                        <div className="flex flex-col gap-1">
                                            {/* <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                                                {section.lessons?.length || 0} Modules
                                            </p> */}
                                            {section.description && (
                                                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl line-clamp-2">
                                                    {section.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                {section.lessons?.map((lesson: any, lIdx: number) => (
                                    <div key={lIdx} className="p-4 px-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                                        <div className="flex items-center gap-3">
                                            {lesson.type === 'video' ? <PlayCircle className="w-4 h-4 text-emerald-500" /> : <FileText className="w-4 h-4 text-gray-400" />}
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-500 transition-colors">
                                                {lesson.title}
                                            </span>
                                        </div>
                                        <span className="text-xs text-gray-400 font-medium">
                                            {lesson.duration}
                                        </span>
                                    </div>
                                ))}
                            </div> */}
                        </div>
                    ))
                ) : (
                    <div className="p-12 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl">
                        <p className="text-gray-500 font-medium">Curriculum details are coming soon.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
