"use client"
import * as React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";

import Link from 'next/link';

export function ErrorState() {
    return (
        <>
            <main className="grow flex items-center justify-center p-6">
                <div className="text-center space-y-4 max-w-sm">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto">
                        <AlertCircle className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Course Not Found</h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        We couldn't find the course you're looking for. It might have been removed or the link is incorrect.
                    </p>
                    <Button asChild className="w-full">
                        <Link href="/all-courses">Browse All Courses</Link>
                    </Button>
                </div>
            </main>
        </>
    );
}
