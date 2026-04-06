"use client";

import { motion } from "framer-motion";
import {
    BarChart3,
    Users,
    Star,
    CheckCircle2,
    ChevronRight,
    BookOpen,
    Lock,
    PlayCircle,
    GripVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CourseDetail } from "@/components/course/courseTypes";

interface CourseSidebarProps {
    course: CourseDetail;
    totalLessons: number;
    publishedLessons: number;
}

export function CourseSidebar({ course, totalLessons, publishedLessons }: CourseSidebarProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="space-y-4 xl:sticky xl:top-28 xl:self-start"
        >
            {/* ── Stats card ── */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-5 space-y-4">
                <h3 className="font-bold text-gray-900 dark:text-white text-sm flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-green-500" /> Course Stats
                </h3>

                {[
                    { label: "Enrolled Students", value: (course.students || 0).toLocaleString(), icon: Users,         color: "text-blue-500" },
                    { label: "Average Rating",    value: `${course.rating || 0} ★`,            icon: Star,           color: "text-amber-500" },
                    { label: "Total Reviews",     value: (course.reviews || 0).toLocaleString(),  icon: CheckCircle2,   color: "text-green-500" },
                    { label: "Total Revenue",     value: `$${((course.revenue || 0) / 1000).toFixed(1)}k`, icon: ChevronRight, color: "text-violet-500" },
                ].map(({ label, value, icon: Icon, color }) => (
                    <div key={label} className="flex items-center justify-between">
                        <span className={`flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-medium`}>
                            <Icon className={`w-3.5 h-3.5 ${color}`} /> {label}
                        </span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{value}</span>
                    </div>
                ))}

                {/* Completion bar */}
                <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                        <span className="text-gray-400 dark:text-gray-500">Avg Completion</span>
                        <span className="text-green-600 dark:text-green-400">{course.completionRate || 0}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full rounded-full"
                            style={{ background: "linear-gradient(to right, #074C00, #42A341, #B8E2A3)" }}
                            initial={{ width: 0 }}
                            animate={{ width: `${course.completionRate || 0}%` }}    
                            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                        />
                    </div>
                </div>
            </div>

            {/* ── Lesson Summary card ── */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-5 space-y-3">
                <h3 className="font-bold text-gray-900 dark:text-white text-sm flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-green-500" /> Lesson Summary
                </h3>

                {[
                    { label: "Total Lessons", value: totalLessons,                   icon: BookOpen,     color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" },
                    { label: "Published",     value: publishedLessons,               icon: CheckCircle2, color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" },
                    { label: "Draft",         value: totalLessons - publishedLessons, icon: Lock,        color: "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400" },
                    { label: "Sections",      value: (course.sections || []).length,         icon: PlayCircle,   color: "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400" },
                ].map(({ label, value, icon: Icon, color }) => (
                    <div key={label} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                            <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 flex-1">{label}</span>
                        <span className="text-sm font-black text-gray-900 dark:text-white">{value}</span>
                    </div>
                ))}
            </div>

            {/* ── Quick Actions card ── */}
            {/* <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-5 space-y-2">
                <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-3">Quick Actions</h3>
                {[
                    { label: "Publish All Draft Lessons", icon: CheckCircle2, variant: "default"  as const },
                    { label: "Reorder Sections",          icon: GripVertical, variant: "outline"  as const },
                    { label: "View Student Progress",     icon: Users,        variant: "outline"  as const },
                    { label: "Export Course Data",        icon: BarChart3,    variant: "outline"  as const },
                ].map(({ label, icon: Icon, variant }) => (
                    <Button
                        key={label}
                        variant={variant}
                        size="sm"
                        className="w-full justify-start h-9 rounded-xl text-xs font-semibold"
                    >
                        <Icon className="w-3.5 h-3.5 mr-2" /> {label}
                    </Button>
                ))}
            </div> */}
        </motion.div>
    );
}
