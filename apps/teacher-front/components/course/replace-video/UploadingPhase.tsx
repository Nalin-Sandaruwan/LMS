import React from "react";
import { motion } from "framer-motion";
import { UploadCloud } from "lucide-react";

interface UploadingPhaseProps {
    fileName?: string;
    progress: number;
}

/**
 * Shown while bytes are being TUS-uploaded to Bunny.net.
 * Displays the file name, "X%" counter, and an animated progress bar.
 */
export function UploadingPhase({ fileName, progress }: UploadingPhaseProps) {
    return (
        <motion.div
            key="uploading"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="space-y-3"
        >
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60">
                <UploadCloud className="w-5 h-5 text-green-500 shrink-0 animate-bounce" />
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-800 dark:text-white line-clamp-1">
                        Uploading {fileName}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Sending to Bunny.net CDN…
                    </p>
                </div>
                <span className="text-sm font-black text-green-600 tabular-nums">
                    {progress}%
                </span>
            </div>

            {/* Determinate progress bar */}
            <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                />
            </div>
        </motion.div>
    );
}
