import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

/**
 * Success state shown briefly before the dialog auto-closes.
 * Confirms the video was encoded and the lesson is published.
 */
export function DonePhase() {
    return (
        <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-3 py-6"
        >
            <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-sm font-black text-gray-800 dark:text-white">
                Video published!
            </p>
            <p className="text-xs text-gray-400">Closing…</p>
        </motion.div>
    );
}
