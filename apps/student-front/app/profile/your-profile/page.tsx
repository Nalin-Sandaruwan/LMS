"use client"
import * as React from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/base compo/navigation';
import { Footer } from '@/components/base compo/footer';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from 'next/link';
import { ProfileNav } from '@/components/profile compo/profileNav';
import { StatusGrid } from '@/components/profile compo/statusGrid';
import { EnrolledCourseCard } from '@/components/profile compo/enrolledCourseCard';

// Mock Data
const MOCK_USER = {
    name: "Guest User",
    email: "guest@example.com",
    avatar: "", // Will fallback to initials
    joined: "March 2026",
    role: "Premium Student"
};

const MOCK_ACTIVE_COURSES = [
    {
        id: "1",
        title: "Complete Web Development Bootcamp",
        instructor: "Dr. Angela Yu",
        progress: 45,
        totalLessons: 120,
        completedLessons: 54,
        imageHash: "bg-blue-500",
        lastAccessed: "2 hours ago"
    },
    {
        id: "2",
        title: "Advanced React and Next.js Masterclass",
        instructor: "Wes Bos",
        progress: 82,
        totalLessons: 65,
        completedLessons: 53,
        imageHash: "bg-purple-500",
        lastAccessed: "1 day ago"
    },
    {
        id: "3",
        title: "UI/UX Design with Figma",
        instructor: "Gary Simon",
        progress: 15,
        totalLessons: 40,
        completedLessons: 6,
        imageHash: "bg-pink-500",
        lastAccessed: "3 days ago"
    }
];

export default function ProfileOverviewPage() {
    return (
        <div className="relative flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
            <Navigation />

            <main className="grow pt-24 pb-20">
                {/* 1. Hero Banner Section */}
                <div className="relative w-full h-48 md:h-64 overflow-hidden bg-gray-900 border-b border-gray-800">
                    <motion.div
                        className="absolute inset-0 bg-linear-to-r from-blue-600 via-purple-600 to-indigo-800 opacity-90 mix-blend-multiply"
                        animate={{ filter: ["hue-rotate(0deg)", "hue-rotate(360deg)"] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
                </div>

                {/* 2. Main Profile Content */}
                <div className="container mx-auto px-4 md:px-6 relative -mt-16 z-10">
                    {/* User Header Card */}
                    <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center md:items-end gap-6 mb-12">
                        <Avatar className="w-32 h-32 border-4 border-white dark:border-gray-900 shadow-xl bg-white dark:bg-gray-950 -mt-20 shrink-0">
                            <AvatarFallback className="text-4xl bg-blue-100 text-blue-700 font-black">GU</AvatarFallback>
                        </Avatar>

                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl font-black text-gray-900 dark:text-white">{MOCK_USER.name}</h1>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
                                <span>{MOCK_USER.email}</span>
                                <span>&bull;</span>
                                <span className="text-blue-600 dark:text-blue-400">{MOCK_USER.role}</span>
                                <span>&bull;</span>
                                <span>Joined {MOCK_USER.joined}</span>
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-4 w-full md:w-auto mt-4 md:mt-0">
                            <Button variant="outline" className="w-full md:w-auto font-bold border-gray-300 dark:border-gray-700">Settings</Button>
                            <Button variant="default" className="w-full md:w-auto font-bold shadow-lg shadow-blue-500/25">Edit Profile</Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12">
                        {/* Left Sidebar Menu */}
                        <ProfileNav />

                        {/* Right Main Column */}
                        <div className="lg:col-span-3 space-y-12">

                            {/* Stats Grid */}
                            <StatusGrid />

                            {/* In Progress Courses */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">In Progress</h2>
                                <div className="space-y-4">
                                    {MOCK_ACTIVE_COURSES.map((course, idx) => (
                                        <EnrolledCourseCard key={course.id} course={course} idx={idx} />
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
