import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { User, Award, Mail, Phone, MapPin, Globe, AtSign, Link2, Code2, Camera, Save, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export function EditProfileTab({ user }: { user?: UserProfile }) {
    const [form, setForm] = useState({
        name: user?.name || TEACHER.name,
        title: user?.role || TEACHER.title,
        email: user?.email || TEACHER.email,
        phone: TEACHER.phone,
        location: TEACHER.location,
        website: TEACHER.website,
        twitter: TEACHER.twitter,
        linkedin: TEACHER.linkedin,
        github: TEACHER.github,
        bio: TEACHER.bio,
    });
    
    useEffect(() => {
        if (user) {
            setForm(prev => ({
                ...prev,
                name: user.name || prev.name,
                email: user.email || prev.email,
                title: user.role || prev.title,
            }));
        }
    }, [user]);

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
                            value={form[key] || ""}
                            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500 transition-colors resize-none"
                        />
                    ) : (
                        <Input
                            type={type}
                            value={form[key] || ""}
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

    const avatarInitials = form.name ? form.name.substring(0, 2).toUpperCase() : TEACHER.initials;

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
                        {avatarInitials}
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
