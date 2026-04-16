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
import { ProfileLayout } from '@/components/profile compo/ProfileLayout';
import { CourseGridProfile } from '@/components/profile compo/courseGridProfile';
import { useUserEnrolledCourses } from '@/app/hooks/api hooks/useEnrolled';

export default function MyCoursesPage() {
    const [activeTab, setActiveTab] = React.useState('all');
    const [searchQuery, setSearchQuery] = React.useState('');

    const { data: enrollments, isLoading } = useUserEnrolledCourses();

    const tabs = [
        { id: 'all', label: 'All Courses' },
        { id: 'in-progress', label: 'In Progress' },
        { id: 'completed', label: 'Completed' },
    ];

    // Map backend enrollment data to UI CourseData format
    const mappedCourses = React.useMemo(() => {
        if (!enrollments) return [];

        return enrollments.map((enrollment: any) => {
            const course = enrollment.course;
            const status = enrollment.status?.toLowerCase();
            const mappedStatus = status === 'completed' ? 'completed' : 'in-progress';

            return {
                id: enrollment.id.toString(),
                courseId: course.id.toString(), // Real course ID for navigation
                title: course.title,
                instructor: course.teacher?.fullName || "Expert Instructor",
                progress: enrollment.progressCalculation || 0,
                totalLessons: course.sections?.reduce((acc: number, sec: any) => acc + (sec.lessons?.length || 0), 0) || 0,
                completedLessons: enrollment.completedLessons?.length || 0,
                imageHash: course.thumbnail ? "" : "bg-linear-to-br from-blue-500 to-indigo-600",
                thumbnail: course.thumbnail,
                lastAccessed: new Date(enrollment.updatedAt).toLocaleDateString(),
                status: mappedStatus,
                certificate: status === 'completed'
            };
        });
    }, [enrollments]);

    const filteredCourses = mappedCourses.filter((course: any) => {
        const matchesTab = activeTab === 'all' || course.status === activeTab;
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <ProfileLayout>
            <div className="space-y-8">
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
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="h-80 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse" />
                        ))}
                    </div>
                ) : filteredCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        <AnimatePresence mode='popLayout'>
                            {filteredCourses.map((course: any, idx: number) => (
                                <CourseGridProfile key={course.id} course={course} idx={idx} />
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
                        <Link href="/all-cource">
                            <Button size="lg" className="rounded-xl font-bold font-lg shadow-lg shadow-blue-500/25">
                                <Compass className="w-5 h-5 mr-2" />
                                Explore Courses
                            </Button>
                        </Link>
                    </motion.div>
                )}
            </div>
        </ProfileLayout>
    );
}


