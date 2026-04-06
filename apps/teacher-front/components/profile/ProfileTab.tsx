import React from "react";
import { motion, type Variants } from "framer-motion";
import {
    MapPin,
    Mail,
    Clock,
    BookOpen,
    Users,
    Star,
    TrendingUp,
    BadgeCheck,
    Zap,
    Award,
    Globe,
    Phone,
    AtSign,
    Link2,
    Code2,
    Activity,
    CheckCircle2,
} from "lucide-react";
import { TEACHER } from "./profile-data";
import { UserProfile } from "@/hooks/useAuth";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};


const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

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

export function ProfileTab({ user }: { user?: UserProfile }) {
    // Provide defaults for UI missing from user payload
    const fallbackName = user?.email ? user.email.split("@")[0] : TEACHER.name;
    const avatarInitials = user?.name ? user.name.substring(0, 2).toUpperCase() : fallbackName.substring(0, 2).toUpperCase();
    const teacherName = user?.name || fallbackName;
    const teacherEmail = user?.email || TEACHER.email;

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
                                {avatarInitials}
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
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white">{teacherName}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-0.5">{user?.role || TEACHER.title}</p>

                    {/* Quick info */}
                    <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-xs text-gray-400 dark:text-gray-500 font-medium">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {TEACHER.location}</span>
                        <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {teacherEmail}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Member since {TEACHER.joinDate}</span>
                    </div>

                    {/* Bio */}
                   
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
                         <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-4">
                        {TEACHER.bio}
                    </p>
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
