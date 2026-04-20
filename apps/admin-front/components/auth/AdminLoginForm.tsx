"use client";

import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAdminLogin } from '@/hooks/useAuth';

export const containerVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3, ease: "easeIn" } }
};

export function AdminLoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { mutate: login, isPending: isLoading } = useAdminLogin();

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login({ email, password });
    };

    return (
        <motion.div
            key="login"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-8"
        >
            <div className="space-y-2">
                <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Admin Portal</h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium">Please sign in to manage the LMS platform.</p>
            </div>

            <form className="space-y-5" onSubmit={handleLoginSubmit}>
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
                            placeholder="admin@idensphere.com"
                            className="pl-10 h-12 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="w-5 h-5 text-gray-400" />
                        </div>
                        <Input
                            type={showPassword ? "text" : "password"}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                    className="w-full h-12 rounded-xl text-base font-bold flex items-center justify-center group bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                    {isLoading ? "Authenticating..." : "Login to Dashboard"}
                    {!isLoading && <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />}
                </Button>
            </form>
        </motion.div>
    );
}
