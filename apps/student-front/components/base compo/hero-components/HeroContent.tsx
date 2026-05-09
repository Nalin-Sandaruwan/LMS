"use client"
import * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../ui/button';
import { JoinDialog } from '../vibe-components/JoinDialog';

export function HeroContent() {
    return (
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
                <JoinDialog>
                    <Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white h-14 px-8 rounded-xl font-semibold text-lg flex items-center shadow-lg shadow-indigo-500/25">
                        Join With Us <span className="text-2xl ml-2 font-light">↗</span>
                    </Button>
                </JoinDialog>
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
    );
}
