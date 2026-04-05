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
import { useTeacherSignup } from "@/hooks/useAuth";
import { toast } from "sonner";
import { AxiosError } from "axios";

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

    // Retrieve mutate and loading states from our new custom React Query hook
    const { mutateAsync: signupTeacher, isPending: isLoading } = useTeacherSignup();

    const simulateSubmit = async () => {
        try {
            await signupTeacher({
                name: fullName,
                email,
                phone,
                expertise,
                bio,
                password,
            });
            // If the mutation succeeds:
            toast.success("Account created successfully!");
            setStep("SUCCESS");
        } catch (error) {
            console.error("Signup failed:", error);
            
            // Extract the error message specifically if it comes from the NestJS backend
            let errorMessage = "An unexpected error occurred. Please try again.";
            
            if (error instanceof AxiosError && error.response?.data) {
                const backendData = error.response.data;
                // NestJS typically wraps errors in a message array or string
                if (Array.isArray(backendData.message)) {
                    errorMessage = backendData.message[0]; // Take the first validation error
                } else if (typeof backendData.message === 'string') {
                    errorMessage = backendData.message; // Extracts "User with email teachers@example.com already exists"
                } else if (backendData.error) {
                    errorMessage = backendData.error;
                }
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            // Show a robust toast notification 
            toast.error("Registration Failed", {
                description: errorMessage,
                duration: 5000 // 5 seconds
            });
        }
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
