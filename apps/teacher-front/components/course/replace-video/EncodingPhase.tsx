import React from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

/**
 * Shown after TUS upload completes while Bunny.net encodes the video.
 * Uses an indeterminate animated bar since encoding % is not known.
 */
export function EncodingPhase() {
    return (
        <motion.div
            key="encoding"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="space-y-3"
        >
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                <Zap className="w-5 h-5 text-amber-500 shrink-0 animate-pulse" />
                <div className="flex-1">
                    <p className="text-sm font-bold text-amber-800 dark:text-amber-300">
                        Bunny.net is encoding your video
                    </p>
                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">
                        This usually takes 30–60 seconds. The dialog will close automatically when done.
                    </p>
                </div>
            </div>

            {/* Indeterminate animated bar */}
            <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                    className="h-full w-1/3 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
                    animate={{ x: ["0%", "200%", "0%"] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>
        </motion.div>
    );
}
