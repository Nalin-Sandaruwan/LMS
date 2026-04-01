"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
    BookOpen,
    Users,
    Star,
    Clock,
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit3,
    Trash2,
    Eye,
    TrendingUp,
    Award,
    PlayCircle,
    ChevronRight,
    BarChart3,
    Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Navigation } from "@/components/baseComponets/navBar";

// ─── Types ────────────────────────────────────────────────────────────────────

type CourseStatus = "Published" | "Draft" | "Under Review";
type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

interface Course {
    id: number;
    title: string;
    description: string;
    category: string;
    level: CourseLevel;
    status: CourseStatus;
    students: number;
    rating: number;
    reviews: number;
    duration: string;
    lessons: number;
    revenue: number;
    thumbnail: string;
    lastUpdated: string;
    completionRate: number;
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────

const MOCK_COURSES: Course[] = [
    {
        id: 1,
        title: "Full-Stack Web Development with Next.js 15",
        description:
            "Build production-ready web apps with React, Next.js, TypeScript, and modern tooling. Covers SSR, API routes, auth, and deployment.",
        category: "Web Development",
        level: "Intermediate",
        status: "Published",
        students: 3842,
        rating: 4.9,
        reviews: 621,
        duration: "48h 30m",
        lessons: 112,
        revenue: 57630,
        thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80",
        lastUpdated: "Mar 28, 2026",
        completionRate: 74,
    },
    {
        id: 2,
        title: "UI/UX Design Masterclass: From Zero to Pro",
        description:
            "Learn Figma, design systems, user research, prototyping, and how to hand off to developers like a professional.",
        category: "Design",
        level: "Beginner",
        status: "Published",
        students: 2156,
        rating: 4.8,
        reviews: 389,
        duration: "32h 15m",
        lessons: 78,
        revenue: 32340,
        thumbnail: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&q=80",
        lastUpdated: "Mar 15, 2026",
        completionRate: 68,
    },
    {
        id: 3,
        title: "Advanced TypeScript Patterns & Architecture",
        description:
            "Deep dive into generics, utility types, decorators, module patterns, and building scalable TypeScript applications.",
        category: "Programming",
        level: "Advanced",
        status: "Published",
        students: 1089,
        rating: 4.7,
        reviews: 204,
        duration: "26h 45m",
        lessons: 64,
        revenue: 21780,
        thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
        lastUpdated: "Feb 20, 2026",
        completionRate: 61,
    },
    {
        id: 4,
        title: "Machine Learning Fundamentals with Python",
        description:
            "Hands-on introduction to ML algorithms, scikit-learn, data preprocessing, and model evaluation techniques.",
        category: "Data Science",
        level: "Intermediate",
        status: "Under Review",
        students: 0,
        rating: 0,
        reviews: 0,
        duration: "39h 00m",
        lessons: 91,
        revenue: 0,
        thumbnail: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
        lastUpdated: "Apr 1, 2026",
        completionRate: 0,
    },
    {
        id: 5,
        title: "Docker & Kubernetes: Container Orchestration",
        description:
            "Master containerization, write production Dockerfiles, set up Kubernetes clusters, and deploy scalable microservices.",
        category: "DevOps",
        level: "Advanced",
        status: "Draft",
        students: 0,
        rating: 0,
        reviews: 0,
        duration: "22h 10m",
        lessons: 53,
        revenue: 0,
        thumbnail: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&q=80",
        lastUpdated: "Mar 30, 2026",
        completionRate: 0,
    },
    {
        id: 6,
        title: "React Native: Build iOS & Android Apps",
        description:
            "Create cross-platform mobile applications with React Native, Expo, native APIs, animations, and app store publishing.",
        category: "Mobile",
        level: "Intermediate",
        status: "Published",
        students: 897,
        rating: 4.6,
        reviews: 143,
        duration: "29h 20m",
        lessons: 70,
        revenue: 13455,
        thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80",
        lastUpdated: "Feb 12, 2026",
        completionRate: 55,
    },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<CourseStatus, string> = {
    Published: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 border border-green-200 dark:border-green-800",
    Draft: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border border-gray-200 dark:border-gray-700",
    "Under Review": "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 border border-amber-200 dark:border-amber-700",
};

const LEVEL_STYLES: Record<CourseLevel, string> = {
    Beginner: "text-sky-600 dark:text-sky-400",
    Intermediate: "text-violet-600 dark:text-violet-400",
    Advanced: "text-rose-600 dark:text-rose-400",
};

// ─── Animation Variants ────────────────────────────────────────────────────────

const pageVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

const statVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 120, damping: 18 } },
};

