export type CourseStatus = "Published" | "Draft" | "Under Review";
export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

export interface Course {
    id: number;
    title: string;
    description: string;
    category: string;
    level: CourseLevel;
    status: CourseStatus;
    isActive?: boolean;
    students: number;
    rating: number;
    reviews: number;
    duration: string;
    updatedAt?: string;
    lessons: number;
    revenue: number;
    thumbnail: string;
    lastUpdated?: string;
    completionRate: number;
}
