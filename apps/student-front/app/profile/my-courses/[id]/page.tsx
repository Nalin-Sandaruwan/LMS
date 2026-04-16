"use client"
import * as React from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';

import { useParams } from 'next/navigation';
import { useEnrollmentById, useUpdateEnrollment } from '@/app/hooks/api hooks/useEnrolled';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/base compo/navigation';

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
    const [activeLesson, setActiveLesson] = React.useState<any>(null);
    const [completedLessons, setCompletedLessons] = React.useState<string[]>([]);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [showSidebar, setShowSidebar] = React.useState(true);

    const courseData = enrollment?.course;

    // Initialize state when data is loaded
    React.useEffect(() => {
        if (enrollment?.completedLessons) {
            setCompletedLessons(enrollment.completedLessons);
        }

        if (courseData?.sections && courseData.sections.length > 0) {
            const firstSection = courseData.sections[0];
            if (firstSection.lessons && firstSection.lessons.length > 0) {
                if (!activeLesson) {
                    setActiveLesson(firstSection.lessons[0]);
                }
                setExpandedSections(prev => prev.length === 0 ? [firstSection.id.toString()] : prev);
            }
        }
    }, [courseData, enrollment]);

    // Derived state
    const sections = courseData?.sections || [];
    const totalLessons = sections.reduce((acc: number, sec: any) => acc + (sec.lessons?.length || 0), 0);
    const progressPercentage = totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;

    // Handlers
    const toggleSection = (id: string) => {
        setExpandedSections(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
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
        setActiveLesson(lesson);
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

    if (error || !enrollment || !activeLesson) {
        return (
            <div className="h-screen flex items-center justify-center bg-white dark:bg-gray-950">
                <div className="text-center space-y-4">
                    <X className="w-16 h-16 text-red-500 mx-auto" />
                    <h2 className="text-2xl font-black">Course not found</h2>
                    <p className="text-gray-500">We couldn't load the course content. Please try again later.</p>
                    <Link href="/profile/my-courses">
                        <Button className="rounded-xl font-bold">Back to My Courses</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="relative flex flex-col min-h-screen bg-white dark:bg-gray-950 font-sans h-screen overflow-hidden">
            <div className="z-50 border-b border-gray-200 dark:border-gray-800">
                <Navigation />
            </div>

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
