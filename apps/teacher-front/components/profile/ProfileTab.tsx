import React from "react";
import { motion } from "framer-motion";
import { stagger } from "./animations";
import { TeacherProfile, parseSocialLinks, formatJoinDate } from "./types";
import { UserProfile } from "@/hooks/useAuth";
import { TEACHER } from "./profile-data";

// ─── Sub-components ────────────────────────────────────────────────────────────
import { TeacherHeroCard }      from "./sub-components/TeacherHeroCard";
import { ExpertiseBioCard }     from "./sub-components/ExpertiseBioCard";
import { ContactSocialCard }    from "./sub-components/ContactSocialCard";
import { TeachingActivityCard } from "./sub-components/TeachingActivityCard";

// Re-export the shared type so page.tsx can import it from one place
export type { TeacherProfile };

// ─── ProfileTab ────────────────────────────────────────────────────────────────

interface ProfileTabProps {
    user?: UserProfile;
    teacher?: TeacherProfile;
    isLoading?: boolean;
}

export function ProfileTab({ user, teacher, isLoading }: ProfileTabProps) {
    // Loading state
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent" />
            </div>
        );
    }

    // Derive display values from API data with smart fallbacks
    const fullName    = teacher?.fullName       || user?.name || user?.email?.split("@")[0] || TEACHER.name;
    const email       = teacher?.email          || user?.email || TEACHER.email;
    const phone       = teacher?.mobileNumber;
    const bio         = teacher?.shortBio       || TEACHER.bio;
    const expert      = teacher?.teachingExpert;
    const profilePic  = teacher?.profilePicture;
    const joinDate    = formatJoinDate(teacher?.createdAt, TEACHER.joinDate);
    const socialLinks = parseSocialLinks(teacher?.socialLinks);

    return (
        <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-5">
            {/* Hero banner + avatar + stats strip */}
            <TeacherHeroCard
                fullName={fullName}
                email={email}
                expert={expert}
                phone={phone}
                bio={bio}
                profilePic={profilePic}
                joinDate={joinDate}
            />

            {/* 2-column info grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <ExpertiseBioCard expert={expert} bio={bio} />
                <ContactSocialCard email={email} phone={phone} socialLinks={socialLinks} />
                <TeachingActivityCard />
            </div>
        </motion.div>
    );
}
