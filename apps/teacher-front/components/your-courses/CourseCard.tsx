import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Link from "next/link";
import { MoreVertical, Eye, Edit3, Trash2, PlayCircle, Clock, Star, ChevronRight, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Course, CourseStatus, CourseLevel } from "./types";

const getStatusStyle = (isActive?: boolean) => {
    return isActive 
        ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 border border-green-200 dark:border-green-800"
        : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border border-gray-200 dark:border-gray-700";
};

const LEVEL_STYLES: Record<CourseLevel, string> = {
    Beginner: "text-sky-600 dark:text-sky-400",
    Intermediate: "text-violet-600 dark:text-violet-400",
    Advanced: "text-rose-600 dark:text-rose-400",
};

export const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

export function CourseCard({ course }: { course: Course }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <motion.div
            variants={cardVariants}
            layout
            className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-green-300 dark:hover:border-green-800 transition-all duration-300"
        >
            {/* Thumbnail */}
            <div className="relative h-44 overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

                {/* Status badge */}
                <div className="absolute top-3 left-3">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${getStatusStyle(course.isActive)}`}>
                        {course.isActive ? "Published" : "Not Published"}
                    </span>
                </div>

                

                {/* Three-dot menu */}
                <div className="absolute top-3 right-3">
                    <div className="relative">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="w-8 h-8 rounded-full bg-white/90 dark:bg-gray-900/90 flex items-center justify-center backdrop-blur-sm hover:bg-white transition-colors"
                        >
                            <MoreVertical className="w-4 h-4 text-gray-700 dark:text-gray-200" />
                        </button>
                        <AnimatePresence>
                            {menuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: -4 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: -4 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute right-0 top-10 w-40 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl z-20 overflow-hidden"
                                    onMouseLeave={() => setMenuOpen(false)}
                                >
                                    <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        <Eye className="w-4 h-4" /> Preview
                                    </button>
                                    <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        <Edit3 className="w-4 h-4" /> Edit
                                    </button>
                                    <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                        <Trash2 className="w-4 h-4" /> Delete
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Category pill */}
                <div className="absolute bottom-3 left-3">
                    <span className="text-xs font-semibold text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                        {course.category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col gap-3">
                <h3 className="font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 text-base group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
                    {course.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
                    {course.description}
                </p>

                {/* Meta row */}
                <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500 font-medium">
                    <span className="flex items-center gap-1"><PlayCircle className="w-3.5 h-3.5" />{course.lessons} lessons</span>
                    <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {course.updatedAt ? new Date(course.updatedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : "Unknown date"}
                    </span>
                </div>

                {/* Stats */}
                {course.isActive ? (
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                        <div className="text-center">
                            <p className="text-xs text-gray-400 dark:text-gray-500">Students</p>
                            <p className="font-bold text-sm text-gray-900 dark:text-white">{(course.students || 0).toLocaleString()}</p>
                        </div>
                        <div className="text-center border-x border-gray-100 dark:border-gray-800">
                            <p className="text-xs text-gray-400 dark:text-gray-500">Rating</p>
                            <p className="font-bold text-sm text-gray-900 dark:text-white flex items-center justify-center gap-0.5">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                {course.rating || 0}
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-gray-400 dark:text-gray-500">Revenue</p>
                            <p className="font-bold text-sm text-green-600 dark:text-green-400">${((course.revenue || 0) / 1000).toFixed(1)}k</p>
                        </div>
                    </div>
                ) : (
                    <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                        <p className="text-xs text-gray-400 dark:text-gray-500 italic">
                            ✏️ Not Published — finish editing before publishing
                        </p>
                    </div>
                )}

                {/* Completion bar (published only) */}
                {course.isActive && (
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs font-medium">
                            <span className="text-gray-400 dark:text-gray-500">Completion rate</span>
                            <span className="text-green-600 dark:text-green-400">{course.completionRate || 0}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full rounded-full"
                                style={{ background: "linear-gradient(to right, #074C00, #42A341, #B8E2A3)" }}
                                initial={{ width: 0 }}
                                animate={{ width: `${course.completionRate || 0}%` }}
                                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                            />
                        </div>
                    </div>
                )}

                {/* CTA */}
                <div className="flex gap-2 pt-1">
                    <Link href={`/your-courses/${course.id}`} className="flex-1">
                        <Button
                            size="sm"
                            className="w-full h-9 text-xs font-bold rounded-xl"
                            variant={!course.isActive ? "outline" : "default"}
                        >
                            Continue Course
                            <ChevronRight className="w-3.5 h-3.5 ml-1" />
                        </Button>
                    </Link>
                    {course.isActive && (
                        <Button size="sm" variant="outline" className="h-9 w-9 p-0 rounded-xl">
                            <BarChart3 className="w-4 h-4" />
                        </Button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
