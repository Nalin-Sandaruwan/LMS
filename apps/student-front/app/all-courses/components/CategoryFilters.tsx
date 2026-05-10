"use client"
import * as React from 'react';
import { motion } from 'framer-motion';

interface CategoryFiltersProps {
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

export function CategoryFilters({ categories, activeCategory, onCategoryChange }: CategoryFiltersProps) {
    return (
        <section className="container mx-auto px-4 md:px-6 mb-12">
            <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                    <motion.button
                        key={cat}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onCategoryChange(cat)}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                            activeCategory === cat
                                ? "bg-blue-600 text-white shadow-md"
                                : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                    >
                        {cat}
                    </motion.button>
                ))}
            </div>
        </section>
    );
}
