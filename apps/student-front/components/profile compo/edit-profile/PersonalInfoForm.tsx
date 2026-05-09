"use client"
import * as React from 'react';
import { User, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface PersonalInfoFormProps {
    fullName: string;
    setFullName: (value: string) => void;
    mobileNumber: string;
    setMobileNumber: (value: string) => void;
    email: string;
    isPending: boolean;
    onSave: () => void;
}

export function PersonalInfoForm({
    fullName,
    setFullName,
    mobileNumber,
    setMobileNumber,
    email,
    isPending,
    onSave
}: PersonalInfoFormProps) {
    return (
        <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                    <User className="w-6 h-6 text-blue-500" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Personal Information</h2>
                </div>
                <Button 
                    onClick={onSave}
                    disabled={isPending}
                    className="font-bold shadow-lg shadow-blue-500/20 px-6 h-10 rounded-xl text-sm"
                >
                    {isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    {isPending ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Display Name</label>
                    <Input 
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)}
                        className="h-12 bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-xl" 
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Mobile Number</label>
                    <Input 
                        value={mobileNumber} 
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="+94 77 123 4567" 
                        className="h-12 bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-xl" 
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Email Address</label>
                    <Input disabled value={email || "guest@example.com"} className="h-12 bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl opacity-60 cursor-not-allowed" />
                    <p className="text-xs text-gray-400 font-medium">Email cannot be changed.</p>
                </div>
            </div>
        </section>
    );
}
