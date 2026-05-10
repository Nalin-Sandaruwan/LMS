"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, isLoading, isError } = useAuth(); // Fetches /auth/profile
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Only redirect if the request is fully completed (not loading)
        // and either encountered an error (like 401 unauth) or there's no user object returned.
        if (!isLoading && (isError || !user)) {
            // Optional: You could pass a ?callbackUrl= query param to return the user
            // to the page they were trying to visit after logging in
            router.replace(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
        }
    }, [isLoading, isError, user, router, pathname]);

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
    if (!user.isActive) {
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
                    <Link href="/">
                        <Button className="mt-2 rounded-xl font-bold gap-2">
                            <Home className="w-4 h-4" />
                            Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    if (user.role !== "teacher") {
        return (
            <div className="flex h-[calc(100vh-64px)] w-full items-center justify-center bg-gray-50 dark:bg-black">
                <div className="flex flex-col items-center gap-4 text-center max-w-md px-6">
                    <div className="h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-500 mb-2">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Unauthorized</h2>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                        You are not authorized to access this page.
                    </p>
                </div>
            </div>
        )
    }

    return <>{children}</>;
}