// ─── Sub-components ────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, sub, color }: {
    icon: React.ElementType;
    label: string;
    value: string;
    sub?: string;
    color: string;
}) {
    return (
        <motion.div
            variants={statVariants}
            className="relative overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
        >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{label}</p>
                <p className="text-2xl font-black text-gray-900 dark:text-white leading-tight">{value}</p>
                {sub && <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{sub}</p>}
            </div>
            {/* decorative gradient */}
            <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-linear-to-br from-green-400/10 to-transparent" />
        </motion.div>
    );
}

function CourseCard({ course }: { course: Course }) {
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
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${STATUS_STYLES[course.status]}`}>
                        {course.status}
                    </span>
                </div>

                {/* Level badge */}
                <div className="absolute top-3 right-12">
                    <span className={`text-xs font-bold ${LEVEL_STYLES[course.level]} bg-white/90 dark:bg-gray-900/90 px-2.5 py-1 rounded-full backdrop-blur-sm`}>
                        {course.level}
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
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{course.duration}</span>
                </div>

                {/* Stats */}
                {course.status === "Published" ? (
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                        <div className="text-center">
                            <p className="text-xs text-gray-400 dark:text-gray-500">Students</p>
                            <p className="font-bold text-sm text-gray-900 dark:text-white">{course.students.toLocaleString()}</p>
                        </div>
                        <div className="text-center border-x border-gray-100 dark:border-gray-800">
                            <p className="text-xs text-gray-400 dark:text-gray-500">Rating</p>
                            <p className="font-bold text-sm text-gray-900 dark:text-white flex items-center justify-center gap-0.5">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                {course.rating}
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-gray-400 dark:text-gray-500">Revenue</p>
                            <p className="font-bold text-sm text-green-600 dark:text-green-400">${(course.revenue / 1000).toFixed(1)}k</p>
                        </div>
                    </div>
                ) : (
                    <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                        <p className="text-xs text-gray-400 dark:text-gray-500 italic">
                            {course.status === "Under Review"
                                ? "⏳ Awaiting review by our moderation team"
                                : "✏️ Draft — finish editing before publishing"}
                        </p>
                    </div>
                )}

                {/* Completion bar (published only) */}
                {course.status === "Published" && (
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs font-medium">
                            <span className="text-gray-400 dark:text-gray-500">Completion rate</span>
                            <span className="text-green-600 dark:text-green-400">{course.completionRate}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full rounded-full"
                                style={{ background: "linear-gradient(to right, #074C00, #42A341, #B8E2A3)" }}
                                initial={{ width: 0 }}
                                animate={{ width: `${course.completionRate}%` }}
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
                            variant={course.status === "Draft" ? "outline" : "default"}
                        >
                            Continue Course
                            <ChevronRight className="w-3.5 h-3.5 ml-1" />
                        </Button>
                    </Link>
                    {course.status === "Published" && (
                        <Button size="sm" variant="outline" className="h-9 w-9 p-0 rounded-xl">
                            <BarChart3 className="w-4 h-4" />
                        </Button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function YourCoursesPage() {
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState<"All" | CourseStatus>("All");

    const filters: Array<"All" | CourseStatus> = ["All", "Published", "Draft", "Under Review"];

    const filtered = MOCK_COURSES.filter((c) => {
        const matchSearch =
            c.title.toLowerCase().includes(search.toLowerCase()) ||
            c.category.toLowerCase().includes(search.toLowerCase());
        const matchFilter = activeFilter === "All" || c.status === activeFilter;
        return matchSearch && matchFilter;
    });

    const totalStudents = MOCK_COURSES.reduce((a, c) => a + c.students, 0);
    const totalRevenue = MOCK_COURSES.reduce((a, c) => a + c.revenue, 0);
    const publishedCount = MOCK_COURSES.filter((c) => c.status === "Published").length;
    const avgRating =
        MOCK_COURSES.filter((c) => c.rating > 0).reduce((a, c) => a + c.rating, 0) /
        (MOCK_COURSES.filter((c) => c.rating > 0).length || 1);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black font-sans">
            <Navigation />

            <main className="pt-28 pb-20 container mx-auto">

                {/* ── Page Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10"
                >
                    <div>
                        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-green-600 dark:text-green-400 mb-2">
                            <Zap className="w-3.5 h-3.5" /> Your Teaching Portfolio
                        </div>
                        <h1 className="text-4xl font-black text-gray-900 dark:text-white">
                            My{" "}
                            <span
                                className="text-transparent bg-clip-text"
                                style={{ backgroundImage: "linear-gradient(to right, #074C00, #42A341, #B8E2A3)" }}
                            >
                                Courses
                            </span>
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">
                            Manage, track, and grow all your created content in one place.
                        </p>
                    </div>

                    <Link href="/your-courses/create-course">
                        <Button
                            size="lg"
                            className="h-12 px-6 rounded-2xl font-bold shadow-lg shadow-green-500/20 hover:shadow-green-500/30 transition-all group"
                        >
                            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                            Create New Course
                        </Button>
                    </Link>
                </motion.div>

                {/* ── Stats ── */}
                <motion.div
                    variants={pageVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
                >
                    <StatCard
                        icon={BookOpen}
                        label="Total Courses"
                        value={String(MOCK_COURSES.length)}
                        sub={`${publishedCount} published`}
                        color="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                    />
                    <StatCard
                        icon={Users}
                        label="Total Students"
                        value={totalStudents.toLocaleString()}
                        sub="across all courses"
                        color="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    />
                    <StatCard
                        icon={TrendingUp}
                        label="Total Revenue"
                        value={`$${(totalRevenue / 1000).toFixed(1)}k`}
                        sub="lifetime earnings"
                        color="bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400"
                    />
                    <StatCard
                        icon={Award}
                        label="Avg. Rating"
                        value={avgRating.toFixed(1)}
                        sub="⭐ across reviews"
                        color="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                    />
                </motion.div>

                {/* ── Search & Filters ── */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.4 }}
                    className="flex flex-col sm:flex-row gap-3 mb-8"
                >
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search courses by title or category…"
                            className="pl-11 h-12 rounded-2xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-sm"
                        />
                    </div>

                    {/* Filter pills */}
                    <div className="flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-1.5">
                        <Filter className="w-4 h-4 text-gray-400 ml-2 shrink-0" />
                        {filters.map((f) => (
                            <button
                                key={f}
                                onClick={() => setActiveFilter(f)}
                                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${activeFilter === f
                                    ? "bg-green-600 text-white shadow-sm"
                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* ── Course Grid ── */}
                <AnimatePresence mode="wait">
                    {filtered.length > 0 ? (
                        <motion.div
                            key="grid"
                            variants={pageVariants}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                        >
                            {filtered.map((course) => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-28 text-center"
                        >
                            <div className="w-20 h-20 rounded-3xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-6">
                                <BookOpen className="w-10 h-10" />
                            </div>
                            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">No courses found</h2>
                            <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-8 font-medium">
                                {search
                                    ? `No results for "${search}". Try a different keyword.`
                                    : "You haven't created any courses yet. Start sharing your knowledge!"}
                            </p>
                            <Link href="/create-course">
                                <Button size="lg" className="rounded-2xl font-bold">
                                    <Plus className="w-4 h-4 mr-2" /> Create Your First Course
                                </Button>
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Footer count ── */}
                {filtered.length > 0 && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-center text-sm text-gray-400 dark:text-gray-600 mt-10 font-medium"
                    >
                        Showing {filtered.length} of {MOCK_COURSES.length} courses
                    </motion.p>
                )}
            </main>
        </div>
    );
}
