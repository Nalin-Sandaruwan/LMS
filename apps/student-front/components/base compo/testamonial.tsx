"use client"
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, GraduationCap, Globe, Waves, Brain } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: "Jonathan Hale",
        content: "Luxing truly delivers a refined living experience. Every detail feels thoughtfully designed and exceptionally comfortable for modern lifestyles.",
        position: "top-[15%] left-[-5%] lg:left-[5%]"
    },
    {
        id: 3,
        name: "Michael Lawre",
        content: "I've never experienced a learning platform that feels this intuitive and premium. It genuinely makes you want to keep coming back and exploring more.",
        position: "top-[10%] right-[-5%] lg:right-[5%]"
    },
    {
        id: 4,
        name: "Sarah Jenkins",
        content: "The variety of courses and the quality of instruction have exceeded all my expectations. Highly recommended!",
        position: "top-[-0%] left-[45%]"
    }
];

const brands = [
    { name: "Luxentia", icon: GraduationCap },
    { name: "Excellion", icon: Globe },
    { name: "Prestoria", icon: Waves },
    { name: "Magnifexia", icon: Brain },
];

export function Testimonials() {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="relative w-full py-32  dark:bg-gray-950 overflow-hidden transition-colors duration-300">

            {/* Background Text Overlay (Optional visual flair) */}
            {/* <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.02] pointer-events-none select-none">
                <h2 className="text-[20vw] font-black uppercase tracking-tighter">Testimonials</h2>
            </div> */}

            <div className="container mx-auto px-4 lg:px-8 relative z-10">

                {/* Header Section */}
                <div className="flex flex-col items-center text-center mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 mb-6"
                    >
                        <span className="w-2 h-2 bg-[#4F46E5] rounded-full" />
                        <p className="text-sm font-bold text-[#1B1D36] dark:text-gray-300 uppercase tracking-widest">Client Reviews</p>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1B1D36] dark:text-white leading-tight max-w-3xl transition-colors duration-300"
                    >
                        Insights from Our Luxury <br /> Living Community
                    </motion.h2>
                </div>

                {/* Main Interaction Area */}
                <div className="relative min-h-[400px] flex flex-col items-center justify-center">

                    {/* Floating Avatars */}
                    <div className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block">
                        {testimonials.map((t, idx) => (
                            <motion.div
                                key={`avatar-${t.id}`}
                                animate={{
                                    y: [0, -15, 0],
                                    x: [0, idx % 2 === 0 ? 10 : -10, 0]
                                }}
                                transition={{
                                    duration: 5 + idx,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className={`absolute flex items-center gap-3 ${t.position} group pointer-events-auto cursor-pointer`}
                                onClick={() => setCurrentIndex(idx)}
                            >
                                <div className={`w-12 h-12 rounded-full bg-[#4F46E5] flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg ${currentIndex === idx ? 'ring-4 ring-indigo-500/20 scale-110' : 'opacity-80'}`}>
                                    <span className="text-white text-xs font-bold">{t.name.split(' ').map(n => n[0]).join('')}</span>
                                </div>
                                <span className={`text-sm font-bold text-[#1B1D36] dark:text-gray-300 transition-all ${currentIndex === idx ? 'opacity-100 translate-x-1' : 'opacity-60 group-hover:opacity-100'}`}>
                                    {t.name}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Central Quote & Navigation */}
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full max-w-5xl">
                        <div className="flex-1 relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-center lg:text-left"
                                >
                                    <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-[#1B1D36] dark:text-gray-100 leading-[1.5] transition-colors duration-300">
                                        &ldquo;{testimonials[currentIndex].content}&rdquo;
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Navigation Arrows */}
                        <div className="flex gap-4">
                            <button
                                onClick={prevTestimonial}
                                className="w-14 h-14 rounded-full bg-[#1B1D36] dark:bg-white dark:text-[#1B1D36] text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-xl hover:shadow-indigo-500/20"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={nextTestimonial}
                                className="w-14 h-14 rounded-full bg-[#1B1D36] dark:bg-white dark:text-[#1B1D36] text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-xl hover:shadow-indigo-500/20"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Logo Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 "
                >
                    {brands.map((brand, idx) => (
                        <div
                            key={brand.name}
                            className="bg-white dark:bg-gray-900 rounded-[24px] p-8 flex items-center justify-center gap-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-indigo-100 dark:hover:border-indigo-900 group cursor-pointer"
                        >
                            <brand.icon className="w-8 h-8 text-[#1B1D36] dark:text-white transition-transform group-hover:scale-110 group-hover:rotate-6" />
                            <span className="text-xl font-bold text-[#1B1D36] dark:text-white transition-colors">
                                {brand.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
