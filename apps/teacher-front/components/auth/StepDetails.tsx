import React from "react";
import { motion } from "framer-motion";
import { Mail, User, Phone, ArrowRight, Zap, GraduationCap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { StepIndicator } from "./StepIndicator";
import { slideVariants, EXPERTISE_OPTIONS } from "./authTypes";

interface StepDetailsProps {
    fullName: string;
    setFullName: (val: string) => void;
    email: string;
    setEmail: (val: string) => void;
    phone: string;
    setPhone: (val: string) => void;
    expertise: string;
    setExpertise: (val: string) => void;
    bio: string;
    setBio: (val: string) => void;
    onNext: () => void;
}

export function StepDetails({
    fullName,
    setFullName,
    email,
    setEmail,
    phone,
    setPhone,
    expertise,
    setExpertise,
    bio,
    setBio,
    onNext,
}: StepDetailsProps) {
    const isValid = fullName.trim() && email.trim() && expertise;

    return (
        <motion.div
            key="details"
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-7"
        >
            {/* Heading */}
            <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-green-600 dark:text-green-400 mb-1">
                    <Zap className="w-3.5 h-3.5" /> Start Teaching
                </div>
                <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                    Create your<br />
                    <span
                        className="text-transparent bg-clip-text"
                        style={{ backgroundImage: "linear-gradient(to right, #074C00, #42A341, #B8E2A3)" }}
                    >
                        Instructor Account
                    </span>
                </h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="font-bold text-green-600 dark:text-green-400 hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>

            {/* Step indicator */}
            <StepIndicator current={1} total={2} />

            {/* Form */}
            <form
                className="space-y-4"
                onSubmit={(e) => { e.preventDefault(); if (isValid) onNext(); }}
            >
                {/* Full name */}
                <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Jane Smith"
                        required
                        leftIcon={<User />}
                        className="h-12 rounded-2xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:border-green-500 focus:ring-green-500/30 text-sm"
                    />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                        Email Address <span className="text-red-500">*</span>
                    </label>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jane@example.com"
                        required
                        leftIcon={<Mail />}
                        className="h-12 rounded-2xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:border-green-500 focus:ring-green-500/30 text-sm"
                    />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Phone Number</label>
                    <Input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        leftIcon={<Phone />}
                        className="h-12 rounded-2xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:border-green-500 focus:ring-green-500/30 text-sm"
                    />
                </div>

                {/* Expertise */}
                <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                        Teaching Expertise <span className="text-red-500">*</span>
                    </label>
                    <Select value={expertise} onValueChange={setExpertise} required>
                        <SelectTrigger className="h-12 rounded-2xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:border-green-500 focus:ring-green-500/30 text-sm pl-10 relative">
                            <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            <SelectValue placeholder="Select your primary subject…" />
                        </SelectTrigger>
                        <SelectContent>
                            {EXPERTISE_OPTIONS.map((o) => (
                                <SelectItem key={o} value={o}>{o}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Short bio */}
                <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                        Short Bio
                        <span className="ml-1 text-xs font-normal text-gray-400">(optional)</span>
                    </label>
                    <Textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows={3}
                        maxLength={300}
                        placeholder="Tell students a little about yourself and your teaching background…"
                        className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus-visible:border-green-500 focus-visible:ring-green-500/30 text-sm px-4"
                    />
                    <p className="text-xs text-gray-400 text-right">{bio.length}/300</p>
                </div>

                <Button
                    type="submit"
                    disabled={!isValid}
                    className="w-full h-12 rounded-2xl font-bold text-sm"
                    style={{ background: isValid ? "linear-gradient(135deg, #074C00, #42A341)" : undefined }}
                >
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </form>
        </motion.div>
    );
}
