"use client"
import * as React from 'react';
import { VibeHeader } from './vibe-components/VibeHeader';
import { VibeActions } from './vibe-components/VibeActions';
import { VibeNetwork } from './vibe-components/VibeNetwork';

export function VibeSection() {
    return (
        <section className="relative w-full py-24 bg-white dark:bg-gray-950 overflow-hidden">

            {/* Mesh Gradient Background (Static) */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Blue Blob */}
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[60%] bg-blue-500/20 dark:bg-blue-600/10 rounded-full blur-[120px]" />
                {/* Pink Blob */}
                <div className="absolute top-[10%] right-[-5%] w-[45%] h-[55%] bg-pink-400/20 dark:bg-pink-500/10 rounded-full blur-[100px]" />
            </div>

            {/* Grid Background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
                style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">

                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
                    <VibeHeader />
                    <VibeActions />
                </div>

                {/* Network Illustration Area */}
                <VibeNetwork />
            </div>
        </section>
    );
}
