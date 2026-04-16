"use client"
import * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, Search, ThumbsUp, MessageCircle } from 'lucide-react';

interface LessonInfoProps {
    activeLesson: any;
    completedLessons: string[];
    toggleMarkComplete: (lessonId: string, e?: React.MouseEvent) => void;
    courseData: any;
}

export function LessonInfo({
    activeLesson,
    completedLessons,
    toggleMarkComplete,
    courseData
}: LessonInfoProps) {
    const [activeTab, setActiveTab] = React.useState('overview');

    if (!activeLesson) return null;

    return (
        <div className="mt-8 px-4 md:px-0 mb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                    {activeLesson.title}
                </h2>
                <Button
                    variant={completedLessons.includes(activeLesson.id.toString()) ? "outline" : "default"}
                    onClick={(e) => toggleMarkComplete(activeLesson.id.toString(), e)}
                    className={`font-bold rounded-xl shadow-lg ${completedLessons.includes(activeLesson.id.toString()) ? "border-emerald-500 text-emerald-600 dark:text-emerald-400" : "shadow-blue-500/25"}`}
                >
                    {completedLessons.includes(activeLesson.id.toString()) ? (
                        <><CheckCircle className="w-4 h-4 mr-2" /> Completed</>
                    ) : (
                        <><Circle className="w-4 h-4 mr-2" /> Mark as Complete</>
                    )}
                </Button>
            </div>

            {/* Tabs Implementation */}
            <div className="flex border-b border-gray-200 dark:border-gray-800 space-x-8 mb-6 overflow-x-auto custom-scrollbar">
                {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'qa', label: 'Q&A' },
                    { id: 'notes', label: 'Notes' },
                    { id: 'announcements', label: 'Announcements' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-4 text-sm font-bold whitespace-nowrap transition-colors relative ${activeTab === tab.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
                        )}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="text-gray-600 dark:text-gray-300">
                {activeTab === 'overview' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2">About this lesson</h3>
                            <p className="leading-relaxed">In this comprehensive lesson, we cover the exact structure and fundamentals you need to understand. You'll learn how to implement these concepts directly into your own projects with practical, hands-on examples.</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Instructor</p>
                                <p className="font-bold text-gray-900 dark:text-white">{courseData?.teacher?.fullName || "Expert Instructor"}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Duration</p>
                                <p className="font-bold text-gray-900 dark:text-white">{activeLesson.duration || "15:00"}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Skill Level</p>
                                <p className="font-bold text-gray-900 dark:text-white">Beginner</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Certificate</p>
                                <p className="font-bold text-gray-900 dark:text-white">Yes, on completion</p>
                            </div>
                        </div>
                    </motion.div>
                )}
                {activeTab === 'qa' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-900 dark:text-white">All questions in this lesson</h3>
                            <Button variant="outline" size="sm" className="font-bold">Ask a Question</Button>
                        </div>
                        <div className="relative mb-6">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input type="text" placeholder="Search questions..." className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:border-blue-500 outline-none transition-colors" />
                        </div>
                        {/* Mock Q&A Thread */}
                        <div className="flex gap-4 p-4 border border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-[#0f0f0f]">
                            <div className="w-10 h-10 rounded-full bg-linear-to-tr from-purple-500 to-blue-500 shrink-0 text-white flex items-center justify-center font-bold">A</div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">Alex Johnson <span className="text-gray-400 text-xs font-normal">・ 2 days ago</span></h4>
                                </div>
                                <p className="text-sm mb-3">I'm struggling to understand the exact difference between the two approaches discussed around 03:15. Could someone elaborate?</p>
                                <div className="flex items-center gap-4 text-xs font-bold text-gray-500">
                                    <button className="flex items-center gap-1 hover:text-blue-500 transition-colors"><ThumbsUp className="w-3.5 h-3.5" /> 12</button>
                                    <button className="flex items-center gap-1 hover:text-blue-500 transition-colors"><MessageCircle className="w-3.5 h-3.5" /> 3 Replies</button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
                {['notes', 'announcements'].includes(activeTab) && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8 text-center bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-800">
                        <p className="text-gray-500 font-medium tracking-wide">Nothing here yet.</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
