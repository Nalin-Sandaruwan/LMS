"use client"
import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, Zap, BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';

type AuthState = 'LOGIN' | 'FORGOT_PASSWORD' | 'VERIFY_OTP' | 'RESET_PASSWORD';

export default function LoginPage() {
    const router = useRouter();
    const [authState, setAuthState] = useState<AuthState>('LOGIN');
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Mock flow handlers
    const handleSimulatedSubmit = (nextState: AuthState | 'COMPLETED', ms = 1500) => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            if (nextState === 'COMPLETED') {
                router.push('/profile/your-profile'); // Redirect to profile on success
            } else {
                setAuthState(nextState);
            }
        }, ms);
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
        exit: { opacity: 0, x: 20, transition: { duration: 0.3, ease: "easeIn" } }
    };

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

                        {/* ============================== */}
                        {/* 1. LOGIN VIEW                  */}
                        {/* ============================== */}
                        {authState === 'LOGIN' && (
                            <motion.div
                                key="login"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="space-y-8"
                            >
                                <div className="space-y-2">
                                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Welcome Back</h1>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium">Enter your credentials to access your account.</p>
                                </div>

                                <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); handleSimulatedSubmit('COMPLETED'); }}>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Email Address</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Mail className="w-5 h-5 text-gray-400" />
                                            </div>
                                            <Input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="you@example.com"
                                                className="pl-10 h-12 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <div className="flex justify-between items-center">
                                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Password</label>
                                            <button
                                                type="button"
                                                onClick={() => setAuthState('FORGOT_PASSWORD')}
                                                className="text-sm font-bold text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                                            >
                                                Forgot password?
                                            </button>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Lock className="w-5 h-5 text-gray-400" />
                                            </div>
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                required
                                                placeholder="••••••••"
                                                className="pl-10 pr-10 h-12 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full h-12 rounded-xl text-base font-bold flex items-center justify-center group"
                                    >
                                        {isLoading ? "Signing In..." : "Sign In"}
                                        {!isLoading && <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />}
                                    </Button>
                                </form>

                                <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-800">
                                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                                        Don't have an account?{' '}
                                        <Link href="/signup" className="text-blue-600 dark:text-blue-500 font-bold hover:underline">
                                            Sign up for free
                                        </Link>
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {/* ============================== */}
                        {/* 2. FORGOT PASSWORD VIEW        */}
                        {/* ============================== */}
                        {authState === 'FORGOT_PASSWORD' && (
                            <motion.div
                                key="forgot"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="space-y-8"
                            >
                                <button
                                    onClick={() => setAuthState('LOGIN')}
                                    className="flex items-center text-sm font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors mb-6 -ml-2 p-2 rounded-lg"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Login
                                </button>

                                <div className="space-y-4">
                                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-500 mb-6">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Reset Password</h1>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                                        Enter the email address associated with your account and we'll send you a One-Time Password (OTP) to reset your password.
                                    </p>
                                </div>

                                <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); handleSimulatedSubmit('VERIFY_OTP'); }}>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Email Address</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Mail className="w-5 h-5 text-gray-400" />
                                            </div>
                                            <Input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="you@example.com"
                                                className="pl-10 h-12 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl"
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isLoading || !email}
                                        className="w-full h-12 rounded-xl text-base font-bold"
                                    >
                                        {isLoading ? "Sending OTP..." : "Send Reset Code"}
                                    </Button>
                                </form>
                            </motion.div>
                        )}

                        {/* ============================== */}
                        {/* 3. VERIFY OTP VIEW             */}
                        {/* ============================== */}
                        {authState === 'VERIFY_OTP' && (
                            <motion.div
                                key="verify"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="space-y-8"
                            >
                                <button
                                    onClick={() => setAuthState('FORGOT_PASSWORD')}
                                    className="flex items-center text-sm font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors mb-6 -ml-2 p-2 rounded-lg"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Email
                                </button>

                                <div className="space-y-4">
                                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Check your email</h1>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                                        We sent a 6-digit verification code to <span className="font-bold text-gray-900 dark:text-white">{email}</span>. Please enter it below.
                                    </p>
                                </div>

                                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSimulatedSubmit('RESET_PASSWORD'); }}>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Verification Code</label>
                                        <Input
                                            type="text"
                                            required
                                            maxLength={6}
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))} // only numbers
                                            placeholder="000000"
                                            className="h-14 text-center text-2xl tracking-[0.5em] font-black bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl"
                                            style={{ letterSpacing: '0.5em' }}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isLoading || otp.length < 6}
                                        className="w-full h-12 rounded-xl text-base font-bold"
                                    >
                                        {isLoading ? "Verifying..." : "Verify Code"}
                                    </Button>
                                </form>

                                <div className="text-center pt-2">
                                    <p className="text-gray-600 dark:text-gray-400 font-medium text-sm">
                                        Didn't receive the email?{' '}
                                        <button className="text-blue-600 dark:text-blue-500 font-bold hover:underline">
                                            Click to resend
                                        </button>
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {/* ============================== */}
                        {/* 4. RESET PASSWORD VIEW         */}
                        {/* ============================== */}
                        {authState === 'RESET_PASSWORD' && (
                            <motion.div
                                key="reset"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="space-y-8"
                            >
                                <div className="space-y-4">
                                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-500 mb-6">
                                        <CheckCircle2 className="w-6 h-6" />
                                    </div>
                                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Create New Password</h1>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                                        Your identity has been verified. Please choose a new, secure password for your account.
                                    </p>
                                </div>

                                <form className="space-y-5" onSubmit={(e) => {
                                    e.preventDefault();
                                    // Normally you would submit the new password here.
                                    // For testing we will simulate and go back to LOGIN on success.
                                    setIsLoading(true);
                                    setTimeout(() => {
                                        setIsLoading(false);
                                        setOtp('');
                                        setAuthState('LOGIN');
                                        alert("Password successfully reset! Please login with your new password.");
                                    }, 1500);
                                }}>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">New Password</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Lock className="w-5 h-5 text-gray-400" />
                                            </div>
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                required
                                                placeholder="••••••••"
                                                className="pl-10 pr-10 h-12 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Confirm New Password</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Lock className="w-5 h-5 text-gray-400" />
                                            </div>
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                required
                                                placeholder="••••••••"
                                                className="pl-10 pr-10 h-12 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl"
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full h-12 rounded-xl text-base font-bold flex items-center justify-center group bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                                    >
                                        {isLoading ? "Saving..." : "Update Password"}
                                    </Button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Right Side - Premium Graphic Area */}
            <div className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center border-l border-green-900/50" style={{ backgroundColor: "#021a01" }}>
                {/* Dynamic Background Gradients */}
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-green-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse" />
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse delay-1000" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />

                <div className="relative w-full max-w-lg z-10 p-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-600/30 mb-8 border border-green-500">
                            <Zap className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                            Empower Your <br />
                            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(to right, #074C00, #42A341, #B8E2A3)" }}>
                                Teaching Journey
                            </span>
                        </h2>
                        <p className="text-lg text-gray-400 font-medium">
                            Join thousands of educators creating impact. Build, manage, and scale your courses with our state-of-the-art teaching platform.
                        </p>
                    </motion.div>

                    {/* Floating Details / Quotes */}
                    <div className="mt-16 space-y-4">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                        >
                            <div className="flex gap-4 items-center mb-4">
                                <div className="w-12 h-12 rounded-full flex flex-shrink-0 items-center justify-center text-white font-bold text-lg" style={{ backgroundImage: "linear-gradient(to bottom right, #074C00, #42A341)" }}>
                                    SR
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Sarah Rahman</h4>
                                    <p className="text-gray-400 text-sm">Senior Educator & Course Creator</p>
                                </div>
                                <div className="ml-auto text-green-400">
                                    <BookOpen className="w-6 h-6" />
                                </div>
                            </div>
                            <p className="text-gray-300 italic">"This platform revolutionized how I teach. My student engagement doubled within the first month — it's the best tool for any educator."</p>
                        </motion.div>
                    </div>
                </div>
            </div>

        </div>
    );
}
