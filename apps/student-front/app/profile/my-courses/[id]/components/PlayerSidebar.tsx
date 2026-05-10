"use client"
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
    X, ChevronDown, ChevronUp, CheckCircle,
    Circle, PlayCircle, FileText, Code
} from 'lucide-react';

interface PlayerSidebarProps {
    showSidebar: boolean;
    setShowSidebar: (show: boolean) => void;
    sections: any[];
    expandedSections: string[];
    toggleSection: (id: string) => void;
    activeLesson: any;
    completedLessons: string[];
    selectLesson: (lesson: any) => void;
    toggleMarkComplete: (lessonId: string, e?: React.MouseEvent) => void;
}

export function PlayerSidebar({
    showSidebar,
    setShowSidebar,
    sections,
    expandedSections,
    toggleSection,
    activeLesson,
    completedLessons,
    selectLesson,
    toggleMarkComplete
}: PlayerSidebarProps) {
    return (
        <>
            {/* Mobile Backdrop Overlay */}
            <AnimatePresence>
                {showSidebar && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowSidebar(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            <div
                className={`fixed inset-y-0 right-0 z-50 flex flex-col w-full max-w-[350px] md:max-w-[400px] bg-white dark:bg-[#0a0a0a] border-l border-gray-200 dark:border-gray-800 shadow-2xl transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:shadow-none
                ${showSidebar ? "translate-x-0" : "translate-x-full lg:hidden"}`}
            >
                {/* Sidebar Header */}
                <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-[#0a0a0a] shrink-0">
                    <div>
                        <h3 className="font-black text-gray-900 dark:text-white text-lg">Course Content</h3>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowSidebar(false)}
                        className="lg:hidden h-10 w-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </Button>
                </div>

                {/* Playlist Content (Scrollable Accordion) */}
                <div className="flex-1 overflow-y-auto styled-scrollbar bg-gray-50/50 dark:bg-[#0a0a0a]">
                    {sections.map((section: any) => {
                        const isExpanded = expandedSections.includes(section.id.toString());
                        const sectionLessons = section.lessons || [];
                        const completedCount = sectionLessons.filter((l: any) => completedLessons.includes(l.id.toString())).length;

                        return (
                            <div key={section.id} className="border-b border-gray-200 dark:border-gray-800/80 last:border-0 bg-white dark:bg-[#0a0a0a]">
                                {/* Section Header */}
                                <button
                                    onClick={() => toggleSection(section.id.toString())}
                                    className="w-full p-5 flex items-start justify-between bg-gray-50 hover:bg-gray-100 dark:bg-[#0f0f0f] dark:hover:bg-gray-900/80 transition-colors text-left group"
                                >
                                    <div className="flex-1 pr-4">
                                        <h4 className="font-bold text-gray-900 dark:text-white text-[15px] leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                            {section.title}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-2 text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            <span>{completedCount}/{sectionLessons.length} Lessons</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                                            <span>{sectionLessons.length * 15} min</span>
                                        </div>
                                    </div>
                                    <div className="mt-1">
                                        {isExpanded ? (
                                            <ChevronUp className="w-5 h-5 text-gray-400 dark:text-gray-500 shrink-0 group-hover:text-blue-500 transition-colors" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500 shrink-0 group-hover:text-blue-500 transition-colors" />
                                        )}
                                    </div>
                                </button>

                                {/* Section Lessons */}
                                <AnimatePresence initial={false}>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden bg-white dark:bg-[#0a0a0a]"
                                        >
                                            <div className="py-2">
                                                {sectionLessons.map((lesson: any) => {
                                                    const isActive = activeLesson?.id === lesson.id;
                                                    const isCompleted = completedLessons.includes(lesson.id.toString());

                                                    return (
                                                        <div
                                                            key={lesson.id}
                                                            onClick={() => {
                                                                selectLesson(lesson);
                                                                // On mobile, maybe close sidebar after selecting lesson? 
                                                                // Usually kept open for navigation, but let's see.
                                                            }}
                                                            className={`flex items-start gap-4 p-4 px-6 cursor-pointer transition-colors border-l-4 ${isActive
                                                                ? "bg-blue-50 dark:bg-blue-900/10 border-blue-500"
                                                                : "border-transparent hover:bg-gray-50 dark:hover:bg-gray-900/40"
                                                                }`}
                                                        >
                                                            {/* Interactive Custom Checkbox */}
                                                            <button
                                                                onClick={(e) => toggleMarkComplete(lesson.id.toString(), e)}
                                                                className="mt-0.5 p-2 -m-2 shrink-0 hover:scale-110 transition-transform focus:outline-hidden"
                                                                title={isCompleted ? "Mark as uncompleted" : "Mark as complete"}
                                                            >
                                                                {isCompleted ? (
                                                                    <CheckCircle className="w-5 h-5 text-emerald-500 transition-colors" fill="currentColor" stroke="white" strokeWidth={1} />
                                                                ) : (
                                                                    <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600 hover:text-blue-500 transition-colors" strokeWidth={2} />
                                                                )}
                                                            </button>

                                                            {/* Lesson Info */}
                                                            <div className="flex-1 min-w-0">
                                                                <p className={`text-[14px] leading-snug font-medium line-clamp-2 ${isActive ? "text-blue-600 dark:text-blue-300" : "text-gray-700 dark:text-gray-300"}`}>
                                                                    {lesson.title}
                                                                </p>
                                                                <div className="flex items-center gap-2 mt-2 text-[11px] font-bold tracking-wide text-gray-500 dark:text-gray-500 uppercase">
                                                                    {lesson.type === 'video' && <PlayCircle className="w-3.5 h-3.5" strokeWidth={2.5} />}
                                                                    {(lesson.type === 'doc' || lesson.type === 'pdf') && <FileText className="w-3.5 h-3.5" strokeWidth={2.5} />}
                                                                    {lesson.type === 'quiz' && <Code className="w-3.5 h-3.5" strokeWidth={2.5} />}
                                                                    <span>{lesson.duration || "15:00"}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    );
}
