"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, Home, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black font-sans flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 text-center shadow-xl"
            >
                <div className="relative mx-auto w-24 h-24 mb-6">
                    <div className="absolute inset-0 bg-green-100 dark:bg-green-900/30 rounded-full animate-ping opacity-75"></div>
                    <div className="relative bg-green-100 dark:bg-green-900/50 rounded-full w-24 h-24 flex items-center justify-center">
                        <SearchX className="w-10 h-10 text-green-600 dark:text-green-500" />
                    </div>
                </div>

                <motion.h1 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-7xl font-black text-gray-900 dark:text-white mb-2"
                >
                    404
                </motion.h1>
                <motion.h2 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4"
                >
                    Page not found
                </motion.h2>
                
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-500 dark:text-gray-400 mb-8 font-medium text-sm"
                >
                    The page you're looking for doesn't exist or has been moved. 
                    Let's get you back on track.
                </motion.p>

                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-3 justify-center"
                >
                    <Button asChild className="h-12 px-6 rounded-2xl font-bold shadow-md shadow-green-500/20 bg-green-600 hover:bg-green-700 text-white">
                        <Link href="/">
                            <Home className="w-4 h-4 mr-2" />
                            Back to Home
                        </Link>
                    </Button>
                    <Button asChild variant="outline" className="h-12 px-6 rounded-2xl font-bold border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-white">
                        <Link href="/profile">
                            <Compass className="w-4 h-4 mr-2" />
                            View Profile
                        </Link>
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
}