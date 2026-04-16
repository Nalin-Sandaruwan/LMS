"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
    BookOpen,
    Users,
    Plus,
    Search,
    Filter,
    TrendingUp,
    Award,
    Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Navigation } from "@/components/baseComponets/navBar";
import ProtectedRoute from "@/hooks/ProtectedRoute";

import { useCourses } from "@/hooks/useCourses";
import { CourseStatus } from "@/components/your-courses/types";
import { StatCard } from "@/components/your-courses/StatCard";
import { CourseCard } from "@/components/your-courses/CourseCard";

// ─── Animation Variants ────────────────────────────────────────────────────────

const pageVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function YourCoursesPage() {
    const { data: courses = [], isLoading } = useCourses();
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState<"Approved" | "Not Approved">("Approved");

    const filters: Array<"Approved" | "Not Approved"> = ["Approved", "Not Approved"];

    const filtered = courses.filter((c) => {
        const matchSearch =
            (c.title || "").toLowerCase().includes(search.toLowerCase()) ||
            (c.category || "").toLowerCase().includes(search.toLowerCase());

        // Ensure safe boolean comparison in case the backend returns 1/0, string 'true', or if it's implicitly true
        const isActiveVal = c.isActive === true;
        const matchFilter = activeFilter === "Approved" ? isActiveVal : !isActiveVal;

        return matchSearch && matchFilter;
    });

    const totalStudents = courses.reduce((a, c) => a + (c.students || 0), 0);
    const totalRevenue = courses.reduce((a, c) => a + (c.revenue || 0), 0);
    const publishedCount = courses.filter((c) => c.isActive === true).length;
    const avgRating =
        courses.filter((c) => (c.rating || 0) > 0).reduce((a, c) => a + (c.rating || 0), 0) /
        (courses.filter((c) => (c.rating || 0) > 0).length || 1);

    return (
        <ProtectedRoute>
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

                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="mt-4 text-gray-500 font-medium">Loading your courses...</p>
                        </div>
                    ) : (
                        <>
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
                                    value={String(courses.length)}
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
                                    Showing {filtered.length} of {courses.length} courses
                                </motion.p>
                            )}
                        </>
                    )}
                </main>
            </div>
        </ProtectedRoute>
    );
}
