import React from "react";
import { CheckCircle2 } from "lucide-react";

interface StepIndicatorProps {
    current: number;
    total: number;
}

export function StepIndicator({ current, total }: StepIndicatorProps) {
    return (
        <div className="flex items-center gap-2">
            {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
                <React.Fragment key={n}>
                    <div className="flex items-center gap-1.5">
                        <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                                n < current
                                    ? "bg-green-500 text-white"
                                    : n === current
                                    ? "bg-green-500 text-white ring-4 ring-green-500/20"
                                    : "bg-gray-200 dark:bg-gray-700 text-gray-400"
                            }`}
                        >
                            {n < current ? <CheckCircle2 className="w-3.5 h-3.5" /> : n}
                        </div>
                        <span
                            className={`text-xs font-bold hidden sm:inline ${
                                n === current ? "text-gray-900 dark:text-white" : "text-gray-400"
                            }`}
                        >
                            {n === 1 ? "Your Details" : "Set Password"}
                        </span>
                    </div>
                    {n < total && (
                        <div className={`flex-1 h-0.5 rounded-full transition-all ${n < current ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"}`} />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}
