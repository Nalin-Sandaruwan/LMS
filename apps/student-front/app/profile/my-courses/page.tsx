"use client"
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from '@/components/base compo/navigation';
import { Footer } from '@/components/base compo/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProfileNav } from '@/components/profile compo/profileNav';
import { BookOpen, Search, Filter, PlayCircle, CheckCircle, Clock, Award, MoreVertical, Compass } from 'lucide-react';
import Link from 'next/link';
import { CourseGridProfile } from '@/components/profile compo/courseGridProfile';
// Mock Data
const MOCK_COURSES = [
    {
        id: "1",
        title: "Complete Web Development Bootcamp",
        instructor: "Dr. Angela Yu",
        progress: 45,
        totalLessons: 120,
        completedLessons: 54,
        imageHash: "bg-linear-to-br from-blue-500 to-indigo-600",
        lastAccessed: "2 hours ago",
        status: "in-progress"
    },
    {
        id: "2",
        title: "Advanced React and Next.js Masterclass",
        instructor: "Wes Bos",
        progress: 82,
        totalLessons: 65,
        completedLessons: 53,
        imageHash: "bg-linear-to-br from-purple-500 to-pink-600",
        lastAccessed: "1 day ago",
        status: "in-progress"
    },
    {
        id: "3",
        title: "UI/UX Design with Figma",
        instructor: "Gary Simon",
        progress: 15,
        totalLessons: 40,
        completedLessons: 6,
        imageHash: "bg-linear-to-br from-pink-500 to-rose-600",
        lastAccessed: "3 days ago",
        status: "in-progress"
    },
    {
        id: "4",
        title: "Python for Data Science and Machine Learning",
        instructor: "Jose Portilla",
        progress: 100,
        totalLessons: 85,
        completedLessons: 85,
        imageHash: "bg-linear-to-br from-emerald-400 to-teal-600",
        lastAccessed: "2 weeks ago",
        status: "completed",
        certificate: true
    },
    {
        id: "5",
        title: "The Ultimate Drawing Course - Beginner to Advanced",
        instructor: "Jaysen Batchelor",
        progress: 100,
        totalLessons: 45,
        completedLessons: 45,
        imageHash: "bg-linear-to-br from-orange-400 to-red-500",
        lastAccessed: "1 month ago",
        status: "completed",
        certificate: true
    },
    {
        id: "6",
        title: "iOS 17 & Swift 5 - The Complete iOS App Development Bootcamp",
        instructor: "Dr. Angela Yu",
        progress: 2,
        totalLessons: 240,
        completedLessons: 4,
        imageHash: "bg-linear-to-br from-cyan-400 to-blue-500",
        lastAccessed: "2 months ago",
        status: "in-progress"
    }
];

export default function MyCoursesPage() {
    const [activeTab, setActiveTab] = React.useState('all');
    const [searchQuery, setSearchQuery] = React.useState('');

    const tabs = [
        { id: 'all', label: 'All Courses' },
        { id: 'in-progress', label: 'In Progress' },
        { id: 'completed', label: 'Completed' },
    ];

    const filteredCourses = MOCK_COURSES.filter(course => {
        const matchesTab = activeTab === 'all' || course.status === activeTab;
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <div className="relative flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
            <Navigation />

            <main className="grow pt-24 pb-20">
                {/* Hero Banner Section (Condensed for internal pages) */}
                <div className="relative w-full h-32 md:h-48 overflow-hidden bg-gray-900 border-b border-gray-800">
                    <motion.div
                        className="absolute inset-0 bg-linear-to-r from-blue-600 via-purple-600 to-indigo-800 opacity-90 mix-blend-multiply"
                        animate={{ filter: ["hue-rotate(0deg)", "hue-rotate(360deg)"] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
                </div>

                <div className="container mx-auto px-4 md:px-6 relative -mt-8 z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12">
                        {/* Left Sidebar Menu */}
                        <ProfileNav />

                        {/* Right Main Column */}
                        <div className="lg:col-span-3 space-y-8">

                            {/* Page Header */}
                            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                                        <BookOpen className="w-8 h-8 text-blue-500" />
                                        My Courses
                                    </h1>
                                    <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Manage your enrolled courses and track your learning progress.</p>
                                </div>
                                <div className="flex gap-3 w-full md:w-auto">
                                    <div className="relative flex-1 md:w-64">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            placeholder="Search courses..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-9 w-full bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-xl"
                                        />
                                    </div>
                                    <Button variant="outline" className="shrink-0 border-gray-200 dark:border-gray-800 rounded-xl font-bold">
                                        <Filter className="w-4 h-4 mr-2" />
                                        Filter
                                    </Button>
                                </div>
                            </div>

                            {/* Tabs Navigation */}
                            <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-px">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`px-5 py-3 text-sm font-bold transition-all relative ${activeTab === tab.id
                                            ? 'text-blue-600 dark:text-blue-400'
                                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-t-xl'
                                            }`}
                                    >
                                        {tab.label}
                                        {activeTab === tab.id && (
                                            <motion.div
                                                layoutId="activeTabBottom"
                                                className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-500"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Course Grid */}
                            {filteredCourses.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                    <AnimatePresence mode='popLayout'>
                                        {filteredCourses.map((course, idx) => (
                                            <CourseGridProfile key={course.id} course={course as any} idx={idx} />
                                        ))}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                /* Empty State */
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-white dark:bg-gray-900 border border-dashed border-gray-300 dark:border-gray-700 rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[400px]"
                                >
                                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                                        <Compass className="w-10 h-10 text-gray-400" />
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">No courses found</h3>
                                    <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8 font-medium">
                                        {searchQuery
                                            ? "We couldn't find any courses matching your search. Try different keywords or clear the filters."
                                            : "You haven't enrolled in any courses yet. Explore our catalog and start learning today!"}
                                    </p>
                                    <Button size="lg" className="rounded-xl font-bold font-lg shadow-lg shadow-blue-500/25">
                                        <Compass className="w-5 h-5 mr-2" />
                                        Explore Courses
                                    </Button>
                                </motion.div>
                            )}

                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
