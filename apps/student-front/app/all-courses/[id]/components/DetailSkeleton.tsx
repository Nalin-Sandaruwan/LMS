"use client"
import * as React from 'react';

export function DetailSkeleton() {
    return (
        <div className="bg-white dark:bg-black min-h-screen">
            <div className="bg-gray-900 py-16">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-4xl space-y-4 animate-pulse">
                        <div className="h-4 bg-gray-700 rounded w-24" />
                        <div className="h-10 bg-gray-700 rounded w-3/4" />
                        <div className="h-6 bg-gray-700 rounded w-1/2" />
                        <div className="flex gap-4 pt-4">
                            <div className="h-4 bg-gray-700 rounded w-32" />
                            <div className="h-4 bg-gray-700 rounded w-32" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="lg:w-2/3 space-y-8 animate-pulse">
                        <div className="h-48 bg-gray-100 dark:bg-gray-800 rounded-2xl w-full" />
                        <div className="space-y-4">
                            <div className="h-6 bg-gray-100 dark:bg-gray-800 rounded w-1/4" />
                            <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-full" />
                            <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-full" />
                        </div>
                    </div>
                    <div className="lg:w-1/3 animate-pulse">
                        <div className="h-96 bg-gray-100 dark:bg-gray-800 rounded-2xl w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}
