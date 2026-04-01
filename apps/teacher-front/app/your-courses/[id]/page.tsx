"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Navigation } from "@/components/baseComponets/navBar";

// ─── Feature components ───────────────────────────────────────────────────────
import { CourseHeroCard }    from "@/components/course/CourseHeroCard";
import { SectionCard }       from "@/components/course/SectionCard";
import { CourseSidebar }     from "@/components/course/CourseSidebar";
import { AddSectionDialog }  from "@/components/course/AddSectionDialog";
import type { Section }      from "@/components/course/courseTypes";

// ─── Data ─────────────────────────────────────────────────────────────────────
import { COURSE_DATA, FALLBACK_COURSE } from "@/app/your-courses/[id]/data";

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function CourseDetailPage() {
    const params = useParams();
    const id = String(params?.id ?? "1");
    const course = COURSE_DATA[id] ?? FALLBACK_COURSE;

    // Live-editable title + description
    const [courseInfo, setCourseInfo] = useState({
        title: course.title,
        description: course.description,
    });

    // Local sections state so additions reflect instantly
    const [sections, setSections] = useState<Section[]>(course.sections);

    const addSection = (title: string) => {
        const newSection: Section = {
            id: Date.now(),   // temp ID; replace with server ID after API call
            title,
            lessons: [],
        };
        setSections((prev) => [...prev, newSection]);
    };

    const totalLessons     = sections.reduce((a, s) => a + s.lessons.length, 0);
    const publishedLessons = sections.reduce(
        (a, s) => a + s.lessons.filter((l) => l.status === "published").length,
        0
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black font-sans">
            <Navigation />

            <main className="pt-28 pb-20 container mx-auto px-4 sm:px-6 lg:px-8">

                {/* Back link */}
                <motion.div
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35 }}
                    className="mb-6"
                >
                    <Link
                        href="/your-courses"
                        className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to My Courses
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">

                    {/* ── Left column ── */}
                    <div className="space-y-5">

                        {/* Course info card */}
                        <CourseHeroCard
                            course={course}
                            title={courseInfo.title}
                            description={courseInfo.description}
                            totalLessons={totalLessons}
                            onInfoSave={setCourseInfo}
                        />

                        {/* Curriculum section */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, delay: 0.1 }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h2 className="text-lg font-black text-gray-900 dark:text-white">
                                        Course Curriculum
                                    </h2>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                        {sections.length} sections · {totalLessons} lessons · {publishedLessons} published
                                    </p>
                                </div>
                                <AddSectionDialog onAdd={addSection} />
                            </div>

                            <AnimatePresence mode="popLayout">
                                <div className="space-y-3">
                                    {sections.map((section, idx) => (
                                        <motion.div
                                            key={section.id}
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <SectionCard
                                                section={section}
                                                sectionIndex={idx}
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    {/* ── Right column: Sidebar ── */}
                    <CourseSidebar
                        course={course}
                        totalLessons={totalLessons}
                        publishedLessons={publishedLessons}
                    />
                </div>
            </main>
        </div>
    );
}
