"use client"
import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    ArrowLeft,
    User,
    Phone,
    GraduationCap,
    Star,
    Users,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth, useRegister } from '../hooks/api hooks/useAuth';
import { toast } from 'sonner';

export default function SignUpPage() {
    const router = useRouter();
    const { data: user } = useAuth();
    const registerMutation = useRegister();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            router.replace('/profile/your-profile');
        }
    }, [user, router]);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match', {
                description: 'Please make sure both password fields are identical.',
            });
            return;
        }

        if (password.length < 8) {
            toast.error('Password too short', {
                description: 'Password must be at least 8 characters long.',
            });
            return;
        }

        registerMutation.mutate(
            { fullName, email, password, mobileNumber },
            {
                onSuccess: () => {
                    toast.success('Account created successfully!', {
                        description: 'Welcome! You can now log in to your account.',
                    });
                    router.push('/login');
                },
                onError: (error: any) => {
                    const message =
                        error.response?.data?.message ||
                        'Something went wrong. Please try again.';
                    toast.error('Registration failed', {
                        description: message,
                    });
                },
            }
        );
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    };

    const isPending = registerMutation.isPending;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex overflow-hidden font-sans">

            {/* Left Side - Registration Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10">
                <Link
                    href="/"
                    className="absolute top-6 left-6 lg:top-12 lg:left-12 flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Home
                </Link>

                <div className="w-full max-w-md">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-7"
                    >
                        {/* Header */}
                        <div className="space-y-2">
                            <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                                Create Account
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 font-medium">
                                Join thousands of learners. It's free and takes less than a minute.
                            </p>
                        </div>

                        {/* Form */}
                        <form className="space-y-4" onSubmit={handleSignUp}>

                            {/* Full Name */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="fullName"
                                        type="text"
                                        required
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="Alice Student"
                                        className="pl-10 h-12 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl"
                                        disabled={isPending}
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="alice.student@example.com"
                                        className="pl-10 h-12 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl"
                                        disabled={isPending}
                                    />
                                </div>
                            </div>

                            {/* Mobile Number */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                                    Mobile Number
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Phone className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="mobileNumber"
                                        type="tel"
                                        required
                                        value={mobileNumber}
                                        onChange={(e) => setMobileNumber(e.target.value)}
                                        placeholder="+94771234455"
                                        className="pl-10 h-12 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl"
                                        disabled={isPending}
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="pl-10 pr-10 h-12 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl"
                                        disabled={isPending}
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

                            {/* Confirm Password */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="pl-10 pr-10 h-12 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl"
                                        disabled={isPending}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit */}
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="w-full h-12 rounded-xl text-base font-bold flex items-center justify-center group mt-2"
                            >
                                {isPending ? 'Creating Account...' : 'Create Account'}
                                {!isPending && (
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                )}
                            </Button>
                        </form>

                        {/* Footer */}
                        <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-800">
                            <p className="text-gray-600 dark:text-gray-400 font-medium">
                                Already have an account?{' '}
                                <Link
                                    href="/login"
                                    className="text-blue-600 dark:text-blue-500 font-bold hover:underline"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Decorative Panel */}
            <div className="hidden lg:flex w-1/2 bg-gray-900 dark:bg-black relative overflow-hidden items-center justify-center border-l border-gray-200 dark:border-gray-800">
                {/* Dynamic Background Gradients */}
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse delay-1000"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>

                <div className="relative w-full max-w-lg z-10 p-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/30 mb-8 border border-blue-500">
                            <GraduationCap className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                            Start Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                Learning Journey
                            </span>
                        </h2>
                        <p className="text-lg text-gray-400 font-medium">
                            Create a free account and unlock access to world-class courses, expert instructors, and a thriving community of learners.
                        </p>
                    </motion.div>

                    {/* Stats */}
                    <div className="mt-12 grid grid-cols-2 gap-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <Users className="w-5 h-5 text-blue-400" />
                                <span className="text-white font-black text-2xl">10K+</span>
                            </div>
                            <p className="text-gray-400 text-sm font-medium">Active Students</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <Star className="w-5 h-5 text-yellow-400" />
                                <span className="text-white font-black text-2xl">4.9</span>
                            </div>
                            <p className="text-gray-400 text-sm font-medium">Average Rating</p>
                        </motion.div>
                    </div>

                    {/* Testimonial */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                    >
                        <div className="flex gap-4 items-center mb-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex flex-shrink-0 items-center justify-center text-white font-bold text-lg">
                                AS
                            </div>
                            <div>
                                <h4 className="text-white font-bold">Alice S.</h4>
                                <p className="text-gray-400 text-sm">Software Engineering Student</p>
                            </div>
                        </div>
                        <p className="text-gray-300 italic">
                            "Signing up took seconds and I immediately had access to amazing courses. Best learning platform I've used!"
                        </p>
                    </motion.div>
                </div>
            </div>

        </div>
    );
}
