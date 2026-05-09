import React from "react";
import { motion } from "framer-motion";
import { User, Award, Mail, Phone } from "lucide-react";
import { fadeUp } from "../animations";
import { ProfileField } from "./ProfileField";

interface PersonalInfoSectionProps {
    fullName: string;
    teachingExpert: string;
    email: string;      // read-only — managed by auth service
    mobileNumber: string;
    shortBio: string;
    onFullNameChange:      (v: string) => void;
    onTeachingExpertChange:(v: string) => void;
    onMobileNumberChange:  (v: string) => void;
    onShortBioChange:      (v: string) => void;
}

/**
 * Personal information form section.
 * Covers: fullName, teachingExpert, email (read-only), mobileNumber, shortBio.
 */
export function PersonalInfoSection({
    fullName,
    teachingExpert,
    email,
    mobileNumber,
    shortBio,
    onFullNameChange,
    onTeachingExpertChange,
    onMobileNumberChange,
    onShortBioChange,
}: PersonalInfoSectionProps) {
    return (
        <motion.div
            variants={fadeUp}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6"
        >
            <h2 className="font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                <User className="w-4 h-4 text-green-500" /> Personal Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ProfileField
                    label="Full Name"
                    icon={User}
                    value={fullName}
                    onChange={onFullNameChange}
                    placeholder="John Doe"
                />
                <ProfileField
                    label="Teaching Expertise"
                    icon={Award}
                    value={teachingExpert}
                    onChange={onTeachingExpertChange}
                    placeholder="e.g. Full Stack Web Development"
                />
                <ProfileField
                    label="Email Address"
                    icon={Mail}
                    value={email}
                    onChange={() => {}}
                    type="email"
                    readOnly
                />
                <ProfileField
                    label="Mobile Number"
                    icon={Phone}
                    value={mobileNumber}
                    onChange={onMobileNumberChange}
                    type="tel"
                    placeholder="+1234567890"
                />
            </div>

            <div className="mt-4">
                <ProfileField
                    label="Short Bio"
                    icon={User}
                    value={shortBio}
                    onChange={onShortBioChange}
                    multiline
                    placeholder="Tell students about yourself and your experience..."
                />
            </div>
        </motion.div>
    );
}
