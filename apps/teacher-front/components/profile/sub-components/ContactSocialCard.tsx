import React from "react";
import { Globe, Mail, Phone, Link2 } from "lucide-react";
import { SectionCard } from "./SectionCard";

interface ContactSocialCardProps {
    email: string;
    phone?: string;
    /** Parsed array of social link URLs */
    socialLinks: string[];
}

/**
 * Displays email, optional phone, and all parsed social links
 * as clickable anchor tags.
 */
export function ContactSocialCard({ email, phone, socialLinks }: ContactSocialCardProps) {
    return (
        <SectionCard title="Contact & Social" icon={Globe}>
            <div className="space-y-3">
                {/* Email */}
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 font-medium">
                    <Mail className="w-4 h-4 text-green-500 shrink-0" />
                    <span className="truncate">{email}</span>
                </div>

                {/* Phone (optional) */}
                {phone && (
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 font-medium">
                        <Phone className="w-4 h-4 text-green-500 shrink-0" />
                        <span>{phone}</span>
                    </div>
                )}

                {/* Social links — parsed from comma-separated string */}
                {socialLinks.length > 0 && (
                    <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-2">
                        {socialLinks.map((link) => (
                            <div key={link} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 font-medium">
                                <Link2 className="w-4 h-4 text-green-500 shrink-0" />
                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="truncate hover:text-green-600 dark:hover:text-green-400 transition-colors"
                                >
                                    {link}
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </SectionCard>
    );
}
