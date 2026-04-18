"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, MoveRight, Users, PlayCircle, BookOpen } from "lucide-react";

export function HeroSection() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { scrollY } = useScroll();
    const yElement = useTransform(scrollY, [0, 1000], [0, 200]);
    const opacityElement = useTransform(scrollY, [0, 500], [1, 0]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 20 } as any,
        },
    };

    return (
        <div className="relative min-h-dvh flex items-center justify-center overflow-hidden " suppressHydrationWarning>

            {/* Background image — separate layer so opacity doesn't affect children */}
            <div
                className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-40"
                style={{ backgroundImage: "url('/hero/hero.jpg')" }}
            />
            {/* Dark base + gradient overlays */}
            <div className="absolute inset-0 -z-10 bg-white dark:bg-slate-950" style={{ zIndex: -11 }} />
            {/* <div className="absolute inset-0 -z-10 bg-linear-to-b from-white/70 via-transparent to-white/90" />
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,var(--primary),transparent_70%)] opacity-20" /> */}

            <motion.div
                style={{ y: yElement, opacity: opacityElement }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="container pt-20 px-4 md:px-6 relative z-10 flex flex-col items-center text-center page-margin"
            >
                {/* Glowing Badge */}
                <motion.div variants={itemVariants} className="mb-6">
                    <motion.div
                        animate={{
                            y: [0, -8, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="inline-flex items-center rounded-full border border-primary/20 dark:border-primary/30 bg-primary/5 dark:bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary dark:text-primary shadow-sm backdrop-blur-md transition-colors hover:bg-primary/10 dark:hover:bg-primary/20 cursor-pointer group"
                    >
                        <Sparkles className="mr-2 h-4 w-4 text-primary group-hover:animate-pulse" />
                        <span className="relative">
                            Welcome to the Future of Teaching
                            <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                        </span>
                        <span className="ml-3 flex h-4 w-4 items-center justify-center rounded-full bg-primary/10">
                            <MoveRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                        </span>
                    </motion.div>
                </motion.div>

                {/* Main Headline */}
                <motion.div variants={itemVariants} className="max-w-4xl tracking-tight mb-4">
                    <h1 className="text-5xl uppercase font-black text-gray-900 dark:text-white leading-[1.1]">
                        Turn your passion into
                        <span
                            className="block mt-2 text-transparent bg-clip-text animate-gradient-x"
                            style={{ backgroundImage: "linear-gradient(to right, #074C00, #42A341, #B8E2A3)" }}
                        >
                            global impact.
                        </span>
                    </h1>
                </motion.div>

                {/* Subtitle */}
                <motion.div variants={itemVariants} className="max-w-2xl text-md sm:text-lg text-gray-600 dark:text-gray-300 mb-10 leading-relaxed font-medium">
                    Create, manage, and scale your online courses with our state-of-the-art LMS platform. Join thousands of educators empowering students worldwide.
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
                >
                    <Link href="/signup" passHref className="w-full sm:w-auto mt-2">
                        <Button
                            size="lg"
                            className="w-full sm:w-auto h-14 px-8 text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_40px_-10px_var(--primary)] hover:shadow-[0_0_60px_-15px_var(--primary)] transition-all duration-300 rounded-full group border-none"
                        >
                            Sign up as Teacher
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 border border-white/30 rounded-full p-0.5 bg-white/10" />
                        </Button>
                    </Link>
                    <Link href="/login" passHref className="w-full sm:w-auto mt-2">
                        <Button
                            size="lg"
                            variant="outline"
                            className="w-full sm:w-auto h-14 px-8 text-base font-bold border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-white backdrop-blur-md transition-all duration-300 rounded-full shadow-sm hover:shadow-md group"
                        >
                            Login to Dashboard
                        </Button>
                    </Link>
                </motion.div>


            </motion.div>
        </div>
    );
}
