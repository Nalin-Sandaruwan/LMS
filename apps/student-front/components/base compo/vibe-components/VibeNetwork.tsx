"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

export function VibeNetwork() {
    return (
        <div className="relative h-[500px] flex items-center justify-center">
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
            <Avatar delay={0} pos="top-[10%] left-[15%]" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop" />
            <Avatar delay={0.5} pos="top-[30%] left-[25%]" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop" />
            <Avatar delay={1} pos="bottom-[20%] left-[10%]" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop" />
            <Avatar delay={1.5} pos="bottom-[5%] left-[30%]" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop" />

            <Avatar delay={0.2} pos="top-[10%] right-[15%]" src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop" />
            <Avatar delay={0.7} pos="top-[30%] right-[25%]" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop" />
            <Avatar delay={1.2} pos="bottom-[20%] right-[10%]" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop" />
            <Avatar delay={1.7} pos="bottom-[5%] right-[30%]" src="https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150&h=150&fit=crop" />
        </div>
    );
}

function Avatar({ pos, src, delay }: { pos: string, src: string, delay: number }) {
    const [randomDuration] = useState(() => 3 + Math.random() * 2);

    return (
        <motion.div
            animate={{
                y: [0, -10, 0],
            }}
            transition={{
                duration: randomDuration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay
            }}
            className={`absolute ${pos} w-16 h-16 rounded-full border-2 border-white dark:border-gray-800 shadow-xl overflow-hidden z-10 cursor-pointer`}
        >
            <img src={src} alt="avatar" className="w-full h-full object-cover" />
        </motion.div>
    );
}
