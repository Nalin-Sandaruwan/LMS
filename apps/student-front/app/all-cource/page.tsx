"use client"
import * as React from 'react';
import { Navigation } from "@/components/base compo/navigation";
import { Footer } from "@/components/base compo/footer";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import Link from 'next/link';

const MOCK_COURSES = [
    {
        id: 1,
        title: "Complete Web Development Bootcamp",
        instructor: "Dr. Angela Yu",
        category: "Development",
        level: "Beginner",
        rating: 4.8,
        reviews: "12k",
        hours: "65",
        price: "$89.99",
        image: "bg-blue-500" // using gradient/color placeholders for now
    },
    {
        id: 2,
        title: "Advanced React and Next.js Masterclass",
        instructor: "Wes Bos",
        category: "Engineering",
        level: "Advanced",
        rating: 4.9,
        reviews: "8k",
        hours: "42",
        price: "$119.99",
        image: "bg-purple-500"
    },
    {
        id: 3,
        title: "UI/UX Design Principles & Figma",
        instructor: "Gary Simon",
        category: "Design",
        level: "Intermediate",
        rating: 4.7,
        reviews: "15k",
        hours: "28",
        price: "$69.99",
        image: "bg-pink-500"
    },
    {
        id: 4,
        title: "Python for Data Science and Machine Learning",
        instructor: "Jose Portilla",
        category: "Data Science",
        level: "Beginner",
        rating: 4.6,
        reviews: "22k",
        hours: "55",
        price: "$94.99",
        image: "bg-emerald-500"
    },
    {
        id: 5,
        title: "Mobile App Development with Flutter",
        instructor: "Maximilian Schwarzmüller",
        category: "Mobile",
        level: "Intermediate",
        rating: 4.8,
        reviews: "10k",
        hours: "35",
        price: "$79.99",
        image: "bg-indigo-500"
    },
    {
        id: 6,
        title: "Cybersecurity Bootcamp: Zero to Hero",
        instructor: "Nathan House",
        category: "Security",
        level: "All Levels",
        rating: 4.5,
        reviews: "5k",
        hours: "48",
        price: "$109.99",
        image: "bg-red-500"
    }
];

const categories = ["All", "Development", "Design", "Data Science", "Mobile", "Security"];

export default function AllCoursesPage() {
    const [activeCategory, setActiveCategory] = React.useState("All");

    const filteredCourses = MOCK_COURSES.filter(course =>
        activeCategory === "All" || course.category === activeCategory
    );

    return (
        <div className="relative flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
            <Navigation />

            <main className="grow pt-32 pb-24">
                {/* Page Header */}
                <section className="container mx-auto px-4 md:px-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                            Explore Our <span className="text-blue-600 dark:text-blue-400">Courses</span>
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            Join millions of learners from around the world. Find the right course for you and take the next step in your career.
                        </p>
                    </motion.div>
                </section>

                {/* Filter Bar */}
                <section className="container mx-auto px-4 md:px-6 mb-12">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <motion.button
                                key={cat}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat
                                        ? "bg-blue-600 text-white shadow-md"
                                        : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    }`}
                            >
                                {cat}
                            </motion.button>
                        ))}
                    </div>
                </section>

                {/* Courses Grid */}
                <section className="container mx-auto px-4 md:px-6">
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredCourses.map((course, idx) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                key={course.id}
                                className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-shadow group flex flex-col"
                            >
                                {/* Course Thumbnail */}
                                <div className={`h-48 w-full ${course.image} relative overflow-hidden`}>
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                    {/* Decorative gradient inside thumbnail */}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                                    <span className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                                        {course.level}
                                    </span>
                                </div>

                                {/* Course Details */}
                                <div className="p-6 flex flex-col grow">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-md">
                                            {course.category}
                                        </span>
                                        <div className="flex items-center text-yellow-500 text-xs font-bold gap-1 ml-auto">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            {course.rating} ({course.reviews})
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                                        {course.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-1">
                                        By {course.instructor}
                                    </p>

                                    <div className="mt-auto border-t border-gray-100 dark:border-gray-800 pt-4 flex items-center justify-between">
                                        <div className="text-2xl font-black text-gray-900 dark:text-white">
                                            {course.price}
                                        </div>
                                        <Button variant="default" asChild>
                                            <Link href={`/all-cource/${course.id}`}>Enroll Now</Link>
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {filteredCourses.length === 0 && (
                        <div className="text-center py-24 text-gray-500 dark:text-gray-400">
                            No courses found for this category.
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
}
