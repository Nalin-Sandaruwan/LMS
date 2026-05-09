import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeUp } from "../animations";

interface SaveBarProps {
    onSave: () => void;
    isPending: boolean;
    isSuccess: boolean;
}

/**
 * Sticky save bar at the bottom of the edit form.
 * Shows a loading spinner while saving and a success message on completion.
 */
export function SaveBar({ onSave, isPending, isSuccess }: SaveBarProps) {
    return (
        <motion.div
            variants={fadeUp}
            className="flex items-center justify-between bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-5"
        >
            <AnimatePresence mode="wait">
                {isSuccess ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-sm font-bold text-green-600 dark:text-green-400"
                    >
                        <CheckCircle2 className="w-4 h-4" /> Profile saved successfully!
                    </motion.div>
                ) : (
                    <motion.span
                        key="hint"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-gray-400 dark:text-gray-500"
                    >
                        Changes will be saved to your LMS profile.
                    </motion.span>
                )}
            </AnimatePresence>

            <Button
                onClick={onSave}
                disabled={isPending}
                className="h-11 px-7 rounded-2xl font-bold shadow-md shadow-green-500/20"
            >
                {isPending ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
                ) : (
                    <><Save className="w-4 h-4 mr-2" /> Save Changes</>
                )}
            </Button>
        </motion.div>
    );
}
