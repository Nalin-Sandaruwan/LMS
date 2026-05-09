"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      console.log("🔑 [VERIFY] Google login successful, redirecting...");
      toast.success("Successfully logged in!");

      // Redirect to the student profile
      router.push("/profile/your-profile");
    } else {
      console.error("❌ [VERIFY] No token found in URL");
      router.push("/login");
    }
  }, [router, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black">
      <div className="space-y-4 text-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Setting up your profile...</h2>
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
