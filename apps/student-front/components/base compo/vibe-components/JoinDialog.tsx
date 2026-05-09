"use client"
import * as React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../../ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../ui/dialog";

export function JoinDialog({ children }: { children?: React.ReactNode }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children || (
                    <button className="px-6 py-2.5 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 rounded-lg font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-900">
                        Get started free
                    </button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 duration-0 data-[state=open]:animate-none data-[state=closed]:animate-none">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-[#1B1D36] dark:text-white">How would you like to join with us?</DialogTitle>
                    <DialogDescription className="text-gray-500 dark:text-gray-400">
                        Choose your role to get started with our platform.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <Button asChild variant="default" className="w-full h-12 bg-[#4F46E5] hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-3 group">
                        <Link href="/login">
                            <span>Join as a Learner</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full h-12 border-gray-200 dark:border-gray-800 text-[#1B1D36] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 rounded-xl font-bold flex items-center justify-center gap-3 group">
                        <a href="https://teacher.idensphere.com/teacher/login" target="_blank" rel="noopener noreferrer">
                            <span>Join as a Lecturer</span>
                            <ArrowRight className="w-5 h-5" />
                        </a>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
