import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, ArrowLeft, ShieldCheck } from 'lucide-react';
import { containerVariants } from './LoginForm';

interface Props {
    email: string;
    setEmail: (val: string) => void;
    onBack: () => void;
    onNext: () => void;
}

export function ForgotPasswordForm({ email, setEmail, onBack, onNext }: Props) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call for forgot password
        setTimeout(() => {
            setIsLoading(false);
            onNext();
        }, 1000);
    };

    return (
        <motion.div
            key="forgot"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-8"
        >
            <button
                onClick={onBack}
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

            <form className="space-y-5" onSubmit={handleSubmit}>
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
    );
}