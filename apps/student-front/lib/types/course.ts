export type CourseLevel = "Beginner" | "Intermediate" | "Advanced" | "All Levels";

export interface Lesson {
    id: number | string;
    title: string;
    type: "video" | "article" | "quiz";
    duration: string;
    status: "published" | "draft";
    videoUrl?: string;
    fileUrl?: string;
    preview: boolean;
    description?: string;
}

export interface Section {
    id: number | string;
    title: string;
    description?: string;
    lessons: Lesson[];
}

export interface Course {
    id: string | number;
    title: string;
    description?: string;
    instructor?: string;
    category?: string;
    level?: CourseLevel;
    rating?: number;
    reviews?: string | number;
    hours?: string | number;
    price?: string | number;
    thumbnail?: string;
    image?: string; // Legacy support if needed
    isActive?: boolean;
    students?: string | number;
    lastUpdated?: string;
    whatYouWillLearn?: string[];
    sections?: Section[];
}
