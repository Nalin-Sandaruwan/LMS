import { Metadata } from "next";
import ProtectedRoute from "@/app/hooks/ProtectedRoute";

export const metadata: Metadata = {
    title: "Student Dashboard | Your Profile",
    description: "Manage your courses, track your learning progress, and view your AI avatars at Idensphere.",
};

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
