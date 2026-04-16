"use client"
import * as React from 'react';
import { motion } from 'framer-motion';
import { Zap, Flame, Calendar, TrendingUp } from 'lucide-react';

export function LearningActivity() {
    // Mock data for learning activity
    const weeklyActivity = [
        { day: 'Mon', hours: 2.5, intensity: 60 },
        { day: 'Tue', hours: 4.0, intensity: 90 },
        { day: 'Wed', hours: 1.5, intensity: 40 },
        { day: 'Thu', hours: 3.2, intensity: 75 },
        { day: 'Fri', hours: 5.0, intensity: 100 },
        { day: 'Sat', hours: 0.5, intensity: 20 },
        { day: 'Sun', hours: 0, intensity: 0 },
    ];

    return (
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-500" />
                        Learning Momentum
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Your progress over the last 7 days</p>
                </div>
                <div className="bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 px-3 py-1.5 rounded-xl flex items-center gap-2 font-black text-sm">
                    <Flame className="w-4 h-4 fill-current" />
                    5 DAY STREAK
                </div>
            </div>

            <div className="grid grid-cols-7 gap-2 md:gap-4 h-40 items-end mb-6">
                {weeklyActivity.map((item, idx) => (
                    <div key={item.day} className="flex flex-col items-center gap-3 h-full justify-end">
                        <div className="relative group w-full flex flex-col items-center justify-end h-full">
                            {/* Tooltip mockup */}
                            <div className="absolute -top-10 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                                {item.hours} hrs
                            </div>
                            {/* Bar */}
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${item.intensity}%` }}
                                transition={{ duration: 1, delay: idx * 0.1, ease: [0.23, 1, 0.32, 1] }}
                                className={`w-full max-w-[32px] rounded-t-lg transition-colors ${
                                    item.intensity > 80 
                                    ? 'bg-blue-600 dark:bg-blue-500' 
                                    : item.intensity > 40 
                                    ? 'bg-blue-400 dark:bg-blue-400/60' 
                                    : 'bg-gray-200 dark:bg-gray-800'
                                }`}
                            />
                        </div>
                        <span className="text-[10px] md:text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{item.day}</span>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-500/10 rounded-xl flex items-center justify-center">
                        <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Total Time</p>
                        <p className="text-lg font-black text-gray-900 dark:text-white leading-none">16.7 hrs</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-50 dark:bg-purple-500/10 rounded-xl flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Focus Score</p>
                        <p className="text-lg font-black text-gray-900 dark:text-white leading-none">84%</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
