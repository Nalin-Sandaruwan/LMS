import type { CourseDetail } from "@/components/course/courseTypes";

// ─── Course Mock Data ─────────────────────────────────────────────────────────

export const COURSE_DATA: Record<string, CourseDetail> = {
    "1": {
        id: 1,
        title: "Full-Stack Web Development with Next.js 15",
        description: "Build production-ready web apps with React, Next.js, TypeScript, and modern tooling. Covers SSR, API routes, auth, and deployment.",
        category: "Web Development",
        level: "Intermediate",
        status: "Published",
        students: 3842,
        rating: 4.9,
        reviews: 621,
        duration: "48h 30m",
        revenue: 57630,
        thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80",
        lastUpdated: "Mar 28, 2026",
        completionRate: 74,
        sections: [
            {
                id: 1,
                title: "Getting Started",
                lessons: [
                    { id: 1, title: "Course Overview & What You'll Build", type: "video", duration: "5:24", status: "published", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", preview: true, description: "A high-level overview of the course, the final project, and what tools you'll need installed." },
                    { id: 2, title: "Setting Up Your Development Environment", type: "video", duration: "12:08", status: "published", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", preview: true, description: "Install Node.js, VS Code, and configure your workspace for this course." },
                    { id: 3, title: "Project Architecture Deep Dive", type: "article", duration: "8 min read", status: "published", preview: false, description: "Understand the folder structure and design decisions behind a production Next.js project." },
                ],
            },
            {
                id: 2,
                title: "React & TypeScript Fundamentals",
                lessons: [
                    { id: 4, title: "TypeScript Crash Course for React Devs", type: "video", duration: "28:15", status: "published", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", preview: false, description: "Everything you need to know about TypeScript to follow along with this course." },
                    { id: 5, title: "Component Design Patterns", type: "video", duration: "21:42", status: "published", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", preview: false, description: "Compound components, render props, and custom hooks patterns explained." },
                    { id: 6, title: "State Management with Zustand", type: "video", duration: "19:33", status: "draft", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", preview: false, description: "Set up Zustand stores and connect them to your React components." },
                    { id: 7, title: "Module 2 Quiz", type: "quiz", duration: "10 questions", status: "published", preview: false, description: "Test your understanding of React and TypeScript fundamentals." },
                ],
            },
            {
                id: 3,
                title: "Next.js App Router",
                lessons: [
                    { id: 8, title: "File-Based Routing & Layouts", type: "video", duration: "24:10", status: "published", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", preview: false, description: "Master the App Router paradigm and nested layout patterns." },
                    { id: 9, title: "Server vs. Client Components", type: "video", duration: "18:55", status: "published", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", preview: false, description: "Learn when to use RSC vs. client components and how to avoid common mistakes." },
                    { id: 10, title: "Data Fetching Strategies", type: "video", duration: "32:20", status: "draft", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", preview: false, description: "Static, dynamic, and streaming data fetching patterns in Next.js 15." },
                ],
            },
        ],
    },
    "2": {
        id: 2,
        title: "UI/UX Design Masterclass: From Zero to Pro",
        description: "Learn Figma, design systems, user research, prototyping, and how to hand off to developers like a professional.",
        category: "Design",
        level: "Beginner",
        status: "Published",
        students: 2156,
        rating: 4.8,
        reviews: 389,
        duration: "32h 15m",
        revenue: 32340,
        thumbnail: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&q=80",
        lastUpdated: "Mar 15, 2026",
        completionRate: 68,
        sections: [
            {
                id: 1,
                title: "Design Foundations",
                lessons: [
                    { id: 1, title: "The Design Thinking Process", type: "video", duration: "14:22", status: "published", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", preview: true, description: "Understand the 5-stage design thinking model used by top design teams." },
                    { id: 2, title: "Color Theory & Typography", type: "video", duration: "22:41", status: "published", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", preview: true, description: "Core principles for choosing colors and fonts that communicate effectively." },
                ],
            },
        ],
    },
};

export const FALLBACK_COURSE: CourseDetail = {
    id: 0,
    title: "Course Not Found",
    description: "",
    category: "",
    level: "",
    status: "Draft",
    students: 0,
    rating: 0,
    reviews: 0,
    duration: "—",
    revenue: 0,
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80",
    lastUpdated: "—",
    completionRate: 0,
    sections: [],
};
