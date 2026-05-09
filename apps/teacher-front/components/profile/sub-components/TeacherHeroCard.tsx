"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Mail,
    Phone,
    CalendarDays,
    BadgeCheck,
    BookOpen,
    Users,
    Star,
    TrendingUp,
    Sparkles,
} from "lucide-react";
import { fadeUp } from "../animations";
import { getInitials } from "../types";
import { TEACHER } from "../profile-data";

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
    icon: React.ElementType;
    value: string;
    label: string;
    gradient: string;
    glow: string;
}

function StatCard({ icon: Icon, value, label, gradient, glow }: StatCardProps) {
    return (
        <motion.div
            whileHover={{ y: -2, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative flex flex-col items-center gap-1.5 py-5 px-3 overflow-hidden group cursor-default"
        >
            {/* Subtle hover glow */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${glow}`} />

            <div className={`relative w-10 h-10 rounded-2xl flex items-center justify-center mb-0.5 shadow-sm ${gradient}`}>
                <Icon className="w-5 h-5 text-white" />
            </div>
            <span className="relative text-xl font-black text-gray-900 dark:text-white tracking-tight">{value}</span>
            <span className="relative text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{label}</span>
        </motion.div>
    );
}

// ─── Info Pill ────────────────────────────────────────────────────────────────

function InfoPill({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
    return (
        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full">
            <Icon className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate max-w-[180px]">{text}</span>
        </div>
    );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface TeacherHeroCardProps {
    fullName: string;
    email: string;
    expert?: string;
    phone?: string;
    bio?: string;
    profilePic?: string;
    joinDate: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function TeacherHeroCard({
    fullName,
    email,
    expert,
    phone,
    bio,
    profilePic,
    joinDate,
}: TeacherHeroCardProps) {
    const avatarInitials = getInitials(fullName);

    return (
        <motion.div
            variants={fadeUp}
            className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm"
        >
            {/* ── Banner ──────────────────────────────────────────────────── */}
            <div
                className="relative h-44 w-full overflow-hidden"
                style={{ background: "linear-gradient(135deg, #021a01 0%, #074C00 45%, #2d8b2c 75%, #42A341 100%)" }}
            >
                {/* Animated mesh pattern */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.06]" />

                {/* Glowing orbs */}
                <motion.div
                    className="absolute -top-10 -left-10 w-48 h-48 rounded-full opacity-20"
                    style={{ background: "radial-gradient(circle, #42A341, transparent)" }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute -bottom-12 -right-6 w-56 h-56 rounded-full opacity-15"
                    style={{ background: "radial-gradient(circle, #74c373, transparent)" }}
                    animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                />

                {/* Verified badge — top right */}
                <div className="absolute top-4 right-5 flex items-center gap-1.5 text-xs font-bold text-white/90 bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full">
                    <Sparkles className="w-3.5 h-3.5" />
                    Verified Educator
                </div>
            </div>

            {/* ── Profile body ─────────────────────────────────────────────── */}
            <div className="relative px-6 pb-0">

                {/* Avatar — overlaps banner */}
                <div className="flex items-end justify-between -mt-14 mb-5">
                    <div className="relative">
                        {/* Outer glow ring */}
                        <div
                            className="absolute inset-0 rounded-full blur-md opacity-50 scale-110"
                            style={{ background: "linear-gradient(135deg, #42A341, #074C00)" }}
                        />

                        {profilePic ? (
                            <img
                                src={profilePic}
                                alt={fullName}
                                className="relative w-24 h-24 rounded-full border-4 border-white dark:border-gray-900 object-cover shadow-xl"
                                onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).style.display = "none";
                                    // show the sibling fallback
                                    const fallback = (e.currentTarget as HTMLElement).nextElementSibling as HTMLElement;
                                    if (fallback) fallback.style.display = "flex";
                                }}
                            />
                        ) : null}

                        {/* Initials fallback — always rendered, hidden when photo is valid */}
                        <div
                            className="relative w-24 h-24 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center text-3xl font-black text-white shadow-xl"
                            style={{
                                background: "linear-gradient(135deg, #074C00, #42A341)",
                                display: profilePic ? "none" : "flex",
                            }}
                        >
                            {avatarInitials}
                        </div>

                        {/* Verified tick badge */}
                        <div className="absolute -bottom-0.5 -right-0.5 w-7 h-7 rounded-full bg-green-500 flex items-center justify-center border-2 border-white dark:border-gray-900 shadow-sm">
                            <BadgeCheck className="w-4 h-4 text-white" />
                        </div>
                    </div>
                </div>

                {/* Name & expert */}
                <h2 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">
                    {fullName}
                </h2>

                {expert && (
                    <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-full">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span className="text-xs font-bold text-green-700 dark:text-green-400">{expert}</span>
                    </div>
                )}

                {/* Info pills row */}
                <div className="flex flex-wrap gap-2 mt-4 pb-6">
                    <InfoPill icon={Mail} text={email} />
                    {phone && <InfoPill icon={Phone} text={phone} />}
                    <InfoPill icon={CalendarDays} text={`Joined ${joinDate}`} />
                </div>

                {/* Bio */}

            </div>

            {/* ── Stats strip ──────────────────────────────────────────────── */}
            {/* <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-100 dark:divide-gray-800">
                <StatCard
                    icon={BookOpen}
                    value={String(TEACHER.courses)}
                    label="Courses"
                    gradient="bg-gradient-to-br from-green-500 to-emerald-600"
                    glow="bg-green-50 dark:bg-green-900/20"
                />
                <StatCard
                    icon={Users}
                    value={TEACHER.students.toLocaleString()}
                    label="Students"
                    gradient="bg-gradient-to-br from-blue-500 to-indigo-600"
                    glow="bg-blue-50 dark:bg-blue-900/20"
                />
                <StatCard
                    icon={Star}
                    value={String(TEACHER.rating)}
                    label="Avg Rating"
                    gradient="bg-gradient-to-br from-amber-400 to-orange-500"
                    glow="bg-amber-50 dark:bg-amber-900/20"
                />
                <StatCard
                    icon={TrendingUp}
                    value={`$${(TEACHER.revenue / 1000).toFixed(0)}k`}
                    label="Revenue"
                    gradient="bg-gradient-to-br from-violet-500 to-purple-600"
                    glow="bg-violet-50 dark:bg-violet-900/20"
                />
            </div> */}
        </motion.div>
    );
}
