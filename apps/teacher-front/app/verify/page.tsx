"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const refreshToken = searchParams.get("refreshToken");

    if (token) {
      // Note: We don't manually set cookies here because the backend 
      // already set them as HTTP-Only cookies. 
      // This page acts as a landing spot to ensure the session is ready 
      // and then redirects to the correct dashboard.
      
      console.log("🔑 [VERIFY] Google login successful, redirecting...");
      toast.success("Welcome back!");
      
      // Redirect to the teacher dashboard
      router.push("/your-courses");
    } else {
      console.error("❌ [VERIFY] No token found in URL");
      toast.error("Authentication failed. Please try again.");
      router.push("/login");
    }
  }, [router, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-black">
      <div className="space-y-4 text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Verifying your session...</h2>
        <p className="text-gray-500">Please wait while we set up your workspace.</p>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyContent />
    </Suspense>
  );
}
