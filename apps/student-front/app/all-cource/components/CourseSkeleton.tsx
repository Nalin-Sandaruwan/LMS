"use client"
import * as React from 'react';

export function SkeletonCard() {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 animate-pulse flex flex-col">
            <div className="h-48 w-full bg-gray-200 dark:bg-gray-800" />
            <div className="p-6 flex flex-col gap-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/3" />
                <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
                <div className="mt-auto pt-4 flex justify-between items-center">
                    <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-16" />
                    <div className="h-9 bg-gray-200 dark:bg-gray-800 rounded w-24" />
                </div>
            </div>
        </div>
    );
}

export function CourseSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    );
}
