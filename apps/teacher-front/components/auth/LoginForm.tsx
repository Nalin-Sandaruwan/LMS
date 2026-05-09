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

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200 dark:border-gray-800"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-gray-50 dark:bg-black px-2 text-gray-500 font-bold">Or continue with</span>
                </div>
            </div>

            <Button
                type="button"
                variant="outline"
                onClick={() => {
                    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.idensphere.com';
                    window.location.href = `${apiUrl}/auth/google/teacher`;
                }}
                className="w-full h-12 rounded-xl text-base font-bold flex items-center justify-center gap-3 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all shadow-sm"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                    />
                    <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                    />
                    <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                        fill="#FBBC05"
                    />
                    <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                    />
                </svg>
                Sign in with Google
            </Button>

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
