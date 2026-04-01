"use client"
import * as React from 'react';
import HeroImg from '@/public/hero/Group 3.png'
import Image from 'next/image';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';

export function SectionSec() {
    return (
        <div className='flex w-full justify-center items-center overflow-hidden'>
            <section className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 container items-center page-margin justify-center w-full py-16 px-6 lg:px-12'>

                {/* Left Text Column */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className='flex flex-col text-left w-full order-2 lg:order-1'
                >
                    <p className='text-lg md:text-xl font-bold tracking-wider text-blue-600 mb-2 dark:text-blue-400 uppercase'>
                        EXCELLENCE IN EDUCATION
                    </p>
                    <h1 className='text-4xl md:text-5xl lg:text-5xl font-extrabold text-blue-950 dark:text-white leading-tight mb-6'>
                        Committed To Learn <br className="hidden md:block" /> Excellence In Education.
                    </h1>
                    <p className='text-base md:text-lg text-gray-600 dark:text-gray-300 mb-4 leading-relaxed'>
                        We are dedicated to transforming the way people learn. Our mission is to provide high-quality, accessible online courses that empower individuals to gain new skills and knowledge at their own pace.
                    </p>
                    <p className='text-base md:text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed'>
                        With a team of experienced educators and industry professionals, we offer engaging content designed to inspire and motivate learners from all backgrounds. Join our vibrant community of learners and start your journey with us today!
                    </p>
                    <div>
                        <Button variant="default" size="lg" className='h-12 px-8 text-md font-bold shadow-lg shadow-blue-500/25'>
                            Get Started
                        </Button>
                    </div>
                </motion.div>

                {/* Right Image Column */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className='flex justify-center w-full order-1 lg:order-2'
                >
                    <Image
                        src={HeroImg}
                        alt="Education Hero Illustration"
                        className='w-full max-w-md lg:max-w-none h-auto object-contain rounded-2xl drop-shadow-2xl'
                        priority={false}
                    />
                </motion.div>

            </section>
        </div>
    );
}