"use client"
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Menu } from 'lucide-react';
import Link from 'next/link';

interface PlayerHeaderProps {
    courseTitle: string;
    activeLessonTitle: string;
    completedCount: number;
    totalLessons: number;
    progressPercentage: number;
    showSidebar: boolean;
    setShowSidebar: (show: boolean) => void;
}

export function PlayerHeader({
    courseTitle,
    activeLessonTitle,
    completedCount,
    totalLessons,
    progressPercentage,
    showSidebar,
    setShowSidebar
}: PlayerHeaderProps) {
    return (
        <div className="sticky top-0 z-30 bg-white/90 dark:bg-gray-950/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 px-4 md:px-6 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4">
                <Link href="/profile/my-courses">
                    <Button variant="ghost" size="icon" className="shrink-0 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                        <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </Button>
                </Link>
                <div className="hidden md:block border-l border-gray-300 dark:border-gray-700 h-6"></div>
                <div>
                    <h1 className="font-bold text-gray-900 dark:text-white text-base md:text-lg leading-tight line-clamp-1">
                        {courseTitle}
                    </h1>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Playing: {activeLessonTitle}</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Progress Circular indicator details */}
                <div className="hidden sm:flex items-center gap-3">
                    <div className="flex flex-col items-end">
                        <span className="text-xs font-bold text-gray-900 dark:text-white">Your Progress</span>
                        <span className="text-[10px] text-gray-500 font-bold uppercase">{completedCount} of {totalLessons} completed</span>
                    </div>
                    <div className="relative w-10 h-10 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            <path className="text-gray-200 dark:text-gray-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                            <path
                                className="text-emerald-500 transition-all duration-1000 ease-out"
                                strokeDasharray={`${progressPercentage}, 100`}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            {progressPercentage === 100
                                ? <CheckCircle className="w-4 h-4 text-emerald-500" />
                                : <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300">{progressPercentage}%</span>
                            }
                        </div>
                    </div>
                </div>

                {/* Toggle Sidebar Button */}
                <Button
                    variant={showSidebar ? "secondary" : "outline"}
                    onClick={() => setShowSidebar(!showSidebar)}
                    className="hidden lg:flex font-bold rounded-xl"
                >
                    {showSidebar ? "Collapse Contents" : "Show Contents"}
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowSidebar(!showSidebar)}
                    className="lg:hidden rounded-xl"
                >
                    <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </Button>
            </div>
        </div>
    );
}
