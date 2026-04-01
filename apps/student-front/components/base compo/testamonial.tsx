"use client"
import * as React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
    {
        id: 1,
        name: "Sarah Jenkins",
        role: "Software Engineer @ TechCorp",
        content: "TechLMS completely changed my career trajectory. The courses are practical, well-structured, and taught by genuine industry experts. I landed my dream job within weeks of finishing the React path.",
        initials: "SJ",
        color: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
    },
    {
        id: 2,
        name: "David Chen",
        role: "Freelance Designer",
        content: "The UI/UX design masterclass is easily the best investment I've made this year. The platform itself is so gorgeously designed that just using it teaches you good design principles.",
        initials: "DC",
        color: "bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400"
    },
    {
        id: 3,
        name: "Elena Rodriguez",
        role: "Computer Science Student",
        content: "As a university student, I found these courses to be the perfect bridge between academic theory and actual industry practice. Highly recommend for anyone looking to upskill quickly.",
        initials: "ER",
        color: "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400"
    }
];

export function Testimonials() {
    return (
        <section className="py-24 bg-blue-50 dark:bg-gray-900/50 relative overflow-hidden mt-12 mb-12">
            {/* Glow Effects */}
            <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] -z-10 -translate-y-1/2" />
            <div className="absolute bottom-0 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-2"
                    >
                        Student Success
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white"
                    >
                        Loved by learners <br className="hidden md:block" /> worldwide.
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, idx) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.15 }}
                            whileHover={{ y: -5 }}
                            className="bg-white dark:bg-gray-950 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all"
                        >
                            {/* Rating Stars */}
                            <div className="flex gap-1 mb-6">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                &ldquo;{testimonial.content}&rdquo;
                            </p>

                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${testimonial.color}`}>
                                    {testimonial.initials}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
