import ProtectedRoute from "@/hooks/ProtectedRoute";

export default function YourCoursesLayout({ children }: { children: React.ReactNode }) {
    return <ProtectedRoute>{children}</ProtectedRoute>;
}
