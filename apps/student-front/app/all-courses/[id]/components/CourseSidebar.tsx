"use client"
import * as React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, PlayCircle, FileText, Monitor, Award } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Course } from '@/lib/types/course';
import { useCreateEnrollment, useUserEnrolledCourses } from '@/app/hooks/api hooks/useEnrolled';
import { useAuth } from '@/app/hooks/api hooks/useAuth';
import { useRouter } from 'next/navigation';

interface CourseSidebarProps {
    course: Course;
}
export function CourseSidebar({ course }: CourseSidebarProps) {
    const { data: user } = useAuth();
    const router = useRouter();
    const { data: enrollments } = useUserEnrolledCourses(!!user);
    const { mutate: enroll, isPending } = useCreateEnrollment();

    const enrollment = enrollments?.find((e: any) => Number(e.classId) === Number(course.id));
    const isEnrolled = !!enrollment;

    const handleEnroll = () => {
        if (!user) {
            router.push('/login');
            return;
        }

        if (isEnrolled && enrollment) {
            // Logic for "Start Watching" - navigate to player page
            router.push(`/profile/my-courses/${enrollment.id}`);
            return;
        }
        if (course.id) {
            enroll(Number(course.id));
        }
    };

    return (
        <div className="lg:w-1/3">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-xl overflow-hidden sticky top-32 z-10"
            >
                <div className="h-56 w-full relative group cursor-pointer">
                    {course.thumbnail ? (
                        <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-900 flex items-center justify-center">
                            <BookOpen className="w-16 h-16 text-white/40" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg">
                            <PlayCircle className="w-10 h-10 text-white" />
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <p className="absolute bottom-4 left-0 right-0 text-center text-white text-sm font-black">Preview this course</p>
                </div>

                <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <h2 className="text-4xl font-black text-gray-900 dark:text-white">
                            {course.price || "Free"}
                        </h2>
                        {course.price && (
                            <span className="text-gray-400 line-through text-lg font-bold">
                                $199.99
                            </span>
                        )}
                    </div>

                    <div className="space-y-3 mb-8">
                        <Button
                            onClick={handleEnroll}
                            disabled={isPending}
                            className={`w-full h-14 text-base font-black rounded-2xl shadow-lg transition-all duration-300 ${isEnrolled
                                ? "bg-green-600 hover:bg-green-700 shadow-green-600/25"
                                : "bg-blue-600 hover:bg-blue-700 shadow-blue-600/25"
                                } disabled:opacity-70`}
                        >
                            {isPending ? "Processing..." : isEnrolled ? "Start Watching" : "Enroll Now"}
                        </Button>
                    </div>

                    <p className="text-center text-xs text-gray-500 font-bold mb-8">
                        30-Day Money-Back Guarantee
                    </p>

                    <div className="space-y-6">
                        {/* <h4 className="font-black text-gray-900 dark:text-white text-sm uppercase tracking-widest">Includes:</h4> */}
                        {/* <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-300 font-medium">
                            <li className="flex items-center gap-3">
                                <PlayCircle className="w-5 h-5 text-gray-400" />
                                <span>{course.hours || '0'} hours on-demand video</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FileText className="w-5 h-5 text-gray-400" />
                                <span>Full lifetime access</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Monitor className="w-5 h-5 text-gray-400" />
                                <span>Access on mobile and TV</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Award className="w-5 h-5 text-gray-400" />
                                <span>Certificate of completion</span>
                            </li>
                        </ul> */}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
