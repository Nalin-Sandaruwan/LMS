"use client"
import * as React from 'react';
import { motion } from 'framer-motion';

export function HeroBackground() {
    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
            {/* Subtle peach/orange glow on the left */}
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[#FFF0E5] dark:bg-[#FF7A45] rounded-full blur-[100px] opacity-60 dark:opacity-[0.07] transition-all" />

            {/* Subtle blue glow on the right */}
            <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[#EEF2FF] dark:bg-[#4F46E5] rounded-full blur-[100px] opacity-60 dark:opacity-[0.07] transition-all" />

            {/* Large decorative circles on the right */}
            <motion.div
                animate={{ x: [0, 20, -10, 0], y: [0, -15, 15, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-32 -right-32 w-[800px] h-[800px] rounded-full border border-gray-200 dark:border-gray-800 transition-colors duration-300"
            />
            <motion.div
                animate={{ x: [0, -15, 10, 0], y: [0, 15, -10, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-16 right-16 w-[500px] h-[500px] rounded-full border border-gray-200 dark:border-gray-800 transition-colors duration-300"
            />

            {/* Orange Stars/Sparkles */}
            <motion.svg
                animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-60 right-[35%] w-8 h-8 text-[#FF7A45] dark:text-[#FF9A76] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" />
            </motion.svg>
            <motion.svg
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-48 right-[25%] w-6 h-6 text-[#FF7A45] dark:text-[#FF9A76] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" />
            </motion.svg>
            <motion.svg
                animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-80 right-[15%] w-10 h-10 text-[#FF7A45] dark:text-[#FF9A76] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" />
            </motion.svg>
        </div>
    );
}
