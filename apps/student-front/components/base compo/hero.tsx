"use client"
import Image from 'next/image';
import * as React from 'react';
import HeroImg from '@/public/hero/Group 2.png';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';

export interface IAppProps { }

export function Hero(props: IAppProps) {
    return (
        <div className='relative flex flex-col items-center justify-center pt-24 pb-12 w-full min-h-screen bg-transparent dark:bg-gray-950 overflow-hidden'>

            {/* Animated Mesh Background Elements */}
            <motion.div
                animate={{ filter: ["hue-rotate(0deg)", "hue-rotate(360deg)"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
            >

                {/* Dot Mesh Pattern Overlay */}
                <div className="absolute inset-0 z-0 h-full w-full bg-transparent bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff15_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />

                {/* Mesh Gradient Blur Orbs */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], x: [0, 80, 0], y: [0, -40, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-blue-400/30 dark:bg-blue-700/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen"
                />
                <motion.div
                    animate={{ scale: [1, 1.4, 1], x: [0, -80, 0], y: [0, 60, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute top-[10%] right-[-10%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] bg-purple-400/30 dark:bg-purple-700/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen"
                />
                <motion.div
                    animate={{ scale: [1, 1.3, 1], x: [0, 60, 0], y: [0, 80, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-[-20%] left-[20%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] bg-pink-400/30 dark:bg-pink-700/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen"
                />
                <motion.div
                    animate={{ scale: [1, 1.5, 1], x: [0, -60, 0], y: [0, -60, 0] }}
                    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                    className="absolute bottom-[0%] right-[20%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-cyan-400/30 dark:bg-cyan-700/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen"
                />
            </motion.div>

            <div className='flex flex-col w-full relative z-10'>
                <div className='flex flex-col items-center justify-center w-full text-center px-4'>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-center max-w-4xl"
                    >
                        <p className='text-sm md:text-base font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1'>
                            Excellence in Education
                        </p>
                        <h1 className='text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white mb-2 leading-tight drop-shadow-sm'>
                            {/* Excellence in education <br className="hidden md:block" /> */}
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                                Tokenized Future For Individuals</span>
                        </h1>
                        <p className='text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl'>
                            Part of every dollar you spend on yourself gets reinvested into your tokenized idensphere
                        </p>

                        <div className="flex gap-4">
                            <Button variant="default" size="lg" className="h-12 px-8 text-md font-bold shadow-lg shadow-blue-500/25">
                                Get Started
                            </Button>
                            <Button variant="outline" size="lg" className="h-12 px-8 text-md font-bold border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md">
                                View Courses
                            </Button>
                        </div>
                    </motion.div>
                </div>
                {/* Animated Floating Statistics Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-wrap justify-center gap-6 mt-16 md:mt-24 px-4 w-full max-w-5xl mx-auto pb-16"
                >
                    {/* Card 1 */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-white/40 dark:border-gray-800 shadow-xl rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4 w-56 md:w-64"
                    >
                        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-2xl shadow-inner shrink-0 leading-none">
                            <span className="mb-1 block">👥</span>
                        </div>
                        <div className="text-center md:text-left">
                            <h4 className="text-2xl font-black text-gray-900 dark:text-white mb-0.5">50K+</h4>
                            <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider">Active Students</p>
                        </div>
                    </motion.div>

                    {/* Card 2 */}
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                        className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-white/40 dark:border-gray-800 shadow-xl rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4 w-56 md:w-64 md:-mt-10"
                    >
                        <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-2xl shadow-inner shrink-0 leading-none">
                            <span className="mb-1 block">🎓</span>
                        </div>
                        <div className="text-center md:text-left">
                            <h4 className="text-2xl font-black text-gray-900 dark:text-white mb-0.5">2,500+</h4>
                            <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider">Premium Courses</p>
                        </div>
                    </motion.div>

                    {/* Card 3 */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
                        className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-white/40 dark:border-gray-800 shadow-xl rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4 w-56 md:w-64"
                    >
                        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-800/40 flex items-center justify-center text-2xl shadow-inner shrink-0 leading-none">
                            <span className="mb-1 block">⭐</span>
                        </div>
                        <div className="text-center md:text-left">
                            <h4 className="text-2xl font-black text-gray-900 dark:text-white mb-0.5">4.9/5</h4>
                            <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider">Average Rating</p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
