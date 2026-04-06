import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Shield, Key, Lock, EyeOff, Eye, X, CheckCircle2, Smartphone, Activity, AlertTriangle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ACTIVITY_LOG } from "./profile-data";
import { UserProfile } from "@/hooks/useAuth";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export function SecurityTab({ user }: { user?: UserProfile }) {
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
