import React from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StepIndicator } from "./StepIndicator";
import { slideVariants } from "./authTypes";

interface StepPasswordProps {
    password: string;
    setPassword: (val: string) => void;
    confirmPw: string;
    setConfirmPw: (val: string) => void;
    showPw: boolean;
    setShowPw: (val: boolean) => void;
    showConfirm: boolean;
    setShowConfirm: (val: boolean) => void;
    agreed: boolean;
    setAgreed: (val: boolean) => void;
    isLoading: boolean;
    onBack: () => void;
    onSubmit: () => void;
}

export function StepPassword({
    password,
    setPassword,
    confirmPw,
    setConfirmPw,
    showPw,
    setShowPw,
    showConfirm,
    setShowConfirm,
    agreed,
    setAgreed,
    isLoading,
    onBack,
    onSubmit,
}: StepPasswordProps) {
    const pwMatch = password && confirmPw && password === confirmPw;

    const pwStrength = (() => {
        if (password.length === 0) return 0;
        let s = 0;
        if (password.length >= 8) s++;
        if (/[A-Z]/.test(password)) s++;
        if (/[0-9]/.test(password)) s++;
        if (/[^A-Za-z0-9]/.test(password)) s++;
        return s;
    })();

    const pwStrengthLabel = ["", "Weak", "Fair", "Good", "Strong"][pwStrength];
    const pwStrengthColor = ["", "bg-red-500", "bg-amber-400", "bg-blue-500", "bg-green-500"][pwStrength];

    const isValid = pwMatch && agreed;

    return (
        <motion.div
            key="password"
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-7"
        >
            {/* Back */}
            <Button
                type="button"
                variant="ghost"
                className="-ml-2 gap-1.5 text-sm font-bold text-gray-500"
                onClick={onBack}
            >
                <ArrowLeft className="w-4 h-4" /> Back
            </Button>

            <div className="space-y-1">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white">Set your password</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    Almost there! Create a strong password to secure your account.
                </p>
            </div>

            <StepIndicator current={2} total={2} />

            <form
                className="space-y-5"
                onSubmit={(e) => { e.preventDefault(); if (isValid) onSubmit(); }}
            >
                {/* Password */}
                <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                        Password <span className="text-red-500">*</span>
                    </label>
                    <Input
                        type={showPw ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Min. 8 characters"
                        required
                        leftIcon={<Lock />}
                        rightIcon={
                            <button
                                type="button"
                                onClick={() => setShowPw(!showPw)}
                                className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                            >
                                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        }
                        className="h-12 rounded-2xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:border-green-500 focus:ring-green-500/30 text-sm"
                    />

                    {/* Strength bar */}
                    {password.length > 0 && (
                        <div className="space-y-1">
                            <div className="flex gap-1">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                                            i <= pwStrength ? pwStrengthColor : "bg-gray-200 dark:bg-gray-700"
                                        }`}
                                    />
                                ))}
                            </div>
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                Strength:{" "}
                                <span className={`${["", "text-red-500", "text-amber-500", "text-blue-500", "text-green-600"][pwStrength]}`}>
                                    {pwStrengthLabel}
                                </span>
                            </p>
                        </div>
                    )}
                </div>

                {/* Confirm password */}
                <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                        Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <Input
                        type={showConfirm ? "text" : "password"}
                        value={confirmPw}
                        onChange={(e) => setConfirmPw(e.target.value)}
                        placeholder="Re-enter your password"
                        required
                        leftIcon={<Lock />}
                        rightIcon={
                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                            >
                                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        }
                        className={`h-12 rounded-2xl bg-white dark:bg-gray-900 text-sm transition-colors ${
                            confirmPw && !pwMatch
                                ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                                : "border-gray-200 dark:border-gray-700 focus:border-green-500 focus:ring-green-500/30"
                        }`}
                    />
                    {confirmPw && !pwMatch && (
                        <p className="text-xs text-red-500 font-medium">Passwords do not match.</p>
                    )}
                    {pwMatch && (
                        <p className="text-xs text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Passwords match
                        </p>
                    )}
                </div>

                {/* Terms */}
                <label className="flex items-start gap-3 cursor-pointer group">
                    <div
                        onClick={() => setAgreed(!agreed)}
                        className={`mt-0.5 w-5 h-5 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${
                            agreed
                                ? "border-green-500 bg-green-500"
                                : "border-gray-300 dark:border-gray-600 group-hover:border-green-400"
                        }`}
                    >
                        {agreed && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        I agree to the{" "}
                        <Link href="#" className="font-bold text-green-600 dark:text-green-400 hover:underline">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="#" className="font-bold text-green-600 dark:text-green-400 hover:underline">
                            Instructor Agreement
                        </Link>
                    </span>
                </label>

                <Button
                    type="submit"
                    disabled={!isValid || isLoading}
                    className="w-full h-12 rounded-2xl font-bold text-sm"
                    style={{
                        background: isValid && !isLoading
                            ? "linear-gradient(135deg, #074C00, #42A341)"
                            : undefined,
                    }}
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            Creating account…
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            Create Instructor Account <ArrowRight className="w-4 h-4" />
                        </span>
                    )}
                </Button>
            </form>
        </motion.div>
    );
}
