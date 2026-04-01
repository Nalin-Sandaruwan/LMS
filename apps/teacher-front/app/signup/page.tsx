"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// ─── Modular Components ───────────────────────────────────────────────────────
import { StepDetails } from "@/components/auth/StepDetails";
import { StepPassword } from "@/components/auth/StepPassword";
import { SignupSuccess } from "@/components/auth/SignupSuccess";
import { BrandPanel } from "@/components/auth/BrandPanel";
import { SignupStep } from "@/components/auth/authTypes";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TeacherSignupPage() {
    const [step, setStep] = useState<SignupStep>("DETAILS");

    // Form state
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [expertise, setExpertise] = useState("");
    const [bio, setBio] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const simulateSubmit = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setStep("SUCCESS");
        }, 1600);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex overflow-hidden font-sans">

            {/* ── Left: Form ── */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10">

                {/* Back to home */}
                <Link
                    href="/"
                    className="absolute top-6 left-6 lg:top-12 lg:left-12 flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Home
                </Link>

                <div className="w-full max-w-md">
                    <AnimatePresence mode="wait">

                        {step === "DETAILS" && (
                            <StepDetails
                                fullName={fullName}
                                setFullName={setFullName}
                                email={email}
                                setEmail={setEmail}
                                phone={phone}
                                setPhone={setPhone}
                                expertise={expertise}
                                setExpertise={setExpertise}
                                bio={bio}
                                setBio={setBio}
                                onNext={() => setStep("PASSWORD")}
                            />
                        )}

                        {step === "PASSWORD" && (
                            <StepPassword
                                password={password}
                                setPassword={setPassword}
                                confirmPw={confirmPw}
                                setConfirmPw={setConfirmPw}
                                showPw={showPw}
                                setShowPw={setShowPw}
                                showConfirm={showConfirm}
                                setShowConfirm={setShowConfirm}
                                agreed={agreed}
                                setAgreed={setAgreed}
                                isLoading={isLoading}
                                onBack={() => setStep("DETAILS")}
                                onSubmit={simulateSubmit}
                            />
                        )}

                        {step === "SUCCESS" && (
                            <SignupSuccess fullName={fullName} />
                        )}

                    </AnimatePresence>
                </div>
            </div>

            {/* ── Right: Brand panel ── */}
            <BrandPanel />
        </div>
    );
}
