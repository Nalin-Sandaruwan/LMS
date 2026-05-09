import React from "react";
import { motion } from "framer-motion";
import { Link2, Globe } from "lucide-react";
import { fadeUp } from "../animations";
import { ProfileField } from "./ProfileField";

interface SocialLinksSectionProps {
    socialLinks: string;
    onChange: (v: string) => void;
}

/** Try to extract a clean hostname label, fall back to the raw URL */
function safeHostname(link: string): string {
    try {
        return new URL(link).hostname.replace("www.", "");
    } catch {
        return link;
    }
}

/**
 * Social links section with a comma-separated textarea input
 * and a live chip preview of the parsed URLs below.
 */
export function SocialLinksSection({ socialLinks, onChange }: SocialLinksSectionProps) {
    const parsedLinks = socialLinks
        .split(",")
        .map((l) => l.trim())
        .filter(Boolean);

    return (
        <motion.div
            variants={fadeUp}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6"
        >
            <h2 className="font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                <Link2 className="w-4 h-4 text-green-500" /> Social Links
            </h2>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
                Add your profile URLs separated by commas (LinkedIn, GitHub, Twitter, etc.)
            </p>

            <ProfileField
                label="Social Links (comma-separated)"
                icon={Link2}
                value={socialLinks}
                onChange={onChange}
                multiline
                rows={3}
                placeholder="https://linkedin.com/in/you, https://github.com/you"
            />

            {/* Live chip preview */}
            {parsedLinks.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {parsedLinks.map((link) => (
                        <a
                            key={link}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 px-2.5 py-1 rounded-full hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
                        >
                            <Globe className="w-3 h-3" />
                            {safeHostname(link)}
                        </a>
                    ))}
                </div>
            )}
        </motion.div>
    );
}
