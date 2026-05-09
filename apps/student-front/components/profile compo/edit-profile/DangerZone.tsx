"use client"
import * as React from 'react';
import { Bell, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DangerZone() {
    return (
        <section className="bg-red-50/50 dark:bg-red-950/10 rounded-3xl p-8 border border-red-100 dark:border-red-900/30 space-y-6">
            <div className="flex items-center gap-3">
                <Bell className="w-6 h-6 text-red-500" />
                <h2 className="text-xl font-bold text-red-900 dark:text-red-500">Danger Zone</h2>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Delete Account</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Permanently delete your account and all associated data.</p>
                </div>
                <Button variant="destructive" className="font-bold rounded-xl h-12 px-6">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete My Account
                </Button>
            </div>
        </section>
    );
}
