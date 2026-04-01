"use client"
import * as React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, Clock, Award } from "lucide-react";

export const MOCK_STATS = [
    { label: "Active Courses", value: "3", icon: <BookOpen className="w-9 h-9 text-blue-500" strokeWidth={1.5} />, color: "blue" },
    { label: "Completed Courses", value: "12", icon: <CheckCircle className="w-9 h-9 text-green-500" strokeWidth={1.5} />, color: "green" },
    { label: "Learning Hours", value: "84h", icon: <Clock className="w-9 h-9 text-purple-500" strokeWidth={1.5} />, color: "purple" },
    { label: "Certificates", value: "5", icon: <Award className="w-9 h-9 text-amber-500" strokeWidth={1.5} />, color: "amber" },
];

export function StatusGrid() {
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {MOCK_STATS.map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm flex flex-col items-center justify-center text-center group hover:border-blue-500 transition-all cursor-pointer"
                    >
                        <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{stat.icon}</div>
                        <h4 className="text-3xl font-black text-gray-900 dark:text-white">{stat.value}</h4>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">{stat.label}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
