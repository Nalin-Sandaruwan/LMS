"use client"
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from '@/components/base compo/navigation';
import { Button } from '@/components/ui/button';

import {
    PlayCircle, CheckCircle, Circle, FileText, Code,
    ChevronDown, ChevronUp, Play, Pause, Volume2,
    Maximize, SkipBack, SkipForward, Settings, Menu, X, ArrowLeft,
    MessageCircle, FileWarning, Search, ThumbsUp
} from 'lucide-react';
import Link from 'next/link';

// Detailed Mock Course Data
const MOCK_COURSE = {
    id: "1",
    title: "Complete Web Development Bootcamp",
    instructor: "Dr. Angela Yu",
    sections: [
        {
            id: "sec_1",
            title: "1. Introduction to the Course",
            lessons: [
                { id: "les_1", title: "Welcome to the Course", duration: "05:30", type: "video" },
                { id: "les_2", title: "How to get the most out of this course", duration: "12:15", type: "video" },
                { id: "les_3", title: "Course Syllabus and Downloads", duration: "02:00", type: "document" },
            ]
        },
        {
            id: "sec_2",
            title: "2. HTML 5 - Structuring the Web",
            lessons: [
                { id: "les_4", title: "HTML Anatomy and the First Webpage", duration: "08:45", type: "video" },
                { id: "les_5", title: "HTML Elements and Attributes", duration: "15:20", type: "video" },
                { id: "les_6", title: "Coding Exercise: HTML Setup", duration: "10:00", type: "exercise" },
                { id: "les_7", title: "Lists, Tables, and Forms", duration: "22:15", type: "video" },
            ]
        },
        {
            id: "sec_3",
            title: "3. CSS 3 - Styling the Web",
            lessons: [
                { id: "les_8", title: "CSS Selectors", duration: "20:10", type: "video" },
                { id: "les_9", title: "The Box Model Explaination", duration: "18:30", type: "video" },
                { id: "les_10", title: "Flexbox Fundamentals", duration: "25:00", type: "video" },
                { id: "les_11", title: "CSS Grid layout approach", duration: "21:40", type: "video" },
            ]
        },
        {
            id: "sec_4",
            title: "4. JavaScript - Behavior",
            lessons: [
                { id: "les_12", title: "Variables and Data Types", duration: "15:10", type: "video" },
                { id: "les_13", title: "Functions and Scope", duration: "18:25", type: "video" },
                { id: "les_14", title: "Arrays and Objects", duration: "24:00", type: "video" },
            ]
        }
    ]
};

