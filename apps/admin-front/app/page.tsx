"use client";

import { AdminGuard } from "@/components/auth/AdminGuard";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Usually, the root page of an admin portal should redirect to the dashboard if authorized
    router.push("/dashboard");
  }, [router]);

  return (
    <AdminGuard>
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground animate-pulse">Redirecting to dashboard...</p>
      </div>
    </AdminGuard>
  );
}
