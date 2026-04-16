"use client";

import { motion } from "framer-motion";
import { BookOpen, Clock, Award, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditCourseDialog } from "@/components/course/EditCourseDialog";
import { DeleteCourseDialog } from "@/components/course/DeleteCourseDialog";
import type { CourseDetail } from "@/components/course/courseTypes";

interface CourseHeroCardProps {
    course: CourseDetail;
    /** Live-editable title (from parent state) */
    title: string;
    /** Live-editable description (from parent state) */
    description: string;
    totalLessons: number;
    onInfoSave: (fields: { title: string; description: string }) => void;
}

export function CourseHeroCard({
    course,
    title,
    description,
    totalLessons,
    onInfoSave,
}: CourseHeroCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm"
        >
            {/* Thumbnail */}
            <div className="relative h-48 overflow-hidden">
                {course.thumbnail ? (
                    <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No Thumbnail</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                    <span
                        className={`text-xs font-bold text-white px-2.5 py-1 rounded-full ${course.isActive ? "bg-green-600" : "bg-gray-600"
                            }`}
                    >
                        {course.isActive ? "Published" : "Not Published"}
                    </span>

                </div>
            </div>

            {/* Info body */}
            <div className="p-6">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-green-600 dark:text-green-400 mb-2">
                    <Zap className="w-3.5 h-3.5" /> Course Detail
                </div>

                <h1 className="text-2xl font-black text-gray-900 dark:text-white leading-snug mb-2">
                    {title}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {description}
                </p>

                {/* Meta row */}
                <div className="flex flex-wrap gap-x-5 gap-y-1 mt-4 text-xs text-gray-400 dark:text-gray-500 font-medium">
                    <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" /> {totalLessons} lessons
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {course.duration || 0} mins
                    </span>
                    {/* <span className="flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" /> {course.level}
                    </span> */}
                    <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        Updated {course.updatedAt ? new Date(course.updatedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : "Unknown"}
                    </span>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-5">
                    <EditCourseDialog
                        courseId={course.id}
                        initialTitle={title}
                        initialDescription={description}
                        onSave={onInfoSave}
                    />
                    <DeleteCourseDialog
                        courseId={course.id}
                        courseTitle={title}
                        onDelete={() => console.log("Deleted course:", course.id)}
                    />
                </div>
            </div>
        </motion.div>
    );
}
