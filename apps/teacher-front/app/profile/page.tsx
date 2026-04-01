"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Globe,
    AtSign,
    Link2,
    Code2,
    BookOpen,
    Users,
    Star,
    Award,
    Edit3,
    Lock,
    Shield,
    Eye,
    EyeOff,
    CheckCircle2,
    AlertTriangle,
    Smartphone,
    Key,
    LogOut,
    Camera,
    Save,
    X,
    ChevronRight,
    TrendingUp,
    Clock,
    Zap,
    BadgeCheck,
    Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/baseComponets/navBar";

// ─── Types ────────────────────────────────────────────────────────────────────

type ActiveTab = "profile" | "edit" | "security";

// ─── Mock Data ─────────────────────────────────────────────────────────────────

const TEACHER = {
    name: "Dr. Ashan Perera",
    title: "Senior Full-Stack Developer & Educator",
    email: "ashan.perera@lms.edu",
    phone: "+94 77 123 4567",
    location: "Colombo, Sri Lanka",
    website: "https://ashanperera.dev",
    twitter: "@ashanperera",
    linkedin: "linkedin.com/in/ashanperera",
    github: "github.com/ashandev",
    bio: "Passionate educator with 8+ years of industry experience in full-stack development. I specialize in teaching modern web technologies, system design, and helping students bridge the gap between academia and the real world. Founder of DevSL community with 12k+ members.",
    joinDate: "January 2023",
    avatar: null as null | string,
    initials: "AP",
    verified: true,
    courses: 6,
    students: 7984,
    rating: 4.8,
    reviews: 1357,
    revenue: 124905,
    expertise: ["Next.js", "TypeScript", "React", "Node.js", "PostgreSQL", "Docker"],
    sessionsThisMonth: 14,
    hoursTeaching: 312,
};

const ACTIVITY_LOG = [
    { id: 1, action: "Logged in from Chrome · Windows", time: "Today, 9:14 AM", icon: Activity, safe: true },
    { id: 2, action: "Password changed", time: "Mar 28, 2026 · 11:02 PM", icon: Key, safe: true },
    { id: 3, action: "New device login · Mobile Safari", time: "Mar 15, 2026 · 7:45 AM", icon: Smartphone, safe: false },
    { id: 4, action: "Two-factor authentication enabled", time: "Jan 10, 2026 · 3:21 PM", icon: Shield, safe: true },
];

// ─── Animation Variants ────────────────────────────────────────────────────────

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

// ─── Sub-components ────────────────────────────────────────────────────────────

function StatPill({ icon: Icon, value, label, color }: {
    icon: React.ElementType; value: string; label: string; color: string;
}) {
    return (
        <div className="flex flex-col items-center gap-1 px-4 py-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-1 ${color}`}>
                <Icon className="w-4.5 h-4.5" />
            </div>
            <span className="text-lg font-black text-gray-900 dark:text-white">{value}</span>
            <span className="text-xs font-medium text-gray-400 dark:text-gray-500">{label}</span>
        </div>
    );
}

