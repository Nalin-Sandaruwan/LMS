"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/app/hooks/api hooks/useAuth";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { data: user, isLoading, isError } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Only redirect if the request is fully completed (not loading)
        // and either encountered an error (like 401 unauth) or there's no user object returned.
        if (!isLoading && (isError || !user)) {
            // Redirect to home page if not authenticated
            router.replace("/");
        }
    }, [isLoading, isError, user, router]);

    // Show a loading UI while fetching the profile
    if (isLoading) {
        return (
            <div className="flex h-[calc(100vh-64px)] w-full items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>
                    <p className="text-gray-500 font-medium">Verifying access...</p>
                </div>
            </div>
        );
    }

    // Do not render the children if there's an error or no user, 
    // to prevent flashing protected content before the router.replace fires.
    if (isError || !user) {
        return null;
    }

    // Block access if the user is authenticated but not active
    if (user.isActive === false) {
        return (
            <div className="flex h-[calc(100vh-64px)] w-full items-center justify-center bg-gray-50 dark:bg-black">
                <div className="flex flex-col items-center gap-4 text-center max-w-md px-6">
                    <div className="h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-500 mb-2">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Account Not Active</h2>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                        Your teacher account is currently pending approval or has been deactivated. Please contact an administrator to restore access.
                    </p>
                </div>
            </div>
        );
    }

    // Block access if a standard student ("user") tries to access teacher/admin routes
    if (user.role !== "user") {
        return (
            <div className="flex h-[calc(100vh-64px)] w-full items-center justify-center bg-gray-50 dark:bg-gray-950">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-6 text-center max-w-lg px-8 py-12 bg-white dark:bg-gray-900 rounded-[32px] shadow-2xl shadow-blue-500/10 border border-gray-100 dark:border-gray-800 mx-4"
                >
                    <div className="h-20 w-20 rounded-3xl bg-amber-100 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-500 mb-2 relative">
                        <div className="absolute inset-0 bg-amber-400 opacity-20 blur-2xl rounded-full"></div>
                        <svg className="w-10 h-10 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Access Restricted</h2>
                        <p className="text-gray-500 dark:text-gray-400 font-medium text-lg leading-relaxed">
                            This area is reserved for educational staff and administrators.
                            Your current account does not have permission to view this content.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full pt-2">
                        <button
                            onClick={() => router.replace("/")}
                            className="flex-1 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Back to Home
                        </button>
                        <button
                            onClick={() => router.back()}
                            className="flex-1 px-8 py-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-2xl transition-all"
                        >
                            Go Back
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return <>{children}</>;
}
