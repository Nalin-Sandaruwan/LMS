"use client"
import * as React from 'react';
import { useParams } from 'next/navigation';
import { Navigation } from "@/components/base compo/navigation";
import { Footer } from "@/components/base compo/footer";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

// Expanded Mock Data for the details page
const MOCK_COURSES_DETAILS: Record<string, any> = {
    "1": {
        id: 1,
        title: "Complete Web Development Bootcamp",
        instructor: "Dr. Angela Yu",
        category: "Development",
        level: "Beginner",
        rating: 4.8,
        reviews: "12,450",
        students: "105,230",
        hours: "65 hours",
        price: "$89.99",
        image: "bg-blue-500",
        lastUpdated: "March 2026",
        description: "Welcome to the Complete Web Development Bootcamp, the only course you need to learn to code and become a full-stack web developer. At 65+ hours, this Web Development course is without a doubt the most comprehensive web development course available online. Even if you have zero programming experience, this course will take you from beginner to mastery.",
        whatYouWillLearn: [
            "Build 16 web development projects for your portfolio, ready to apply for junior developer jobs.",
            "Learn the latest technologies, including HTML5, CSS3, ES6+, React, Node.js, and MongoDB.",
            "Build a fully-fledged website and web app for your startup or business.",
            "Master backend development with Node.js and Express."
        ],
        curriculum: [
            { title: "Front-End Web Development", lessons: 45, duration: "15h 30m" },
            { title: "Intermediate JavaScript", lessons: 30, duration: "8h 15m" },
            { title: "React.js Applications", lessons: 55, duration: "20h 45m" },
            { title: "Backend with Node & Express", lessons: 40, duration: "12h 10m" },
            { title: "MongoDB and Mongoose", lessons: 25, duration: "8h 20m" }
        ]
    },
    "2": {
        id: 2,
        title: "Advanced React and Next.js Masterclass",
        instructor: "Wes Bos",
        category: "Engineering",
        level: "Advanced",
        rating: 4.9,
        reviews: "8,120",
        students: "45,000",
        hours: "42 hours",
        price: "$119.99",
        image: "bg-purple-500",
        lastUpdated: "February 2026",
        description: "Take your React skills to the next level. In this masterclass, we dive deep into the inner workings of React, explore advanced hooks, state management paradigms, and fully master the Next.js App Router. This is the definitive guide for engineers wanting to build enterprise-scale applications.",
        whatYouWillLearn: [
            "Master the Next.js App Router and Server Components.",
            "Implement complex state management patterns.",
            "Optimize performance for heavy React applications.",
            "Build and deploy edge-ready full-stack apps."
        ],
        curriculum: [
            { title: "Next.js Architecture", lessons: 15, duration: "5h 30m" },
            { title: "Server Actions Deep Dive", lessons: 20, duration: "7h 15m" },
            { title: "Advanced State & Context", lessons: 18, duration: "6h 45m" },
            { title: "Authentication Strategies", lessons: 12, duration: "4h 10m" }
        ]
    }
};

export default function CourseDetailPage() {
    const params = useParams();
    const id = params?.id as string;

    // If we don't have the specific ID in our mock, we fallback to id 1's data so the preview always works
    const course = MOCK_COURSES_DETAILS[id] || MOCK_COURSES_DETAILS["1"];

    return (
        <div className="relative flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
            <Navigation />

            <main className="grow pt-24">
                {/* Dark Hero Header */}
                <div className="bg-gray-900 dark:bg-black py-16 text-white border-b border-gray-800">
                    <div className="container mx-auto px-4 md:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-4xl"
                        >
                            <div className="flex items-center gap-2 mb-6">
                                <span className="text-blue-400 font-semibold text-sm">
                                    {course.category}
                                </span>
                                <span className="text-gray-500 font-semibold text-sm">&bull;</span>
                                <span className="text-gray-400 font-medium text-sm">
                                    {course.level}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                                {course.title}
                            </h1>

                            <p className="text-lg text-gray-400 mb-8 max-w-3xl line-clamp-2">
                                {course.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
                                <div className="flex items-center gap-1.5 text-yellow-500 font-bold">
                                    <span>{course.rating}</span>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="text-gray-400 font-normal ml-1">({course.reviews} ratings)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
                                    <span>{course.students} students enrolled</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
                                    <span>Last updated {course.lastUpdated}</span>
                                </div>
                            </div>

                            <div className="mt-8 flex items-center gap-4">
                                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center font-bold text-gray-400 border border-gray-700">
                                    {course.instructor.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Created by</p>
                                    <p className="text-sm text-blue-400 font-semibold">{course.instructor}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Course Content Layout */}
                <div className="container mx-auto px-4 md:px-6 py-12">
                    <div className="flex flex-col lg:flex-row gap-12 relative">

                        {/* Main Content Area */}
                        <div className="lg:w-2/3 space-y-12">

                            {/* What you'll learn */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-sm"
                            >
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    What you'll learn
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {course.whatYouWillLearn.map((item: string, i: number) => (
                                        <div key={i} className="flex gap-3">
                                            <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Description */}
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Course Description
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {course.description}
                                </p>
                            </div>

                            {/* Curriculum */}
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Course Content
                                </h2>
                                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4 pb-4 border-b border-gray-200 dark:border-gray-800">
                                    <span>{course.curriculum.length} sections</span>
                                    <span>&bull;</span>
                                    <span>{course.curriculum.reduce((acc: number, cur: any) => acc + cur.lessons, 0)} total lessons</span>
                                    <span>&bull;</span>
                                    <span>{course.hours} total length</span>
                                </div>

                                <div className="space-y-4">
                                    {course.curriculum.map((section: Record<string, any>, idx: number) => (
                                        <div key={idx} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 flex justify-between items-center group cursor-pointer hover:border-blue-500 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                                                    {idx + 1}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                        {section.title}
                                                    </h4>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {section.lessons} lessons
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                {section.duration}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Sticky Card */}
                        <div className="lg:w-1/3">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden sticky top-32 z-10"
                            >
                                <div className={`h-56 w-full ${course.image} relative flex items-center justify-center`}>
                                    {/* Placeholder play button */}
                                    <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:bg-white/40 transition-colors shadow-lg">
                                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="p-8">
                                    <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-6">
                                        {course.price}
                                    </h2>

                                    <Button className="w-full h-12 text-md font-bold mb-4 bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/25">
                                        Add to Cart
                                    </Button>

                                    <Button variant="outline" className="w-full h-12 text-md font-bold mb-6">
                                        Buy Now
                                    </Button>

                                    <p className="text-center text-xs text-gray-500 dark:text-gray-400 mb-6">
                                        30-Day Money-Back Guarantee
                                    </p>

                                    <div className="space-y-4">
                                        <h4 className="font-bold text-gray-900 dark:text-white">This course includes:</h4>
                                        <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                                            <li className="flex items-center gap-3">
                                                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                                {course.hours} on-demand video
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                72 downloadable resources
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                </svg>
                                                Access on mobile and TV
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                                </svg>
                                                Certificate of completion
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
