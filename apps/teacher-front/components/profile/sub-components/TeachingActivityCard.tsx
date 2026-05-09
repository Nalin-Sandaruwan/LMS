import React from "react";
import { Star, Clock, Activity, CheckCircle2 } from "lucide-react";
import { SectionCard } from "./SectionCard";
import { TEACHER } from "../profile-data";

/**
 * Displays 4 teaching activity stats: reviews, hours taught,
 * sessions this month, and completion rate.
 * Numbers come from mock data until the API exposes them.
 */
export function TeachingActivityCard() {
    const stats = [
        { label: "Reviews",            value: TEACHER.reviews.toLocaleString(), icon: Star,          color: "text-amber-500" },
        { label: "Total Hours Taught", value: `${TEACHER.hoursTeaching}h`,      icon: Clock,         color: "text-blue-500" },
        { label: "Sessions This Month",value: String(TEACHER.sessionsThisMonth),icon: Activity,      color: "text-violet-500" },
        { label: "Completion Rate",    value: "71%",                             icon: CheckCircle2,  color: "text-green-600 dark:text-green-400" },
    ];

    return (
        <SectionCard title="Teaching Activity" icon={Activity} className="md:col-span-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map(({ label, value, icon: Icon, color }) => (
                    <div key={label} className="bg-gray-50 dark:bg-gray-800/60 rounded-2xl p-4 text-center">
                        <Icon className={`w-5 h-5 mx-auto mb-2 ${color}`} />
                        <p className="text-xl font-black text-gray-900 dark:text-white">{value}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 font-medium">{label}</p>
                    </div>
                ))}
            </div>
        </SectionCard>
    );
}
