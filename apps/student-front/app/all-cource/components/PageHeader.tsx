"use client"
import * as React from 'react';
import { motion } from 'framer-motion';

export function PageHeader() {
    return (
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
    );
}