export default function CoursePlayerPage() {
    // Application States
    const [expandedSections, setExpandedSections] = React.useState<string[]>(['sec_1', 'sec_2']);
    const [activeLesson, setActiveLesson] = React.useState(MOCK_COURSE.sections[0].lessons[0]);
    const [completedLessons, setCompletedLessons] = React.useState<string[]>(['les_1', 'les_2']);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [showSidebar, setShowSidebar] = React.useState(true);
    const [activeTab, setActiveTab] = React.useState('overview');

    // Derived state
    const totalLessons = MOCK_COURSE.sections.reduce((acc, sec) => acc + sec.lessons.length, 0);
    const progressPercentage = Math.round((completedLessons.length / totalLessons) * 100);

    // Handlers
    const toggleSection = (id: string) => {
        setExpandedSections(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    const toggleMarkComplete = (lessonId: string, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent launching the video if just ticking checkbox
        setCompletedLessons(prev =>
            prev.includes(lessonId) ? prev.filter(id => id !== lessonId) : [...prev, lessonId]
        );
    };

    const selectLesson = (lesson: any) => {
        setActiveLesson(lesson);
        setIsPlaying(true);
        // On mobile, auto-close sidebar when playing a new lesson
        if (window.innerWidth < 1024) {
            setShowSidebar(false);
        }
    };

    return (
        <div className="relative flex flex-col min-h-screen bg-white dark:bg-gray-950 font-sans h-screen overflow-hidden">
            {/* Keeping Global Navigation at top but allowing App to take remaining space */}
            <div className="z-50 border-b border-gray-200 dark:border-gray-800">
                <Navigation />
            </div>

            <main className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden pt-24 md:pt-28">

                {/* Left/Main Column - Video & Info */}
                <div className="flex-1 overflow-y-auto flex flex-col relative w-full styled-scrollbar">

                    {/* Sticky Course Header */}
                    <div className="sticky top-0 z-30 bg-white/90 dark:bg-gray-950/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 px-4 md:px-6 py-3 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-4">
                            <Link href="/profile/my-courses">
                                <Button variant="ghost" size="icon" className="shrink-0 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                                    <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                </Button>
                            </Link>
                            <div className="hidden md:block border-l border-gray-300 dark:border-gray-700 h-6"></div>
                            <div>
                                <h1 className="font-bold text-gray-900 dark:text-white text-base md:text-lg leading-tight line-clamp-1">
                                    {MOCK_COURSE.title}
                                </h1>
                                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Playing: {activeLesson.title}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Progress Circular indicator details */}
                            <div className="hidden sm:flex items-center gap-3">
                                <div className="flex flex-col items-end">
                                    <span className="text-xs font-bold text-gray-900 dark:text-white">Your Progress</span>
                                    <span className="text-[10px] text-gray-500 font-bold uppercase">{completedLessons.length} of {totalLessons} completed</span>
                                </div>
                                <div className="relative w-10 h-10 flex items-center justify-center">
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                        <path className="text-gray-200 dark:text-gray-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                                        <path
                                            className="text-emerald-500 transition-all duration-1000 ease-out"
                                            strokeDasharray={`${progressPercentage}, 100`}
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        {progressPercentage === 100
                                            ? <CheckCircle className="w-4 h-4 text-emerald-500" />
                                            : <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300">{progressPercentage}%</span>
                                        }
                                    </div>
                                </div>
                            </div>

                            {/* Toggle Sidebar Button */}
                            <Button
                                variant={showSidebar ? "secondary" : "outline"}
                                onClick={() => setShowSidebar(!showSidebar)}
                                className="hidden lg:flex font-bold rounded-xl"
                            >
                                {showSidebar ? "Collapse Contents" : "Show Contents"}
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setShowSidebar(!showSidebar)}
                                className="lg:hidden rounded-xl"
                            >
                                <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                            </Button>
                        </div>
                    </div>

                    <div className="flex-1 p-0 md:p-6 lg:p-8 flex flex-col bg-gray-50 dark:bg-[#0a0a0a]">
                        {/* Video Player Showcase Area */}
                        <div className="relative w-full aspect-video bg-black md:rounded-2xl overflow-hidden shadow-2xl group flex flex-col justify-end shrink-0 border border-gray-900">
                            {/* Abstract Video Background */}
                            <div className="absolute inset-0 bg-linear-to-br from-gray-900 to-black">
                                <motion.div
                                    className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-transparent to-transparent"
                                    animate={{
                                        scale: isPlaying ? [1, 1.2, 1] : 1,
                                        opacity: isPlaying ? [0.4, 0.6, 0.4] : 0.4
                                    }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                />
                                {isPlaying && (
                                    <div className="absolute inset-0 flex items-center justify-center opacity-30 mix-blend-overlay">
                                        {/* Mock code overlay to simulate learning content */}
                                        <pre className="text-[8px] md:text-sm text-green-400 font-mono tracking-widest pointer-events-none animate-pulse">
                                            {`function initializeComponent() {\n  console.log("Welcome to ${activeLesson.title}");\n  const isReady = true;\n  if(isReady) {\n    startLearning();\n  }\n}`}
                                        </pre>
                                    </div>
                                )}
                            </div>

                            {/* Play/Pause Giant Status UI */}
                            {!isPlaying && (
                                <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/50 backdrop-blur-sm transition-all" onClick={() => setIsPlaying(true)}>
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="flex flex-col items-center cursor-pointer group/btn"
                                    >
                                        <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-600/90 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.6)] transform transition-transform group-hover/btn:scale-110">
                                            <Play className="w-10 h-10 md:w-12 md:h-12 text-white ml-2" fill="currentColor" />
                                        </div>
                                        <p className="text-white mt-6 font-bold text-lg tracking-wide hidden md:block opacity-0 group-hover/btn:opacity-100 transition-opacity">Resume Learning</p>
                                    </motion.div>
                                </div>
                            )}

                            {/* Hover Controls Overlay */}
                            <div className={`relative z-20 bg-linear-to-t from-black/90 via-black/40 to-transparent p-4 md:p-6 transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                                {/* Progress Bar */}
                                <div className="w-full h-1.5 bg-white/20 rounded-full mb-6 cursor-pointer relative group/progress">
                                    <div className="absolute inset-y-0 left-0 bg-blue-500 rounded-full w-2/5"></div>
                                    <div className="absolute top-1/2 -translate-y-1/2 left-2/5 w-4 h-4 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transform -translate-x-2 transition-all shadow-[0_0_10px_rgba(255,255,255,0.8)] z-10"></div>
                                </div>

                                {/* Buttons Row */}
                                <div className="flex items-center justify-between text-white">
                                    <div className="flex items-center space-x-4 md:space-x-6">
                                        <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-blue-400 transition-colors focus:outline-hidden">
                                            {isPlaying ? <Pause className="w-7 h-7" fill="currentColor" /> : <Play className="w-7 h-7" fill="currentColor" />}
                                        </button>
                                        <div className="flex items-center space-x-3 hidden sm:flex text-gray-300">
                                            <SkipBack className="w-5 h-5 hover:text-white transition cursor-pointer" />
                                            <SkipForward className="w-5 h-5 hover:text-white transition cursor-pointer" />
                                        </div>
                                        <div className="flex items-center space-x-3 text-gray-300 group/vol">
                                            <Volume2 className="w-5 h-5 hover:text-white transition cursor-pointer" />
                                            <div className="w-0 sm:w-20 overflow-hidden sm:group-hover/vol:w-20 sm:opacity-0 sm:group-hover/vol:opacity-100 transition-all duration-300">
                                                <div className="h-1 bg-white/30 rounded-full w-full">
                                                    <div className="w-2/3 h-full bg-white rounded-full"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-sm font-medium font-mono tracking-wider ml-2 md:ml-4 text-gray-200">
                                            {isPlaying ? "04:15" : "00:00"} <span className="text-gray-500 mx-1">/</span> {activeLesson.duration}
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 md:space-x-6 text-gray-300">
                                        <div className="px-2 py-0.5 border border-white/20 rounded text-xs font-bold hidden sm:block">HD</div>
                                        <Settings className="w-5 h-5 hover:text-white transition cursor-pointer hidden sm:block" />
                                        <Maximize className="w-5 h-5 hover:text-white transition cursor-pointer" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Under Video Tabs Zone */}
                        <div className="mt-8 px-4 md:px-0 mb-12">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                                    {activeLesson.title}
                                </h2>
                                {/* Mark Complete Button Alternative */}
                                <Button
                                    variant={completedLessons.includes(activeLesson.id) ? "outline" : "default"}
                                    onClick={(e) => toggleMarkComplete(activeLesson.id, e)}
                                    className={`font-bold rounded-xl shadow-lg ${completedLessons.includes(activeLesson.id) ? "border-emerald-500 text-emerald-600 dark:text-emerald-400" : "shadow-blue-500/25"}`}
                                >
                                    {completedLessons.includes(activeLesson.id) ? (
                                        <><CheckCircle className="w-4 h-4 mr-2" /> Completed</>
                                    ) : (
                                        <><Circle className="w-4 h-4 mr-2" /> Mark as Complete</>
                                    )}
                                </Button>
                            </div>

                            {/* Local Tab Implementation since simple Tab is clean */}
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
                                                <p className="font-bold text-gray-900 dark:text-white">{MOCK_COURSE.instructor}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Duration</p>
                                                <p className="font-bold text-gray-900 dark:text-white">{activeLesson.duration}</p>
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
                    </div>
                </div>

                {/* Right Column - Course Playlist Sidebar */}
                <div
                    className={`shrink-0 flex flex-col border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] transition-all duration-300 ease-in-out absolute lg:relative z-40 right-0 h-full
                    ${showSidebar ? "w-full sm:w-[350px] lg:w-[400px] translate-x-0" : "w-full sm:w-[350px] lg:w-[400px] translate-x-full lg:translate-x-0 lg:w-0 lg:border-none"}`}
                >
                    {/* Sidebar Header */}
                    <div className="p-4 md:p-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-[#0a0a0a] shrink-0 sticky top-0 z-10">
                        <div>
                            <h3 className="font-black text-gray-900 dark:text-white">Course Content</h3>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setShowSidebar(false)} className="lg:hidden shrink-0">
                            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </Button>
                    </div>

                    {/* Playlist Content (Scrollable Accordion) */}
                    <div className="flex-1 overflow-y-auto styled-scrollbar bg-gray-50/50 dark:bg-[#0a0a0a]">
                        {MOCK_COURSE.sections.map((section, sIdx) => {
                            const isExpanded = expandedSections.includes(section.id);
                            const sectionLessons = section.lessons;
                            const completedCount = sectionLessons.filter(l => completedLessons.includes(l.id)).length;

                            return (
                                <div key={section.id} className="border-b border-gray-200 dark:border-gray-800/80 last:border-0 bg-white dark:bg-[#0a0a0a]">
                                    {/* Section Header */}
                                    <button
                                        onClick={() => toggleSection(section.id)}
                                        className="w-full p-4 md:p-5 flex items-start justify-between bg-gray-50 hover:bg-gray-100 dark:bg-[#0f0f0f] dark:hover:bg-gray-900/80 transition-colors text-left group"
                                    >
                                        <div className="flex-1 pr-4">
                                            <h4 className="font-bold text-gray-900 dark:text-white text-[15px] leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {section.title}
                                            </h4>
                                            <div className="flex items-center gap-2 mt-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                                                <span>{completedCount}/{sectionLessons.length}</span>
                                                <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                                                <span>{sectionLessons.length * 15} min</span>
                                            </div>
                                        </div>
                                        {isExpanded ? (
                                            <ChevronUp className="w-5 h-5 text-gray-400 dark:text-gray-500 shrink-0 mt-0.5 group-hover:text-blue-500 transition-colors" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500 shrink-0 mt-0.5 group-hover:text-blue-500 transition-colors" />
                                        )}
                                    </button>

                                    {/* Section Lessons */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden bg-white dark:bg-[#0a0a0a]"
                                            >
                                                <div className="py-2">
                                                    {sectionLessons.map(lesson => {
                                                        const isActive = activeLesson.id === lesson.id;
                                                        const isCompleted = completedLessons.includes(lesson.id);

                                                        return (
                                                            <div
                                                                key={lesson.id}
                                                                onClick={() => selectLesson(lesson)}
                                                                className={`flex items-start gap-4 p-3 px-5 cursor-pointer transition-colors border-l-4 ${isActive
                                                                    ? "bg-blue-50 dark:bg-blue-900/10 border-blue-500"
                                                                    : "border-transparent hover:bg-gray-50 dark:hover:bg-gray-900/40"
                                                                    }`}
                                                            >
                                                                {/* Interactive Custom Checkbox */}
                                                                <button
                                                                    onClick={(e) => toggleMarkComplete(lesson.id, e)}
                                                                    className="mt-0.5 shrink-0 hover:scale-110 transition-transform focus:outline-hidden"
                                                                    title={isCompleted ? "Mark as uncompleted" : "Mark as complete"}
                                                                >
                                                                    {isCompleted ? (
                                                                        <CheckCircle className="w-5 h-5 text-emerald-500 transition-colors" fill="currentColor" stroke="white" strokeWidth={1} />
                                                                    ) : (
                                                                        <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600 hover:text-blue-500 transition-colors" strokeWidth={2} />
                                                                    )}
                                                                </button>

                                                                {/* Lesson Info */}
                                                                <div className="flex-1 min-w-0">
                                                                    <p className={`text-[14px] leading-snug font-medium line-clamp-2 ${isActive ? "text-blue-700 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"}`}>
                                                                        {lesson.title}
                                                                    </p>
                                                                    <div className="flex items-center gap-1.5 mt-1.5 text-[11px] font-bold tracking-wide text-gray-500 dark:text-gray-500 uppercase">
                                                                        {lesson.type === 'video' && <PlayCircle className="w-3.5 h-3.5" strokeWidth={2.5} />}
                                                                        {lesson.type === 'document' && <FileText className="w-3.5 h-3.5" strokeWidth={2.5} />}
                                                                        {lesson.type === 'exercise' && <Code className="w-3.5 h-3.5" strokeWidth={2.5} />}
                                                                        <span>{lesson.duration}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Mobile Overlay Background (when sidebar is open) */}
                {showSidebar && (
                    <div
                        className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
                        onClick={() => setShowSidebar(false)}
                    />
                )}
            </main>
        </div>
    );
}
