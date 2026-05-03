"use client"
import * as React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ArrowRight } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export function VibeSection() {
    return (
        <section className="relative w-full py-24 bg-white dark:bg-gray-950 overflow-hidden transition-colors duration-300">

            {/* Animated Mesh Gradient Background */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Blue Blob */}
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[60%] bg-blue-500/20 dark:bg-blue-600/10 rounded-full blur-[120px]"
                />
                {/* Pink Blob */}
                <motion.div
                    animate={{
                        x: [0, -40, 0],
                        y: [0, 40, 0],
                        scale: [1, 1.3, 1]
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute top-[10%] right-[-5%] w-[45%] h-[55%] bg-pink-400/20 dark:bg-pink-500/10 rounded-full blur-[100px]"
                />
                {/* Grain/Noise Overlay */}
                {/* <div className="absolute inset-0 opacity-[0.4] dark:opacity-[0.2] mix-blend-soft-light pointer-events-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} /> */}
            </div>

            {/* Grid Background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
                style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">

                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
                    <div className="max-w-2xl">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-extrabold text-[#1B1D36] dark:text-white leading-tight"
                        >
                            <span className="text-[#4F46E5]">What is Stepby</span> and How <br className="hidden md:block" />
                            Connect With Others?
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-md"
                    >
                        <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm font-medium">
                            Stepby is an AI-powered platform offering tools, integrations, and resources for marketing, sales, and customer service.
                        </p>
                        <div className="flex gap-4">
                            <button className="px-6 py-2.5 bg-[#4F46E5] text-white rounded-lg font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20">
                                Learn More
                            </button>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button className="px-6 py-2.5 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 rounded-lg font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-900 transition-all">
                                        Get started free
                                    </button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800">
                                    <DialogHeader>
                                        <DialogTitle className="text-2xl font-bold text-[#1B1D36] dark:text-white">How would you like to join with us?</DialogTitle>
                                        <DialogDescription className="text-gray-500 dark:text-gray-400">
                                            Choose your role to get started with our platform.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-8">
                                        <button className="w-full py-4 bg-[#4F46E5] hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-3 group">
                                            <span>Join as a Learner</span>
                                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                        </button>
                                        <button className="w-full py-4 border border-gray-200 dark:border-gray-800 text-[#1B1D36] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 rounded-xl font-bold transition-all flex items-center justify-center gap-3 group">
                                            <span>Join as a Lecturer</span>
                                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                        </button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </motion.div>
                </div>

                {/* Network Illustration Area */}
                <div className="relative h-[500px] flex items-center justify-center">

                    {/* SVG Lines */}


                    {/* Central Node */}
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-20 w-24 h-24 rounded-full bg-[#4F46E5] flex items-center justify-center shadow-[0_0_50px_rgba(79,70,229,0.3)]"
                    >
                        <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20 animate-ping" />
                        <MessageSquare className="w-10 h-10 text-white" />
                    </motion.div>

                    {/* Avatars */}
                    {/* Left Side */}
                    {/* Left Side */}
                    <Avatar pos="top-[10%] left-[15%]" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop" /> {/* Young Woman */}
                    <Avatar pos="top-[30%] left-[25%]" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop" /> {/* Young Man */}
                    <Avatar pos="bottom-[20%] left-[10%]" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop" /> {/* Middle Aged Man */}
                    <Avatar pos="bottom-[5%] left-[30%]" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop" /> {/* Middle Aged Woman */}

                    {/* Right Side */}
                    <Avatar pos="top-[10%] right-[15%]" src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop" /> {/* Young Boy/Man */}
                    <Avatar pos="top-[30%] right-[25%]" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop" /> {/* Young Girl/Woman */}
                    <Avatar pos="bottom-[20%] right-[10%]" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop" /> {/* Middle Aged Man */}
                    <Avatar pos="bottom-[5%] right-[30%]" src="https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150&h=150&fit=crop" /> {/* Middle Aged Woman */}
                </div>
            </div>
        </section>
    );
}

function Avatar({ pos, src }: { pos: string, src: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`absolute ${pos} w-16 h-16 rounded-full border-2 border-white dark:border-gray-800 shadow-xl overflow-hidden z-10 transition-transform hover:scale-110 cursor-pointer`}
        >
            <img src={src} alt="avatar" className="w-full h-full object-cover" />
        </motion.div>
    );
}
