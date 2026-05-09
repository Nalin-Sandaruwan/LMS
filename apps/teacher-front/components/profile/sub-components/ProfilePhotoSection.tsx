import React from "react";
import { motion } from "framer-motion";
import { Camera, Globe } from "lucide-react";
import { fadeUp } from "../animations";
import { ProfileField } from "./ProfileField";
import { getInitials } from "../types";

interface ProfilePhotoSectionProps {
    profilePicture: string;
    fullName: string;
    onProfilePictureChange: (v: string) => void;
}

/**
 * Shows the current avatar (real photo or initials fallback)
 * and a URL input to update the profile picture.
 */
export function ProfilePhotoSection({
    profilePicture,
    fullName,
    onProfilePictureChange,
}: ProfilePhotoSectionProps) {
    const avatarInitials = getInitials(fullName);

    return (
        <motion.div
            variants={fadeUp}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6"
        >
            <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Camera className="w-4 h-4 text-green-500" /> Profile Photo
            </h2>
            <div className="flex items-center gap-5">
                {/* Live avatar preview */}
                {profilePicture ? (
                    <img
                        src={profilePicture}
                        alt={fullName}
                        className="w-20 h-20 rounded-2xl object-cover border-2 border-green-200 dark:border-green-800 shadow-md shrink-0"
                        onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                    />
                ) : (
                    <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-md shrink-0"
                        style={{ background: "linear-gradient(135deg, #074C00, #42A341)" }}
                    >
                        {avatarInitials}
                    </div>
                )}

                {/* URL input */}
                <div className="flex-1">
                    <ProfileField
                        label="Profile Picture URL"
                        icon={Globe}
                        value={profilePicture}
                        onChange={onProfilePictureChange}
                        type="url"
                        placeholder="https://example.com/your-photo.jpg"
                    />
                </div>
            </div>
        </motion.div>
    );
}
