import { Video, FileText, BadgeCheck } from "lucide-react";
import type React from "react";

// ─── Domain Types ─────────────────────────────────────────────────────────────

export type LessonType = "video" | "article" | "quiz";
export type LessonStatus = "published" | "draft";

export interface Lesson {
    id: number;
    title: string;
    type: LessonType;
    duration: string;
    status: LessonStatus;
    videoUrl?: string;
    fileUrl?: string;
    file?: File;
    preview: boolean;
    description: string;
    createdAt?: string;
}

export interface Section {
    id: number;
    title: string;
    description?: string;
    lessons: Lesson[];
}

export interface CourseDetail {
    id: number;
    title: string;
    description: string;
    category: string;
    level: string;
    status: string;
    isActive?: boolean;
    students: number;
    rating: number;
    reviews: number;
    duration: string;
    revenue: number;
    thumbnail: string;
    lastUpdated?: string;
    updatedAt?: string;
    completionRate: number;
    sections: Section[];
}

// ─── Lookup maps ──────────────────────────────────────────────────────────────

export const LESSON_TYPE_ICON: Record<LessonType, React.ElementType> = {
    video: Video,
    article: FileText,
    quiz: BadgeCheck,
};

export const LESSON_TYPE_COLOR: Record<LessonType, string> = {
    video: "text-blue-500 bg-blue-100 dark:bg-blue-900/30",
    article: "text-violet-500 bg-violet-100 dark:bg-violet-900/30",
    quiz: "text-amber-500 bg-amber-100 dark:bg-amber-900/30",
};

// ─── Framer Motion variants ───────────────────────────────────────────────────

import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
