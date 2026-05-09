import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { stagger } from "./animations";
import { TeacherProfile } from "./types";
import { UserProfile, useUpdateTeacherProfile } from "@/hooks/useAuth";
import { TEACHER } from "./profile-data";
import { toast } from "sonner";

// ─── Sub-components ────────────────────────────────────────────────────────────
import { ProfilePhotoSection } from "./sub-components/ProfilePhotoSection";
import { PersonalInfoSection } from "./sub-components/PersonalInfoSection";
import { SocialLinksSection }  from "./sub-components/SocialLinksSection";
import { SaveBar }             from "./sub-components/SaveBar";

// ─── EditProfileTab ────────────────────────────────────────────────────────────

interface EditProfileTabProps {
    user?: UserProfile;
    teacher?: TeacherProfile;
}

export function EditProfileTab({ user, teacher }: EditProfileTabProps) {
    const updateProfile = useUpdateTeacherProfile();

    // Form state — one field per API property
    const [fullName,       setFullName]       = useState(teacher?.fullName       || user?.name || TEACHER.name);
    const [teachingExpert, setTeachingExpert] = useState(teacher?.teachingExpert || "");
    const [shortBio,       setShortBio]       = useState(teacher?.shortBio       || "");
    const [mobileNumber,   setMobileNumber]   = useState(teacher?.mobileNumber   || "");
    const [socialLinks,    setSocialLinks]    = useState(teacher?.socialLinks    || "");
    const [profilePicture, setProfilePicture] = useState(teacher?.profilePicture || "");

    // Sync when teacher data arrives from the API
    useEffect(() => {
        if (!teacher) return;
        setFullName(teacher.fullName       || "");
        setTeachingExpert(teacher.teachingExpert || "");
        setShortBio(teacher.shortBio       || "");
        setMobileNumber(teacher.mobileNumber   || "");
        setSocialLinks(teacher.socialLinks    || "");
        setProfilePicture(teacher.profilePicture || "");
    }, [teacher]);

    const email = teacher?.email || user?.email || "";

    const handleSave = () => {
        if (!user?.id) {
            toast.error("Unable to save — user ID not found.");
            return;
        }

        const payload: Partial<TeacherProfile> = {
            fullName:       fullName.trim()       || undefined,
            teachingExpert: teachingExpert.trim() || undefined,
            shortBio:       shortBio.trim()       || undefined,
            mobileNumber:   mobileNumber.trim()   || undefined,
            socialLinks:    socialLinks.trim()    || undefined,
            profilePicture: profilePicture.trim() || undefined,
        };

        updateProfile.mutate({ id: user.id, data: payload });
    };

    return (
        <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-5">
            {/* Profile picture preview + URL input */}
            <ProfilePhotoSection
                profilePicture={profilePicture}
                fullName={fullName}
                onProfilePictureChange={setProfilePicture}
            />

            {/* Full name, expertise, email, phone, bio */}
            <PersonalInfoSection
                fullName={fullName}
                teachingExpert={teachingExpert}
                email={email}
                mobileNumber={mobileNumber}
                shortBio={shortBio}
                onFullNameChange={setFullName}
                onTeachingExpertChange={setTeachingExpert}
                onMobileNumberChange={setMobileNumber}
                onShortBioChange={setShortBio}
            />

            {/* Comma-separated social links + chip preview */}
            <SocialLinksSection
                socialLinks={socialLinks}
                onChange={setSocialLinks}
            />

            {/* Save button + status */}
            <SaveBar
                onSave={handleSave}
                isPending={updateProfile.isPending}
                isSuccess={updateProfile.isSuccess}
            />
        </motion.div>
    );
}
