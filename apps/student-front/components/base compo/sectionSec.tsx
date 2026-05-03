"use client"
import * as React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MousePointer2, PenTool, Rocket } from 'lucide-react';

export function SectionSec() {
    return (
        <div className='relative w-full pt-32 pb-24 bg-white dark:bg-gray-950 overflow-hidden transition-colors duration-300'>

            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Subtle curved lines on the left */}
                <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] border border-gray-200 dark:border-gray-800 rounded-full opacity-60" />
                <div className="absolute top-20 left-[-15%] w-[600px] h-[600px] border border-gray-200 dark:border-gray-800 rounded-full opacity-40" />

                {/* Left side sparkle */}
                <motion.svg
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className="absolute top-1/2 left-8 md:left-24 w-8 h-8 text-[#FF7A45]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" />
                </motion.svg>

                {/* Subtle Glow */}
                <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[#EEF2FF] dark:bg-[#4F46E5] rounded-full blur-[120px] opacity-40 dark:opacity-[0.05]" />
            </div>

            <div className='container mx-auto px-4 lg:px-8 relative z-10'>
                {/* Top Row: Content & Illustration */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-14'>

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className='flex flex-col'
                    >
                        <h2 className='text-5xl md:text-6xl lg:text-[72px] font-extrabold text-[#1B1D36] dark:text-white leading-[1.05] mb-10 transition-colors duration-300'>
                            We help our client <br />
                            solve <span className="font-serif italic font-medium">problems</span>
                        </h2>
                        <p className='text-[19px] text-gray-400 dark:text-gray-400 font-medium leading-[1.6] max-w-lg transition-colors duration-300'>
                            Our platform offers the modern enterprise full control of how data
                            can be accessed and used with industry leading software solutions
                            for identity, activation, and data collaboration.
                        </p>
                    </motion.div>

                    {/* Right Illustration: Matching the gray rounded blocks */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className=' flex justify-center lg:justify-end h-[450px] gap-24'
                    >
                        {/* Tall Card (Background one) */}
                        <div className="w-[180px] md:w-[240px] h-[380px] bg-[#D4D1CC] dark:bg-gray-800 rounded-[32px] overflow-hidden relative group cursor-pointer transition-all duration-500 hover:shadow-2xl">
                            <Image
                                src="/hero/6-techniques-for-stress-web.jpg"
                                alt="Service illustration"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>

                        {/* Shorter Card (Foreground one) */}
                        <div className="top-10 right-0 lg:right-12 w-[180px] md:w-[240px] h-[240px] bg-[#D4D1CC] dark:bg-gray-700 rounded-[32px] overflow-hidden relative group cursor-pointer shadow-2xl shadow-black/5 translate-x-8 translate-y-8 lg:translate-x-0 lg:translate-y-0 transition-all duration-500 hover:shadow-indigo-500/20">
                            <Image
                                src="/hero/Group 3.png"
                                alt="Feature illustration"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Row: 3-Column Features */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { staggerChildren: 0.2 }
                        }
                    }}
                    className='grid grid-cols-1 md:grid-cols-3 gap-0 items-center pt-12 border-t border-gray-100 dark:border-gray-900'
                >
                    {/* Feature 1 */}
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className='flex flex-col items-center text-center px-8 group py-8'>
                        <div className='w-14 h-14 rounded-full bg-[#E6F4EA] dark:bg-[#0F3823] flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300'>
                            <MousePointer2 className='w-6 h-6 text-[#2D3142] dark:text-green-400 opacity-70' />
                        </div>
                        <h4 className='text-xl font-bold text-[#1B1D36] dark:text-white mb-2 transition-colors'>Simple & Uniuqe</h4>
                        <p className='text-[14px] font-medium text-gray-400 dark:text-gray-500'>Created by our talented designer</p>
                    </motion.div>

                    {/* Feature 2: With Dividers */}
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className='flex flex-col items-center text-center px-8 md:border-x border-gray-100 dark:border-gray-900 group py-8'>
                        <div className='w-14 h-14 rounded-full bg-[#FFF0E5] dark:bg-[#3D1E0C] flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300'>
                            <PenTool className='w-6 h-6 text-[#2D3142] dark:text-orange-400 opacity-70' />
                        </div>
                        <h4 className='text-xl font-bold text-[#1B1D36] dark:text-white mb-2 transition-colors'>Well Documented</h4>
                        <p className='text-[14px] font-medium text-gray-400 dark:text-gray-500'>We are not tolerant about taste</p>
                    </motion.div>

                    {/* Feature 3 */}
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className='flex flex-col items-center text-center px-8 group py-8'>
                        <div className='w-14 h-14 rounded-full bg-[#F0EEFF] dark:bg-[#1D153D] flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300'>
                            <Rocket className='w-6 h-6 text-[#2D3142] dark:text-indigo-400 opacity-70' />
                        </div>
                        <h4 className='text-xl font-bold text-[#1B1D36] dark:text-white mb-2 transition-colors'>World Class UI Design</h4>
                        <p className='text-[14px] font-medium text-gray-400 dark:text-gray-500'>We are not tolerant about taste</p>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}