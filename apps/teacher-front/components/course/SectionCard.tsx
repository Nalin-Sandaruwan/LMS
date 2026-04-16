"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { LessonRow } from "@/components/course/LessonRow";
import { AddLessonDialog } from "@/components/course/AddLessonDialog";
import { DeleteSectionDialog } from "@/components/course/DeleteSectionDialog";
import { type Section, type Lesson, fadeUp, stagger } from "@/components/course/courseTypes";

interface SectionCardProps {
    section: Section;
    sectionIndex: number;
}

export function SectionCard({ section, sectionIndex }: SectionCardProps) {
    const [collapsed, setCollapsed] = useState(false);

    // Local lessons state so new additions appear instantly
    const [lessons, setLessons] = useState<Lesson[]>(section.lessons);

    const addLesson = (partial: Omit<Lesson, "id">) => {
        const newLesson: Lesson = {
            id: Date.now(), // temp ID — replace with server ID after API call
            ...partial,
        };
        setLessons((prev) => [...prev, newLesson]);
        setCollapsed(false); // expand the section so the new lesson is visible
    };

    const publishedCount = lessons.filter((l) => l.status === "published").length;

    return (
        <motion.div
            variants={fadeUp}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden"
        >
            {/* Section header */}
            <div
                className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                onClick={() => setCollapsed(!collapsed)}
            >
                <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black text-white shrink-0"
                    style={{ background: "linear-gradient(135deg, #074C00, #42A341)" }}
                >
                    {sectionIndex + 1}
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">{section.title}</h3>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                        {lessons.length} lesson{lessons.length !== 1 ? "s" : ""} · {publishedCount} live
                    </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    <span onClick={(e) => e.stopPropagation()}>
                        <DeleteSectionDialog
                            sectionId={section.id}
                            sectionTitle={section.title}
                            onDelete={() => console.log("Deleted section:", section.id)}
                        />
                    </span>
                    {/* Stop propagation so clicking AddLessonDialog doesn't toggle collapse */}

                    <span onClick={(e) => e.stopPropagation()}>
                        <AddLessonDialog
                            sectionId={section.id}
                            onAdd={addLesson}
                        />
                    </span>
                    <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${collapsed ? "-rotate-90" : ""
                            }`}
                    />
                </div>
            </div>

            {/* Lessons list */}
            <AnimatePresence>
                {!collapsed && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-3 pb-3 border-t border-gray-100 dark:border-gray-800 pt-2 space-y-1">
                            <AnimatePresence mode="popLayout">
                                {lessons.length === 0 ? (
                                    <motion.p
                                        key="empty"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-xs text-center text-gray-400 dark:text-gray-500 py-4"
                                    >
                                        No lessons yet — click <strong>Add Lesson</strong> to get started.
                                    </motion.p>
                                ) : (
                                    <motion.div
                                        variants={stagger}
                                        initial="hidden"
                                        animate="visible"
                                        className="space-y-1"
                                    >
                                        {lessons
                                            .sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime())
                                            .map((lesson, idx) => (
                                                <LessonRow key={lesson.id} lesson={lesson} index={idx} />
                                            ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
