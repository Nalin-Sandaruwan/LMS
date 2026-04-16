"use client"
import * as React from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/base compo/navigation';
import { Footer } from '@/components/base compo/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ProfileNav } from '@/components/profile compo/profileNav';
import { User, Mail, Camera, Save, Shield, Bell, Trash2 } from 'lucide-react';
import { useAuth } from '@/app/hooks/api hooks/useAuth';

export default function EditProfilePage() {
    const { data: user, isLoading } = useAuth();

    return (
        <div className="relative flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
            <Navigation />

            <main className="grow pt-24 pb-20">
                {/* Hero Banner Section */}
                <div className="relative w-full h-32 md:h-48 overflow-hidden bg-gray-900 border-b border-gray-800">
                    <motion.div
                        className="absolute inset-0 bg-linear-to-r from-blue-600 via-purple-600 to-indigo-800 opacity-90 mix-blend-multiply"
                        animate={{ filter: ["hue-rotate(0deg)", "hue-rotate(360deg)"] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
                </div>

                <div className="container mx-auto px-4 md:px-6 relative -mt-8 z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12">
                        {/* Left Sidebar Menu */}
                        <ProfileNav />

                        {/* Right Main Column */}
                        <div className="lg:col-span-3 space-y-8">
                            
                            {/* Account Header */}
                            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center gap-8">
                                <div className="relative group">
                                    <Avatar className="w-32 h-32 border-4 border-white dark:border-gray-850 shadow-xl bg-gray-100 dark:bg-gray-800">
                                        <AvatarFallback className="text-4xl bg-blue-100 text-blue-700 font-black uppercase">
                                            {user?.email?.substring(0, 2) || 'GU'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors border-2 border-white dark:border-gray-900">
                                        <Camera className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">My Account</h1>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium">Manage your public profile and account settings.</p>
                                </div>
                                <Button className="font-bold shadow-lg shadow-blue-500/20 px-8 h-12 rounded-xl">
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Changes
                                </Button>
                            </div>

                            {/* Settings Forms */}
                            <div className="grid grid-cols-1 gap-8">
                                
                                {/* Personal Information */}
                                <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 space-y-8">
                                    <div className="flex items-center gap-3 pb-6 border-b border-gray-100 dark:border-gray-800">
                                        <User className="w-6 h-6 text-blue-500" />
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Personal Information</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Display Name</label>
                                            <Input defaultValue="Guest User" className="h-12 bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-xl" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Email Address</label>
                                            <Input disabled value={user?.email || "guest@example.com"} className="h-12 bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl opacity-60 cursor-not-allowed" />
                                            <p className="text-xs text-gray-400 font-medium">Email cannot be changed.</p>
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Bio</label>
                                            <textarea 
                                                className="w-full min-h-[120px] p-4 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-hidden transition-all"
                                                placeholder="Tell us about yourself..."
                                            />
                                        </div>
                                    </div>
                                </section>

                                {/* Security Section */}
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

                                {/* Danger Zone */}
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

                            </div>

                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
