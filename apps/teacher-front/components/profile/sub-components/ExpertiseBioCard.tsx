import React from "react";
import { Award } from "lucide-react";
import { SectionCard } from "./SectionCard";

interface ExpertiseBioCardProps {
    expert?: string;
    bio: string;
}

/**
 * Shows the teacher's area of expertise as a green pill badge,
 * followed by their full short bio paragraph.
 */
export function ExpertiseBioCard({ expert, bio }: ExpertiseBioCardProps) {
    return (
        <SectionCard title="Expertise & Bio" icon={Award}>
            {expert && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full border border-green-200 dark:border-green-800 mb-4">
                    <Award className="w-3.5 h-3.5" />
                    {expert}
                </div>
            )}
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{bio}</p>
        </SectionCard>
    );
}
