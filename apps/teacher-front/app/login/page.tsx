"use client";

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { LoginForm } from '@/components/auth/LoginForm';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';
import { VerifyOtpForm } from '@/components/auth/VerifyOtpForm';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';
import { LoginBrandPanel } from '@/components/auth/LoginBrandPanel';

export type AuthState = 'LOGIN' | 'FORGOT_PASSWORD' | 'VERIFY_OTP' | 'RESET_PASSWORD';

export default function LoginPage() {
    const [authState, setAuthState] = useState<AuthState>('LOGIN');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex overflow-hidden font-sans">
            {/* Left Side - Authentication Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10">
                {/* Mobile Back to Home - optional but good ux */}
                <Link href="/" className="absolute top-6 left-6 lg:top-12 lg:left-12 flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Home
                </Link>

                <div className="w-full max-w-md">
                    <AnimatePresence mode="wait">
                        {authState === 'LOGIN' && (
                            <LoginForm 
                                onForgotPassword={() => setAuthState('FORGOT_PASSWORD')} 
                            />
                        )}

                        {authState === 'FORGOT_PASSWORD' && (
                            <ForgotPasswordForm 
                                email={email} 
                                setEmail={setEmail} 
                                onBack={() => setAuthState('LOGIN')} 
                                onNext={() => setAuthState('VERIFY_OTP')} 
                            />
                        )}

                        {authState === 'VERIFY_OTP' && (
                            <VerifyOtpForm 
                                email={email} 
                                otp={otp} 
                                setOtp={setOtp} 
                                onBack={() => setAuthState('FORGOT_PASSWORD')} 
                                onNext={() => setAuthState('RESET_PASSWORD')} 
                            />
                        )}

                        {authState === 'RESET_PASSWORD' && (
                            <ResetPasswordForm 
                                onSuccess={() => {
                                    setOtp('');
                                    setAuthState('LOGIN');
                                }} 
                            />
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Right Side - Premium Graphic Area */}
            <LoginBrandPanel />
        </div>
    );
}
