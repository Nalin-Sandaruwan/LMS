import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTeacherLogin } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export const containerVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3, ease: "easeIn" } }
};

interface LoginFormProps {
    onForgotPassword: () => void;
}

export function LoginForm({ onForgotPassword }: LoginFormProps) {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { mutateAsync: loginTeacher, isPending: isLoading } = useTeacherLogin();

    //login api call function
    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await loginTeacher({ email, password });
            toast.success('Successfully logged in!');
            router.push('/'); // Redirect to profile or another protected route
        } catch (error) {
            console.error('Login failed:', error);
            let errorMessage = 'Invalid email or password.';
            
            if (error instanceof AxiosError && error.response?.data) {
                const backendData = error.response.data;
                if (Array.isArray(backendData.message)) {
                    errorMessage = backendData.message[0];
                } else if (typeof backendData.message === 'string') {
                    errorMessage = backendData.message;
                } else if (backendData.error) {
                    errorMessage = backendData.error;
                }
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            toast.error('Login Failed', {
                description: errorMessage,
                duration: 5000,
            });
        }
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
                <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Welcome Back</h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium">Enter your credentials to access your account.</p>
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
                            onClick={onForgotPassword}
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
    );
}
