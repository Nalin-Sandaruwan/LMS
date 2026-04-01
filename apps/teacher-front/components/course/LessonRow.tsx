"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronDown,
    AlarmClock,
    PlayCircle,
    Edit3,
    Video,
    Eye,
    Trash2,
    GripVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniVideoPlayer } from "@/components/course/MiniVideoPlayer";
import {
    type Lesson,
    LESSON_TYPE_ICON,
    LESSON_TYPE_COLOR,
    fadeUp,
} from "@/components/course/courseTypes";

interface LessonRowProps {
    lesson: Lesson;
    index: number;
}

export function LessonRow({ lesson, index }: LessonRowProps) {
    const [expanded, setExpanded] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const TypeIcon = LESSON_TYPE_ICON[lesson.type];

    return (
        <motion.div variants={fadeUp} className="group">
            {/* Main row */}
            <div
                className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all duration-200 ${
                    expanded
                        ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800/60 border border-transparent"
                }`}
                onClick={() => setExpanded(!expanded)}
            >
                {/* Drag handle */}
                <GripVertical className="w-4 h-4 text-gray-300 dark:text-gray-600 shrink-0 cursor-grab hidden sm:block" />

                {/* Index */}
                <span className="w-6 text-xs font-bold text-gray-400 dark:text-gray-500 shrink-0 text-center">
                    {String(index + 1).padStart(2, "0")}
                </span>

                {/* Type icon */}
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${LESSON_TYPE_COLOR[lesson.type]}`}>
                    <TypeIcon className="w-3.5 h-3.5" />
                </div>

                {/* Title + meta */}
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {lesson.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                            <AlarmClock className="w-3 h-3" /> {lesson.duration}
                        </span>
                        {lesson.preview && (
                            <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-1.5 py-0.5 rounded-full border border-green-200 dark:border-green-800">
                                Free Preview
                            </span>
                        )}
                    </div>
                </div>

                {/* Status badge */}
                <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 hidden sm:inline ${
                        lesson.status === "published"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                    }`}
                >
                    {lesson.status === "published" ? "Live" : "Draft"}
                </span>

                {/* Chevron */}
                <ChevronDown
                    className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${
                        expanded ? "rotate-180" : ""
                    }`}
                />
            </div>

            {/* Expanded detail */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-3 pb-4 pt-1 ml-10 space-y-3">
                            {/* Description */}
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                                {lesson.description}
                            </p>

                            {/* Video preview toggle */}
                            {lesson.type === "video" && lesson.videoUrl && (
                                <div>
                                    <button
                                        onClick={() => setShowVideo(!showVideo)}
                                        className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                                    >
                                        <PlayCircle className="w-3.5 h-3.5" />
                                        {showVideo ? "Hide preview" : "Preview video"}
                                    </button>
                                    <AnimatePresence>
                                        {showVideo && (
                                            <MiniVideoPlayer
                                                url={lesson.videoUrl}
                                                title={lesson.title}
                                            />
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}

                            {/* Action buttons */}
                            <div className="flex items-center gap-2 pt-1 flex-wrap">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-7 px-3 text-xs rounded-xl gap-1 border-green-300 dark:border-green-800 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                                >
                                    <Edit3 className="w-3 h-3" /> Edit Lesson
                                </Button>
                                {lesson.type === "video" && (
                                    <Button size="sm" variant="outline" className="h-7 px-3 text-xs rounded-xl gap-1">
                                        <Video className="w-3 h-3" /> Replace Video
                                    </Button>
                                )}
                                <Button size="sm" variant="outline" className="h-7 px-3 text-xs rounded-xl gap-1">
                                    <Eye className="w-3 h-3" /> Preview
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-7 px-3 text-xs rounded-xl gap-1 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-900/20"
                                >
                                    <Trash2 className="w-3 h-3" /> Delete
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
