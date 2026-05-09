"use client"
import * as React from 'react';
import { JoinDialog } from './JoinDialog';
import Link from 'next/link';
import { Button } from '../../ui/button';

export function VibeActions() {
    return (
        <div className="max-w-md">
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm font-medium">
                Stepby is an AI-powered platform offering tools, integrations, and resources for marketing, sales, and customer service.
            </p>
            <div className="flex gap-4">
                <Button asChild className="px-6 h-12 bg-[#4F46E5] hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/20">
                    <Link href="/about_us">
                        Learn More
                    </Link>
                </Button>
                <JoinDialog />
            </div>
        </div>
    );
}
