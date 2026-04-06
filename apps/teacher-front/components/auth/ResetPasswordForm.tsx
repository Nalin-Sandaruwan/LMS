import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { containerVariants } from './LoginForm';

interface Props {
    onSuccess: () => void;
}

export function ResetPasswordForm({ onSuccess }: Props) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate password reset 
        setTimeout(() => {
            setIsLoading(false);
            onSuccess();
        }, 1000);
    };

    return (
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

            <form className="space-y-5" onSubmit={handleSubmit}>
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
                            type={showConfirm ? "text" : "password"}
                            required
                            placeholder="••••••••"
                            className="pl-10 pr-10 h-12 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                            {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
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
    );
}