function SectionCard({ title, icon: Icon, children, className = "" }: {
    title: string; icon: React.ElementType; children: React.ReactNode; className?: string;
}) {
    return (
        <motion.div
            variants={fadeUp}
            className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 ${className}`}
        >
            <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-600 dark:text-green-400">
                    <Icon className="w-4 h-4" />
                </div>
                <h2 className="font-bold text-gray-900 dark:text-white text-base">{title}</h2>
            </div>
            {children}
        </motion.div>
    );
}

// ─── Tab: Profile Showcase ─────────────────────────────────────────────────────

function ProfileTab() {
    return (
        <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-5">

            {/* Hero card */}
            <motion.div
                variants={fadeUp}
                className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm"
            >
                {/* Banner */}
                <div
                    className="h-32 w-full"
                    style={{ background: "linear-gradient(135deg, #021a01 0%, #074C00 40%, #42A341 100%)" }}
                >
                    <div className="absolute inset-0 h-32 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05]" />
                </div>

                <div className="px-6 pb-6">
                    {/* Avatar */}
                    <div className="flex items-end justify-between -mt-10 mb-4">
                        <div className="relative">
                            <div
                                className="w-20 h-20 rounded-2xl border-4 border-white dark:border-gray-900 flex items-center justify-center text-2xl font-black text-white shadow-lg"
                                style={{ background: "linear-gradient(135deg, #074C00, #42A341)" }}
                            >
                                {TEACHER.initials}
                            </div>
                            {TEACHER.verified && (
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center border-2 border-white dark:border-gray-900">
                                    <BadgeCheck className="w-3.5 h-3.5 text-white" />
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 px-3 py-1.5 rounded-full">
                            <Zap className="w-3.5 h-3.5" /> Verified Educator
                        </div>
                    </div>

                    {/* Name & title */}
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white">{TEACHER.name}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-0.5">{TEACHER.title}</p>

                    {/* Quick info */}
                    <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-xs text-gray-400 dark:text-gray-500 font-medium">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {TEACHER.location}</span>
                        <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {TEACHER.email}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Member since {TEACHER.joinDate}</span>
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mt-4 border-t border-gray-100 dark:border-gray-800 pt-4">
                        {TEACHER.bio}
                    </p>
                </div>

                {/* Stats strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-gray-100 dark:border-gray-800 divide-x divide-gray-100 dark:divide-gray-800">
                    <StatPill icon={BookOpen} value={String(TEACHER.courses)} label="Courses" color="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" />
                    <StatPill icon={Users} value={TEACHER.students.toLocaleString()} label="Students" color="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" />
                    <StatPill icon={Star} value={String(TEACHER.rating)} label="Avg Rating" color="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400" />
                    <StatPill icon={TrendingUp} value={`$${(TEACHER.revenue / 1000).toFixed(0)}k`} label="Revenue" color="bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400" />
                </div>
            </motion.div>

            {/* Two-col grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Expertise */}
                <SectionCard title="Areas of Expertise" icon={Award}>
                    <div className="flex flex-wrap gap-2">
                        {TEACHER.expertise.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </SectionCard>

                {/* Contact & Social */}
                <SectionCard title="Contact & Social" icon={Globe}>
                    <div className="space-y-3">
                        {[
                            { icon: Phone, label: TEACHER.phone },
                            { icon: Globe, label: TEACHER.website },
                            { icon: AtSign, label: TEACHER.twitter },
                            { icon: Link2, label: TEACHER.linkedin },
                            { icon: Code2, label: TEACHER.github },
                        ].map(({ icon: Icon, label }) => (
                            <div key={label} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 font-medium">
                                <Icon className="w-4 h-4 text-green-500 shrink-0" />
                                <span className="truncate">{label}</span>
                            </div>
                        ))}
                    </div>
                </SectionCard>

                {/* Teaching Activity */}
                <SectionCard title="Teaching Activity" icon={Activity} className="md:col-span-2">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                            { label: "Reviews", value: TEACHER.reviews.toLocaleString(), icon: Star, color: "text-amber-500" },
                            { label: "Total Hours Taught", value: `${TEACHER.hoursTeaching}h`, icon: Clock, color: "text-blue-500" },
                            { label: "Sessions This Month", value: String(TEACHER.sessionsThisMonth), icon: Activity, color: "text-violet-500" },
                            { label: "Completion Rate", value: "71%", icon: CheckCircle2, color: "text-green-600 dark:text-green-400" },
                        ].map(({ label, value, icon: Icon, color }) => (
                            <div key={label} className="bg-gray-50 dark:bg-gray-800/60 rounded-2xl p-4 text-center">
                                <Icon className={`w-5 h-5 mx-auto mb-2 ${color}`} />
                                <p className="text-xl font-black text-gray-900 dark:text-white">{value}</p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 font-medium">{label}</p>
                            </div>
                        ))}
                    </div>
                </SectionCard>
            </div>
        </motion.div>
    );
}

// ─── Tab: Edit Profile ─────────────────────────────────────────────────────────

function EditProfileTab() {
    const [form, setForm] = useState({
        name: TEACHER.name,
        title: TEACHER.title,
        email: TEACHER.email,
        phone: TEACHER.phone,
        location: TEACHER.location,
        website: TEACHER.website,
        twitter: TEACHER.twitter,
        linkedin: TEACHER.linkedin,
        github: TEACHER.github,
        bio: TEACHER.bio,
    });
    const [saved, setSaved] = useState(false);

    const field = (key: keyof typeof form, label: string, icon: React.ElementType, type = "text", multiline = false) => {
        const Icon = icon;
        return (
            <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide">{label}</label>
                <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                        <Icon className="w-4 h-4" />
                    </div>
                    {multiline ? (
                        <textarea
                            rows={4}
                            value={form[key]}
                            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500 transition-colors resize-none"
                        />
                    ) : (
                        <Input
                            type={type}
                            value={form[key]}
                            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                            className="pl-9 h-11 rounded-xl bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-sm focus:ring-green-500/40 focus:border-green-500"
                        />
                    )}
                </div>
            </div>
        );
    };

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-5">

            {/* Avatar editor */}
            <motion.div variants={fadeUp} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6">
                <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Camera className="w-4 h-4 text-green-500" /> Profile Photo
                </h2>
                <div className="flex items-center gap-5">
                    <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-md shrink-0"
                        style={{ background: "linear-gradient(135deg, #074C00, #42A341)" }}
                    >
                        {TEACHER.initials}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm" className="rounded-xl border-green-300 dark:border-green-800 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20">
                            <Camera className="w-3.5 h-3.5 mr-2" /> Upload New Photo
                        </Button>
                        <p className="text-xs text-gray-400 dark:text-gray-500">JPG, PNG or WEBP. Max 2MB.</p>
                    </div>
                </div>
            </motion.div>

            {/* Personal info */}
            <motion.div variants={fadeUp} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6">
                <h2 className="font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                    <User className="w-4 h-4 text-green-500" /> Personal Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {field("name", "Full Name", User)}
                    {field("title", "Professional Title", Award)}
                    {field("email", "Email Address", Mail, "email")}
                    {field("phone", "Phone Number", Phone, "tel")}
                    {field("location", "Location", MapPin)}
                    {field("website", "Website URL", Globe, "url")}
                </div>
                <div className="mt-4">
                    {field("bio", "Bio / About", User, "text", true)}
                </div>
            </motion.div>

            {/* Social links */}
            <motion.div variants={fadeUp} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6">
                <h2 className="font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-green-500" /> Social Links
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {field("twitter", "Twitter / X", AtSign)}
                    {field("linkedin", "LinkedIn", Link2)}
                    {field("github", "GitHub", Code2)}
                </div>
            </motion.div>

            {/* Save */}
            <motion.div variants={fadeUp} className="flex items-center justify-between bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-5">
                <AnimatePresence>
                    {saved && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2 text-sm font-bold text-green-600 dark:text-green-400"
                        >
                            <CheckCircle2 className="w-4 h-4" /> Profile saved successfully!
                        </motion.div>
                    )}
                    {!saved && <span className="text-xs text-gray-400 dark:text-gray-500">Changes are saved to your account instantly.</span>}
                </AnimatePresence>
                <Button onClick={handleSave} className="h-11 px-7 rounded-2xl font-bold shadow-md shadow-green-500/20">
                    <Save className="w-4 h-4 mr-2" /> Save Changes
                </Button>
            </motion.div>
        </motion.div>
    );
}

// ─── Tab: Security ─────────────────────────────────────────────────────────────

function SecurityTab() {
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [twoFA, setTwoFA] = useState(true);
    const [pwSaved, setPwSaved] = useState(false);
    const [passwords, setPasswords] = useState({ current: "", newPw: "", confirm: "" });

    const strength = passwords.newPw.length === 0 ? 0
        : passwords.newPw.length < 6 ? 1
            : passwords.newPw.length < 10 ? 2
                : 3;

    const strengthLabels = ["", "Weak", "Good", "Strong"];
    const strengthColors = ["", "bg-red-400", "bg-amber-400", "bg-green-500"];

    const handlePasswordSave = () => {
        if (passwords.newPw !== passwords.confirm || !passwords.current) return;
        setPwSaved(true);
        setPasswords({ current: "", newPw: "", confirm: "" });
        setTimeout(() => setPwSaved(false), 3000);
    };

    const pwField = (
        key: "current" | "newPw" | "confirm",
        label: string,
        show: boolean,
        toggle: () => void
    ) => (
        <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide">{label}</label>
            <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                    type={show ? "text" : "password"}
                    value={passwords[key]}
                    onChange={(e) => setPasswords({ ...passwords, [key]: e.target.value })}
                    placeholder="••••••••"
                    className="pl-9 pr-10 h-11 rounded-xl bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-sm"
                />
                <button
                    type="button"
                    onClick={toggle}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                    {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
            </div>
        </div>
    );

    return (
        <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-5">

            {/* Change Password */}
            <motion.div variants={fadeUp} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6">
                <h2 className="font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                    <Key className="w-4 h-4 text-green-500" /> Change Password
                </h2>
                <div className="space-y-4 max-w-md">
                    {pwField("current", "Current Password", showCurrent, () => setShowCurrent(!showCurrent))}
                    {pwField("newPw", "New Password", showNew, () => setShowNew(!showNew))}

                    {/* Strength meter */}
                    {passwords.newPw.length > 0 && (
                        <div className="space-y-1">
                            <div className="flex gap-1.5">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${i <= strength ? strengthColors[strength] : "bg-gray-200 dark:bg-gray-700"
                                            }`}
                                    />
                                ))}
                            </div>
                            <p className={`text-xs font-bold ${strength === 1 ? "text-red-500" : strength === 2 ? "text-amber-500" : "text-green-500"
                                }`}>
                                {strengthLabels[strength]} password
                            </p>
                        </div>
                    )}

                    {pwField("confirm", "Confirm New Password", showConfirm, () => setShowConfirm(!showConfirm))}

                    {/* Mismatch warning */}
                    {passwords.confirm && passwords.newPw !== passwords.confirm && (
                        <p className="text-xs font-bold text-red-500 flex items-center gap-1">
                            <X className="w-3.5 h-3.5" /> Passwords do not match
                        </p>
                    )}
                </div>

                <div className="mt-5 flex items-center gap-4">
                    <Button
                        onClick={handlePasswordSave}
                        disabled={!passwords.current || passwords.newPw !== passwords.confirm || strength < 2}
                        className="h-11 px-6 rounded-2xl font-bold"
                    >
                        <Lock className="w-4 h-4 mr-2" /> Update Password
                    </Button>
                    <AnimatePresence>
                        {pwSaved && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-sm font-bold text-green-600 dark:text-green-400 flex items-center gap-1"
                            >
                                <CheckCircle2 className="w-4 h-4" /> Password updated!
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Two-Factor Auth */}
            <motion.div variants={fadeUp} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-600 dark:text-green-400">
                            <Smartphone className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="font-bold text-gray-900 dark:text-white text-sm">Two-Factor Authentication</h2>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                Add an extra layer of security to your account
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setTwoFA(!twoFA)}
                        className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${twoFA ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
                            }`}
                    >
                        <motion.span
                            layout
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm ${twoFA ? "left-6" : "left-0.5"
                                }`}
                        />
                    </button>
                </div>
                {twoFA && (
                    <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl flex items-center gap-2 text-xs font-semibold text-green-700 dark:text-green-400">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        2FA is active. Your account is protected with authenticator app verification.
                    </div>
                )}
            </motion.div>

            {/* Recent Activity */}
            <motion.div variants={fadeUp} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6">
                <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-green-500" /> Recent Account Activity
                </h2>
                <div className="space-y-3">
                    {ACTIVITY_LOG.map((log) => {
                        const Icon = log.icon;
                        return (
                            <div key={log.id} className="flex items-start gap-3 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${log.safe
                                    ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                                    : "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                                    }`}>
                                    <Icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{log.action}</p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{log.time}</p>
                                </div>
                                {!log.safe && (
                                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-700">
                                        <AlertTriangle className="w-3 h-3" /> Review
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </motion.div>

            {/* Danger Zone */}
            <motion.div variants={fadeUp} className="bg-white dark:bg-gray-900 border border-red-200 dark:border-red-900/50 rounded-3xl p-6">
                <h2 className="font-bold text-red-600 dark:text-red-400 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> Danger Zone
                </h2>
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/40">
                        <p className="text-sm font-bold text-gray-900 dark:text-white">Sign out all devices</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 mb-3">
                            This will immediately revoke all active sessions across all devices.
                        </p>
                        <Button variant="outline" size="sm" className="rounded-xl border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30">
                            <LogOut className="w-3.5 h-3.5 mr-1.5" /> Sign Out All
                        </Button>
                    </div>
                    <div className="flex-1 p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/40">
                        <p className="text-sm font-bold text-gray-900 dark:text-white">Delete Account</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 mb-3">
                            Permanently remove your account and all associated data. This cannot be undone.
                        </p>
                        <Button variant="outline" size="sm" className="rounded-xl border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30">
                            <X className="w-3.5 h-3.5 mr-1.5" /> Delete Account
                        </Button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<ActiveTab>("profile");

    const tabs: { id: ActiveTab; label: string; icon: React.ElementType }[] = [
        { id: "profile", label: "Profile", icon: User },
        { id: "edit", label: "Edit Profile", icon: Edit3 },
        { id: "security", label: "Security", icon: Shield },
    ];

    return (
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
                        Your{" "}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: "linear-gradient(to right, #074C00, #42A341, #B8E2A3)" }}
                        >
                            Profile
                        </span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">
                        Manage your public profile, account settings, and security.
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
                        {activeTab === "profile" && <ProfileTab />}
                        {activeTab === "edit" && <EditProfileTab />}
                        {activeTab === "security" && <SecurityTab />}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}
