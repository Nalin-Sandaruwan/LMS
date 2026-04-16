"use client";

import ProtectedRoute from "@/app/hooks/ProtectedRoute";

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute>
            {children}
        </ProtectedRoute>
    );
}
