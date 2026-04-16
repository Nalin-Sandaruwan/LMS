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
                        Future Value Creation
                        <br className="hidden md:block" />TOKENIZED
                    </h1>
                    <p className='text-base md:text-lg text-gray-600 dark:text-gray-300 mb-4 leading-relaxed'>
                        As a part of our vision, we are currently working on implementing the most advanced AI and BLOCKCHAIN TECHNOLOGY !                    </p>
                    <p className='text-base md:text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed'>
                        as a creator -ultimately your idensphere will be transformed into an AI character of yourself that will talk to future generations and share knowledge Forever WHILE YOUR IDENSPHERE GAIN VALUE!                    </p>
                    <p className='text-base md:text-lg text-gray-600 dark:text-gray-300 mb-4 leading-relaxed'>
                        As a user- generous amount of your subscription will be reinvested into your idensphere account                    </p>
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