import React from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../animations";

interface SectionCardProps {
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
    className?: string;
}

/**
 * Reusable card shell with a green icon + title header.
 * Used by ExpertiseBioCard, ContactSocialCard, and TeachingActivityCard.
 */
export function SectionCard({ title, icon: Icon, children, className = "" }: SectionCardProps) {
    return (
        <motion.div
            variants={fadeUp}
            className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 ${className}`}
        >
            <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-600 dark:text-green-400">
                    <Icon className="w-4 h-4" />
                </div>
                <h2 className="font-bold text-gray-900 dark:text-white text-base">{title}</h2>
            </div>
            {children}
        </motion.div>
    );
}
