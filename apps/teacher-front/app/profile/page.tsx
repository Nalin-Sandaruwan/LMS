"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Edit3, Shield, Zap } from "lucide-react";
import { Navigation } from "@/components/baseComponets/navBar";
import ProtectedRoute from "@/hooks/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";

import { ProfileTab } from "@/components/profile/ProfileTab";
import { EditProfileTab } from "@/components/profile/EditProfileTab";
import { SecurityTab } from "@/components/profile/SecurityTab";

// ─── Types ────────────────────────────────────────────────────────────────────

type ActiveTab = "profile" | "edit" | "security";

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ProfilePage() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<ActiveTab>("profile");

    const tabs: { id: ActiveTab; label: string; icon: React.ElementType }[] = [
        { id: "profile", label: "Profile", icon: User },
        { id: "edit", label: "Edit Profile", icon: Edit3 },
        { id: "security", label: "Security", icon: Shield },
    ];

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-50 dark:bg-black font-sans">
            <Navigation />

            <main className="pt-28 pb-20  container mx-auto">

                {/* Page header */}
                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-green-600 dark:text-green-400 mb-2">
                        <Zap className="w-3.5 h-3.5" /> Account Management
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white">
                        {user?.name ? `Welcome, ${user.name.split(" ")[0]} to your ` : user?.email ? `Welcome, ${user.email.split("@")[0]} to your ` : "Your "}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: "linear-gradient(to right, #074C00, #42A341, #B8E2A3)" }}
                        >
                            Profile
                        </span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">
                        {user?.email ? `Manage settings for ${user.email}.` : "Manage your public profile, account settings, and security."}
                    </p>
                </motion.div>

                {/* Tab bar */}
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                    className="flex gap-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-1.5 mb-8 w-fit"
                >
                    {tabs.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => setActiveTab(id)}
                            className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${activeTab === id
                                ? "text-white"
                                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                }`}
                        >
                            {activeTab === id && (
                                <motion.div
                                    layoutId="activeTabBg"
                                    className="absolute inset-0 rounded-xl"
                                    style={{ background: "linear-gradient(135deg, #074C00, #42A341)" }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className="relative flex items-center gap-2">
                                <Icon className="w-4 h-4" />
                                {label}
                            </span>
                        </button>
                    ))}
                </motion.div>

                {/* Tab content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                    >
                        {activeTab === "profile" && <ProfileTab user={user} />}
                        {activeTab === "edit" && <EditProfileTab user={user} />}
                        {activeTab === "security" && <SecurityTab user={user} />}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
        </ProtectedRoute>
    );
}
