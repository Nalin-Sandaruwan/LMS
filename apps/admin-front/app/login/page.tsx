"use client";

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AdminLoginForm } from '@/components/auth/AdminLoginForm';
import { AdminBrandPanel } from '@/components/auth/AdminBrandPanel';

export default function AdminLoginPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex overflow-hidden font-sans">
            {/* Left Side - Authentication Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10">
                {/* Mobile Back to Home */}
                <Link href="/" className="absolute top-6 left-6 lg:top-12 lg:left-12 flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Home
                </Link>

                <div className="w-full max-w-md">
                    <AnimatePresence mode="wait">
                        <AdminLoginForm />
                    </AnimatePresence>
                </div>
            </div>

            {/* Right Side - Premium Graphic Area */}
            <AdminBrandPanel />
        </div>
    );
}
