import React from 'react';
import { motion } from 'framer-motion';
import { Zap, BookOpen } from 'lucide-react';

export function LoginBrandPanel() {
    return (
        <div className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center border-l border-green-900/50" style={{ backgroundColor: "#021a01" }}>
            {/* Dynamic Background Gradients */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-green-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse" />
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse delay-1000" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />

            <div className="relative w-full max-w-lg z-10 p-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-600/30 mb-8 border border-green-500">
                        <Zap className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                        Empower Your <br />
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(to right, #074C00, #42A341, #B8E2A3)" }}>
                            Teaching Journey
                        </span>
                    </h2>
                    <p className="text-lg text-gray-400 font-medium">
                        Join thousands of educators creating impact. Build, manage, and scale your courses with our state-of-the-art teaching platform.
                    </p>
                </motion.div>

                {/* Floating Details / Quotes */}
                <div className="mt-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                    >
                        <div className="flex gap-4 items-center mb-4">
                            <div className="w-12 h-12 rounded-full flex flex-shrink-0 items-center justify-center text-white font-bold text-lg" style={{ backgroundImage: "linear-gradient(to bottom right, #074C00, #42A341)" }}>
                                SR
                            </div>
                            <div>
                                <h4 className="text-white font-bold">Sarah Rahman</h4>
                                <p className="text-gray-400 text-sm">Senior Educator & Course Creator</p>
                            </div>
                            <div className="ml-auto text-green-400">
                                <BookOpen className="w-6 h-6" />
                            </div>
                        </div>
                        <p className="text-gray-300 italic">"This platform revolutionized how I teach. My student engagement doubled within the first month — it's the best tool for any educator."</p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}