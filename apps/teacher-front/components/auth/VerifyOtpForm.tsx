import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';
import { containerVariants } from './LoginForm';

interface Props {
    email: string;
    otp: string;
    setOtp: (val: string) => void;
    onBack: () => void;
    onNext: () => void;
}

export function VerifyOtpForm({ email, otp, setOtp, onBack, onNext }: Props) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate verify
        setTimeout(() => {
            setIsLoading(false);
            onNext();
        }, 1000);
    };

    return (
        <motion.div
            key="verify"
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
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Email
            </button>

            <div className="space-y-4">
                <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Check your email</h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                    We sent a 6-digit verification code to <span className="font-bold text-gray-900 dark:text-white">{email}</span>. Please enter it below.
                </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Verification Code</label>
                    <Input
                        type="text"
                        required
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
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
    );
}