import { motion, type Variants } from "framer-motion";
import { BookOpen, Star, Users, Globe } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SignupStep = "DETAILS" | "PASSWORD" | "SUCCESS";

export const EXPERTISE_OPTIONS = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "UI/UX Design",
    "DevOps & Cloud",
    "Cybersecurity",
    "Machine Learning",
    "Business & Marketing",
    "Photography",
    "Music",
    "Other",
];

// ─── Animation variants ───────────────────────────────────────────────────────

export const slideVariants: Variants = {
    hidden: { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.38, ease: "easeOut" } },
    exit:   { opacity: 0, x: -24, transition: { duration: 0.28, ease: "easeIn" } },
};

// ─── Right-panel stats ────────────────────────────────────────────────────────

export const STATS = [
    { icon: Users,    value: "120k+",  label: "Active Students"  },
    { icon: BookOpen, value: "3,400+", label: "Courses Published" },
    { icon: Star,     value: "4.9",    label: "Avg. Rating"       },
    { icon: Globe,    value: "68",     label: "Countries Reached" },
];

export const PERKS = [
    "Set your own schedule & prices",
    "Lifetime royalties on every sale",
    "Dedicated instructor support team",
    "AI-powered course builder tools",
    "Detailed analytics dashboard",
];
