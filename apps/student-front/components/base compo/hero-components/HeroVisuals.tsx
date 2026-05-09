"use client"
import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '../../ui/button';
import Link from 'next/link';

export function HeroVisuals() {
    return (
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

                    <Button asChild className="bg-[#4F46E5] hover:bg-[#4338CA] text-white h-[60px] px-8 rounded-xl font-semibold text-base w-full shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:scale-[1.03] active:scale-95 group/btn">
                        <Link href="/all-cource">
                            Meet The Expert <span className="text-xl ml-2 font-light transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1">↗</span>
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Right Column: Custom Stats Card */}
            <div className="relative w-full lg:w-[40%] h-[320px] flex flex-col justify-end group cursor-pointer">
                {/* Folder tab on top left */}
                <div className="absolute bottom-[240px] left-0 w-[55%] h-[60px] bg-[#F4F5FB] dark:bg-gray-950 rounded-t-[32px] transition-all duration-500 group-hover:bg-[#ebedfa] dark:group-hover:bg-gray-900" />

                {/* Inner curve where tab meets main body */}
                <div
                    className="absolute bottom-[240px] left-[55%] w-6 h-6 bg-[radial-gradient(circle_at_top_right,transparent_24px,#F4F5FB_25px)] dark:bg-[radial-gradient(circle_at_top_right,transparent_24px,#111827_25px)] transition-all duration-500 group-hover:bg-[radial-gradient(circle_at_top_right,transparent_24px,#ebedfa_25px)] dark:group-hover:bg-[radial-gradient(circle_at_top_right,transparent_24px,#1f2937_25px)]"
                />

                {/* Main body of the card */}
                <div className="relative w-full h-[240px] bg-[#F4F5FB] dark:bg-gray-950 rounded-[32px] rounded-tl-none p-8 lg:p-10 flex flex-col justify-center transition-all duration-500 group-hover:bg-[#ebedfa] dark:group-hover:bg-gray-900 group-hover:shadow-2xl group-hover:shadow-indigo-500/5 group-hover:-translate-y-1">
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
    );
}
