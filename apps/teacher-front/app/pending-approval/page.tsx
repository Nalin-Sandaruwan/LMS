"use client"
import * as React from 'react';
import { motion } from 'framer-motion';
import { Clock, ShieldCheck, Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PendingApprovalPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center p-6 font-sans">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-pulse pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-pulse delay-1000 pointer-events-none"></div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 dark:border-gray-800 text-center relative z-10"
            >
                <div className="w-20 h-20 bg-amber-100 dark:bg-amber-500/20 rounded-2xl flex items-center justify-center text-amber-600 dark:text-amber-500 mx-auto mb-8 shadow-inner">
                    <Clock className="w-10 h-10" />
                </div>

                <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
                    Registration Pending Approval
                </h1>
                
                <p className="text-lg text-gray-600 dark:text-gray-400 font-medium mb-8 leading-relaxed">
                    Thank you for joining Idensphere as a creator! Your account has been created via Google, but it requires <span className="text-gray-900 dark:text-white font-bold">Admin Approval</span> before you can start creating courses.
                </p>

                <div className="grid gap-4 mb-10">
                    <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800 text-left">
                        <div className="mt-1 bg-blue-100 dark:bg-blue-500/20 p-2 rounded-lg">
                            <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-white">Verification Process</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Our team reviews all teacher applications to maintain platform quality.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800 text-left">
                        <div className="mt-1 bg-purple-100 dark:bg-purple-500/20 p-2 rounded-lg">
                            <Mail className="w-5 h-5 text-purple-600 dark:text-purple-500" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-white">Email Notification</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">You will receive an email once your account is activated.</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/login" className="flex-1">
                        <Button variant="outline" className="w-full h-12 rounded-xl font-bold flex items-center justify-center gap-2">
                            <ArrowLeft className="w-4 h-4" /> Back to Login
                        </Button>
                    </Link>
                    <Button className="flex-1 h-12 rounded-xl font-bold bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200">
                        Contact Support
                    </Button>
                </div>
                
                <p className="mt-8 text-sm text-gray-400 font-medium italic">
                    Usually takes 24-48 hours for review.
                </p>
            </motion.div>
        </div>
    );
}
