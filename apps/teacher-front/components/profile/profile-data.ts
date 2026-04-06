import { Activity, Key, Shield, Smartphone } from "lucide-react";

export const TEACHER = {
    name: "Dr. Ashan Perera",
    title: "Senior Full-Stack Developer & Educator",
    email: "ashan.perera@lms.edu",
    phone: "+94 77 123 4567",
    location: "Colombo, Sri Lanka",
    website: "https://ashanperera.dev",
    twitter: "@ashanperera",
    linkedin: "linkedin.com/in/ashanperera",
    github: "github.com/ashandev",
    bio: "Passionate educator with 8+ years of industry experience in full-stack development. I specialize in teaching modern web technologies, system design, and helping students bridge the gap between academia and the real world. Founder of DevSL community with 12k+ members.",
    joinDate: "January 2023",
    avatar: null as null | string,
    initials: "AP",
    verified: true,
    courses: 6,
    students: 7984,
    rating: 4.8,
    reviews: 1357,
    revenue: 124905,
    expertise: ["Next.js", "TypeScript", "React", "Node.js", "PostgreSQL", "Docker"],
    sessionsThisMonth: 14,
    hoursTeaching: 312,
};

export const ACTIVITY_LOG = [
    { id: 1, action: "Logged in from Chrome · Windows", time: "Today, 9:14 AM", icon: Activity, safe: true },
    { id: 2, action: "Password changed", time: "Mar 28, 2026 · 11:02 PM", icon: Key, safe: true },
    { id: 3, action: "New device login · Mobile Safari", time: "Mar 15, 2026 · 7:45 AM", icon: Smartphone, safe: false },
    { id: 4, action: "Two-factor authentication enabled", time: "Jan 10, 2026 · 3:21 PM", icon: Shield, safe: true },
];
