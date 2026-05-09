"use client"
import * as React from 'react';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function SecurityForm() {
    return (
        <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 space-y-8">
            <div className="flex items-center gap-3 pb-6 border-b border-gray-100 dark:border-gray-800">
                <Shield className="w-6 h-6 text-purple-500" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Security & Password</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">New Password</label>
                    <Input type="password" placeholder="••••••••" className="h-12 bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-xl" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Confirm New Password</label>
                    <Input type="password" placeholder="••••••••" className="h-12 bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-xl" />
                </div>
                <div className="md:col-span-2">
                    <Button variant="outline" className="font-bold border-gray-200 dark:border-gray-800 rounded-xl">Update Password</Button>
                </div>
            </div>
        </section>
    );
}
