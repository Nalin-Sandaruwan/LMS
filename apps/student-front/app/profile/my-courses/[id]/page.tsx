"use client"
import * as React from 'react';
import { X, BookOpen } from 'lucide-react';
import Link from 'next/link';

import { useParams } from 'next/navigation';
import { useEnrollmentById, useUpdateEnrollment } from '@/app/hooks/api hooks/useEnrolled';
import { Button } from '@/components/ui/button';

// Modular Components
import { PlayerHeader } from './components/PlayerHeader';
import { VideoArea } from './components/VideoArea';
import { LessonInfo } from './components/LessonInfo';
import { PlayerSidebar } from './components/PlayerSidebar';

export default function CoursePlayerPage() {
    const params = useParams();
    const enrollmentId = params.id as string;

    const { data: enrollment, isLoading, error } = useEnrollmentById(enrollmentId);

    // Application States
    const [expandedSections, setExpandedSections] = React.useState<string[]>([]);
    const [activeLessonState, setActiveLessonState] = React.useState<any>(null);
    const [completedLessons, setCompletedLessons] = React.useState<string[]>([]);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [showSidebar, setShowSidebar] = React.useState(true);

    const courseData = enrollment?.course;
    const sections = courseData?.sections || [];

    // Derive the first available lesson as a fallback to avoid UI flickering/race conditions
    const firstAvailableLesson = React.useMemo(() => {
        if (!sections.length) return null;
        for (const section of sections) {
            if (section.lessons && section.lessons.length > 0) {
                return section.lessons[0];
            }
        }
        return null;
    }, [sections]);

    // effective active lesson (state takes priority, then fallback)
    const activeLesson = activeLessonState || firstAvailableLesson;

    // Initialize state when data is loaded
    React.useEffect(() => {
        if (enrollment?.completedLessons) {
            setCompletedLessons(enrollment.completedLessons);
        }

        if (firstAvailableLesson && !activeLessonState) {
            setExpandedSections(prev => prev.length === 0 ? [sections.find((s: any) => s.lessons?.some((l: any) => l.id === firstAvailableLesson.id))?.id.toString() || ""] : prev);
        }
    }, [enrollment, firstAvailableLesson, activeLessonState, sections]);

    // Derived state
    const totalLessons = sections.reduce((acc: number, sec: any) => acc + (sec.lessons?.length || 0), 0);
    const progressPercentage = totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;

    // Handlers
    const toggleSection = (id: string) => {
        setExpandedSections(prev =>
            prev.includes(id) ? prev.filter((s: string) => s !== id) : [...prev, id]
        );
    };

    const { mutate: updateProgress } = useUpdateEnrollment();

    const toggleMarkComplete = (lessonId: string, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();

        const isCurrentlyCompleted = completedLessons.includes(lessonId);
        const newCompletedLessons = isCurrentlyCompleted
            ? completedLessons.filter(id => id !== lessonId)
            : [...completedLessons, lessonId];

        setCompletedLessons(newCompletedLessons);

        // Update Backend
        updateProgress({
            id: enrollmentId,
            data: { completedLessons: newCompletedLessons }
        });
    };

    const selectLesson = (lesson: any) => {
        setActiveLessonState(lesson);
        setIsPlaying(true);
        // On mobile, auto-close sidebar when playing a new lesson
        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
            setShowSidebar(false);
        }
    };

    // Bunny.net Player event listener
    React.useEffect(() => {
        const handlePlayerMessage = (event: MessageEvent) => {
            // Check origin
            if (event.origin !== "https://iframe.mediadelivery.net") return;

            try {
                const data = JSON.parse(event.data);
                if (data.event === "ended" && activeLesson) {
                    console.log("Video ended, marking as complete:", activeLesson.title);
                    if (!completedLessons.includes(activeLesson.id.toString())) {
                        toggleMarkComplete(activeLesson.id.toString());
                    }
                }
            } catch (err) {
                // Not JSON or other message
            }
        };

        window.addEventListener("message", handlePlayerMessage);
        return () => window.removeEventListener("message", handlePlayerMessage);
    }, [activeLesson, completedLessons, enrollmentId]);

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center bg-white dark:bg-gray-950">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="font-bold text-gray-500 animate-pulse">Loading course content...</p>
                </div>
            </div>
        );
    }

    if (error || !enrollment) {
        return (
            <div className="h-screen flex items-center justify-center bg-white dark:bg-gray-950">
                <div className="text-center space-y-4">
                    <X className="w-16 h-16 text-red-500 mx-auto" />
                    <h2 className="text-2xl font-black">Enrollment not found</h2>
                    <p className="text-gray-500">We couldn't find this enrollment. It may have been removed or you don't have access.</p>
                    <Link href="/profile/my-courses">
                        <Button className="rounded-xl font-bold">Back to My Courses</Button>
                    </Link>
                </div>
            </div>
        );
    }

    // Handle course with no lessons yet
    if (!activeLesson) {
        return (
            <div className="h-screen flex items-center justify-center bg-white dark:bg-gray-950">
                <div className="text-center space-y-4 p-8 max-w-md">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                        <BookOpen className="w-10 h-10 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-black">{courseData?.title || "Course content"}</h2>
                    <p className="text-gray-500 font-medium">This course doesn't have any lessons updated yet. Please check back later or contact the instructor.</p>
                    <Link href="/profile/my-courses">
                        <Button variant="outline" className="rounded-xl font-bold mt-4">Back to My Courses</Button>
                    </Link>
                </div>
            </div>
        );
    }


    return (
        <div className="relative flex flex-col min-h-screen bg-white dark:bg-gray-950 font-sans h-screen overflow-hidden">

            <main className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden pt-24 md:pt-28">
                {/* Main Player Area */}
                <div className="flex-1 overflow-y-auto flex flex-col relative w-full styled-scrollbar">
                    {/* Header */}
                    <PlayerHeader
                        courseTitle={courseData?.title || ""}
                        activeLessonTitle={activeLesson.title}
                        completedCount={completedLessons.length}
                        totalLessons={totalLessons}
                        progressPercentage={progressPercentage}
                        showSidebar={showSidebar}
                        setShowSidebar={setShowSidebar}
                    />

                    <div className="flex-1 p-0 md:p-6 lg:p-8 flex flex-col bg-gray-50 dark:bg-[#0a0a0a]">
                        {/* Player Area */}
                        <VideoArea activeLesson={activeLesson} />

                        {/* Lesson Info & Tabs */}
                        <LessonInfo
                            activeLesson={activeLesson}
                            completedLessons={completedLessons}
                            toggleMarkComplete={toggleMarkComplete}
                            courseData={courseData}
                        />
                    </div>
                </div>

                {/* Sidebar Playlist */}
                <PlayerSidebar
                    showSidebar={showSidebar}
                    setShowSidebar={setShowSidebar}
                    sections={sections}
                    expandedSections={expandedSections}
                    toggleSection={toggleSection}
                    activeLesson={activeLesson}
                    completedLessons={completedLessons}
                    selectLesson={selectLesson}
                    toggleMarkComplete={toggleMarkComplete}
                />

                {/* Mobile Overlay */}
                {showSidebar && (
                    <div
                        className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
                        onClick={() => setShowSidebar(false)}
                    />
                )}
            </main>
        </div>
    );
}
