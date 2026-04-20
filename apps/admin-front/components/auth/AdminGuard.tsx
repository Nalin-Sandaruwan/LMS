"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, ShieldAlert } from "lucide-react";

interface AdminGuardProps {
  children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const { user, isLoading, isError, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If loading is finished and user is not authenticated/admin, redirect
    if (!isLoading && (!user || user.role !== "admin")) {
      console.warn("Unauthorized access to admin area. Redirecting...");
      router.push("/login");
    }
  }, [isLoading, user, router]);

  // While checking auth status, show a premium loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-black">
        <div className="relative">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <div className="absolute inset-0 blur-xl bg-primary/20 rounded-full animate-pulse" />
        </div>
        <p className="mt-4 text-sm font-bold text-gray-500 dark:text-gray-400 tracking-widest uppercase animate-pulse">
          Verifying Authority
        </p>
      </div>
    );
  }

  // Final check to prevent content flash before redirect
  if (!isAuthenticated) {
    return null;
  }

  // If authenticated and is admin, render children
  return <>{children}</>;
}
