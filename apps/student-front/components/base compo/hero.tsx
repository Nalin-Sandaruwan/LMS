"use client"
import * as React from 'react';
import { HeroBackground } from './hero-components/HeroBackground';
import { HeroContent } from './hero-components/HeroContent';
import { HeroVisuals } from './hero-components/HeroVisuals';

export interface IAppProps { }

export function Hero(props: IAppProps) {
    return (
        <div className='relative flex flex-col items-center justify-center pt-24 pb-12 w-full min-h-screen bg-white dark:bg-gray-950 overflow-hidden transition-colors duration-300'>
            {/* Background Gradients & Decorations */}
            <HeroBackground />

            <div className='flex flex-col w-full container mx-auto px-4 lg:px-8 relative z-10'>
                {/* Top Section: Typography & Call to Action */}
                <HeroContent />

                {/* Bottom Section: Image & Stats Grid */}
                <HeroVisuals />
            </div>
        </div>
    );
}
