"use client";

import React, { useState, useEffect } from "react";
import { Edit3, BookOpen, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useUpdateCourse } from "@/hooks/useCourses";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface EditCourseFields {
    title: string;
    description: string;
}

interface EditCourseDialogProps {
    /** The ID of the course to update */
    courseId: string | number;
    /** Current course title shown pre-filled in the form */
    initialTitle: string;
    /** Current course description shown pre-filled in the form */
    initialDescription: string;
    /**
     * Optional: Called after successful save.
     */
    onSave?: (fields: EditCourseFields) => void;
    /** Optional: custom trigger element. Defaults to the green Edit Course Info button. */
    trigger?: React.ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function EditCourseDialog({
    courseId,
    initialTitle,
    initialDescription,
    onSave,
    trigger,
}: EditCourseDialogProps) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const [saved, setSaved] = useState(false);

    const { mutateAsync: updateCourse, isPending: saving } = useUpdateCourse();

    // Sync fields whenever the dialog opens (picks up any external updates)
    useEffect(() => {
        if (open) {
            setTitle(initialTitle);
            setDescription(initialDescription);
            setSaved(false);
        }
    }, [open, initialTitle, initialDescription]);

    const handleSave = async () => {
        if (!title.trim() || saving) return;

        try {
            await updateCourse({
                id: courseId.toString(),
                data: { title: title.trim(), description: description.trim(), thumbnail: "" } // Thumbnail handling can be added later if needed
            });

            if (onSave) {
                onSave({ title: title.trim(), description: description.trim() });
            }

            setSaved(true);
            // Auto-close after brief confirmation
            setTimeout(() => setOpen(false), 800);
        } catch (error) {
            console.error("Failed to update course:", error);
        }
    };

    const isDirty =
        title.trim() !== initialTitle || description.trim() !== initialDescription;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger ?? (
                    <Button className="h-10 px-5 rounded-2xl font-bold text-sm">
                        <Edit3 className="w-4 h-4 mr-2" /> Edit Course Info
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg rounded-3xl p-0 overflow-hidden">
                {/* ── Header ── */}
                <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3 mb-1">
                        <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: "linear-gradient(135deg, #074C00, #42A341)" }}
                        >
                            <Edit3 className="w-4 h-4 text-white" />
                        </div>
                        <DialogTitle className="text-base font-black text-gray-900 dark:text-white">
                            Edit Course Info
                        </DialogTitle>
                    </div>
                    <DialogDescription className="text-xs text-gray-400 dark:text-gray-500 ml-12">
                        Update your course title and description. Changes will reflect for enrolled students.
                    </DialogDescription>
                </DialogHeader>

                {/* ── Form body ── */}
                <div className="px-6 py-5 space-y-5">
                    {/* Title field */}
                    <div className="space-y-1.5">
                        <label
                            htmlFor="edit-course-title"
                            className="flex items-center gap-1.5 text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide"
                        >
                            <BookOpen className="w-3 h-3" /> Course Title
                            <span className="text-red-500 normal-case font-normal">*</span>
                        </label>
                        <Input
                            id="edit-course-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Complete Next.js Developer Bootcamp"
                            className="h-11 rounded-xl bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-sm focus:border-green-500 focus:ring-green-500/30"
                            maxLength={120}
                        />
                        <p className="text-xs text-gray-400 dark:text-gray-500 text-right">
                            {title.length}/120
                        </p>
                    </div>

                    {/* Description field */}
                    <div className="space-y-1.5">
                        <label
                            htmlFor="edit-course-description"
                            className="flex items-center gap-1.5 text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide"
                        >
                            <FileText className="w-3 h-3" /> Description
                        </label>
                        <textarea
                            id="edit-course-description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            placeholder="Briefly describe what students will learn…"
                            maxLength={1000}
                            className="w-full px-3 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition-colors resize-none"
                        />
                        <p className="text-xs text-gray-400 dark:text-gray-500 text-right">
                            {description.length}/1000
                        </p>
                    </div>
                </div>

                {/* ── Footer ── */}
                <DialogFooter className="px-6 pb-6 pt-0 gap-2">
                    <DialogClose asChild>
                        <Button
                            variant="outline"
                            className="rounded-xl font-bold"
                            disabled={saving}
                        >
                            Cancel
                        </Button>
                    </DialogClose>

                    <Button
                        className="rounded-xl font-bold min-w-[120px]"
                        onClick={handleSave}
                        disabled={!isDirty || !title.trim() || saving}
                    >
                        {saved ? (
                            <>
                                <CheckCircle2 className="w-4 h-4 mr-2" /> Saved!
                            </>
                        ) : saving ? (
                            <>
                                <span className="w-4 h-4 mr-2 border-2 border-white/40 border-t-white rounded-full animate-spin inline-block" />
                                Saving…
                            </>
                        ) : (
                            <>
                                <Edit3 className="w-4 h-4 mr-2" /> Save Changes
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
