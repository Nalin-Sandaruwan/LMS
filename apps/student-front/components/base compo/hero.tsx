"use client"
import Image from 'next/image';
import * as React from 'react';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';

export interface IAppProps { }

export function Hero(props: IAppProps) {
    return (
        <div className='relative flex flex-col items-center justify-center pt-24 pb-12 w-full min-h-screen bg-white dark:bg-gray-950 overflow-hidden transition-colors duration-300'>

            {/* Background Gradients & Decorations */}
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

            <div className='flex flex-col w-full container mx-auto px-4 lg:px-8 relative z-10'>

                {/* Top Section: Typography & Call to Action */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.15 }
                        }
                    }}
                    className="flex flex-col mb-14 mt-10"
                >
                    <h1 className='text-5xl md:text-6xl lg:text-[80px] font-extrabold text-[#1B1D36] dark:text-white leading-[1.1] tracking-tight max-w-4xl transition-colors duration-300'>
                        <motion.span
                            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="block"
                        >
                            Tokenized Future
                        </motion.span>
                        <motion.span
                            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="block"
                        >
                            For Individuals
                        </motion.span>
                        <motion.span
                            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="block"
                        >
                            Excellence in <span className="font-serif italic font-medium text-[#1B1D36] dark:text-white transition-colors duration-300">Education</span>
                        </motion.span>
                    </h1>

                    <motion.div
                        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="flex flex-col md:flex-row items-start md:items-center mt-12 gap-6 md:gap-10"
                    >
                        <Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white h-14 px-8 rounded-xl font-semibold text-lg flex items-center shadow-lg shadow-indigo-500/25">
                            Join With Us <span className="text-2xl ml-2 font-light">↗</span>
                        </Button>
                        <div className="flex items-center gap-6">
                            {/* Thin right arrow */}
                            <svg className="w-16 h-4 text-gray-500 dark:text-gray-400 shrink-0 transition-colors duration-300" viewBox="0 0 64 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 8H62M62 8L55 1M62 8L55 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className="max-w-[340px] text-[#1B1D36] dark:text-gray-300 font-semibold text-[15px] leading-relaxed transition-colors duration-300">
                                Part of every dollar you spend on yourself gets reinvested into your tokenized idensphere
                            </p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Bottom Section: Image & Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-col lg:flex-row gap-8 items-end"
                >
                    {/* Left Column: Custom Image Block */}
                    <div className="relative w-full lg:w-[60%] h-[350px] lg:h-[300px]">
                        {/* Image Container with base rounding and top-left heavy rounding */}
                        <div className="w-full h-full rounded-[32px] rounded-tl-[80px] overflow-hidden relative border border-transparent dark:border-gray-800 transition-colors group cursor-pointer">
                            <Image
                                src="/hero/6-techniques-for-stress-web.jpg"
                                alt="Meditation and Wellness"
                                fill
                                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                            />
                        </div>

                        {/* Bottom-Right Button Cutout Wrapper */}
                        <div className="absolute bottom-0 right-0 bg-white dark:bg-gray-950 pt-5 pl-5 rounded-tl-[32px] z-10 flex items-center justify-center transition-all duration-500 group/cutout hover:shadow-[10px_10px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[10px_10px_40px_rgba(0,0,0,0.4)]">
                            {/* Inner curve top-right of wrapper */}
                            <div
                                className="absolute top-0 right-0 w-6 h-6 -translate-y-full bg-[radial-gradient(circle_at_top_left,transparent_24px,white_25px)] dark:bg-[radial-gradient(circle_at_top_left,transparent_24px,#030712_25px)] transition-colors duration-300"
                            />
                            {/* Inner curve bottom-left of wrapper */}
                            <div
                                className="absolute bottom-0 left-0 w-6 h-6 -translate-x-full bg-[radial-gradient(circle_at_top_left,transparent_24px,white_25px)] dark:bg-[radial-gradient(circle_at_top_left,transparent_24px,#030712_25px)] transition-colors duration-300"
                            />

                            <Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white h-[60px] px-8 rounded-xl font-semibold text-base w-full shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:scale-[1.03] active:scale-95 group/btn">
                                Meet The Expert <span className="text-xl ml-2 font-light transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1">↗</span>
                            </Button>
                        </div>
                    </div>

                    {/* Right Column: Custom Stats Card */}
                    <div className="relative w-full lg:w-[40%] h-[320px] flex flex-col justify-end group cursor-pointer">
                        {/* Folder tab on top left */}
                        <div className="absolute bottom-[240px] left-0 w-[55%] h-[60px] bg-[#F4F5FB] dark:bg-gray-900 rounded-t-[32px] transition-all duration-500 group-hover:bg-[#ebedfa] dark:group-hover:bg-gray-800" />

                        {/* Inner curve where tab meets main body */}
                        <div
                            className="absolute bottom-[240px] left-[55%] w-6 h-6 bg-[radial-gradient(circle_at_top_right,transparent_24px,#F4F5FB_25px)] dark:bg-[radial-gradient(circle_at_top_right,transparent_24px,#111827_25px)] transition-all duration-500 group-hover:bg-[radial-gradient(circle_at_top_right,transparent_24px,#ebedfa_25px)] dark:group-hover:bg-[radial-gradient(circle_at_top_right,transparent_24px,#1f2937_25px)]"
                        />

                        {/* Main body of the card */}
                        <div className="relative w-full h-[240px] bg-[#F4F5FB] dark:bg-gray-900 rounded-[32px] rounded-tl-none p-8 lg:p-10 flex flex-col justify-center transition-all duration-500 group-hover:bg-[#ebedfa] dark:group-hover:bg-gray-800 group-hover:shadow-2xl group-hover:shadow-indigo-500/5 group-hover:-translate-y-1">
                            <p className="text-[#1B1D36] dark:text-gray-200 font-bold text-[17px] leading-relaxed mb-8 max-w-[280px] transition-all duration-500 group-hover:translate-x-1">
                                We are building the future together by using cutting-edge technology
                            </p>
                            <div className="flex items-center gap-8">
                                <div className="flex flex-col">
                                    <h3 className="text-4xl lg:text-[42px] font-black text-[#1B1D36] dark:text-white tracking-tight transition-all duration-500 group-hover:scale-110 origin-left">18k+</h3>
                                    <p className="text-[13px] font-medium text-gray-500 dark:text-gray-400 mt-1 transition-colors">Projects Done</p>
                                </div>
                                <div className="w-[1px] h-12 bg-gray-300 dark:bg-gray-700 transition-colors"></div>
                                <div className="flex flex-col">
                                    <h3 className="text-4xl lg:text-[42px] font-black text-[#1B1D36] dark:text-white tracking-tight transition-all duration-500 group-hover:scale-110 origin-left">20+</h3>
                                    <p className="text-[13px] font-medium text-gray-500 dark:text-gray-400 mt-1 transition-colors">Awards Winning</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </motion.div>
            </div>
        </div>
    );
}
