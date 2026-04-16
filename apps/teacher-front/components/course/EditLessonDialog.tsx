"use client";

import React, { useState, useEffect } from "react";
import {
    Save,
    Video,
    FileText,
    BadgeCheck,
    CheckCircle2,
    Edit3,
} from "lucide-react";
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
import type { Lesson, LessonType } from "@/components/course/courseTypes";
import { useLesson } from "@/hooks/useLesson";


// ─── Type meta ────────────────────────────────────────────────────────────────

const TYPE_OPTIONS: {
    type: LessonType;
    label: string;
    icon: React.ElementType;
    activeColor: string;
    iconColor: string;
}[] = [
        { type: "video", label: "Video", icon: Video, activeColor: "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400", iconColor: "text-blue-500" },
        { type: "article", label: "Article", icon: FileText, activeColor: "border-violet-500 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400", iconColor: "text-violet-500" },
        { type: "quiz", label: "Quiz", icon: BadgeCheck, activeColor: "border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400", iconColor: "text-amber-500" },
    ];

// ─── Props ────────────────────────────────────────────────────────────────────

interface EditLessonDialogProps {
    lesson: Lesson;
    /** Called when the teacher confirms the edit */
    onSave?: (lesson: Partial<Lesson>) => void;
    trigger?: React.ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function EditLessonDialog({ lesson, onSave, trigger }: EditLessonDialogProps) {
    const [open, setOpen] = useState(false);

    // Form fields mapped from `lesson`
    const [title, setTitle] = useState(lesson.title);
    const [type, setType] = useState<LessonType>(lesson.type);
    const [description, setDescription] = useState(lesson.description);
    const [videoFile, setVideoFile] = useState<File | null>(null);

    // UI state
    const { updateLesson, isUpdating } = useLesson();
    const [saved, setSaved] = useState(false);

    // Reset when opening dialog
    useEffect(() => {
        if (open) {
            setTitle(lesson.title);
            setType(lesson.type);
            setDescription(lesson.description);
            setVideoFile(null); // Keep null because we don't hold original File object, but we could fetch current url if we wanted
            setSaved(false);
        }
    }, [open, lesson]);

    const handleSave = async () => {
        if (!title.trim()) return;

        try {
            await updateLesson({
                id: lesson.id,
                title: title.trim(),
                description: description?.trim(),
                type,
            });

            onSave?.({
                title: title.trim(),
                type,
                description: description.trim(),
                file: type === "video" && videoFile ? videoFile : undefined,
            });

            setSaved(true);
            setTimeout(() => setOpen(false), 700);
        } catch (error) {
            // Error handling is managed by the hook (toast)
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger ?? (
                    <Button
                        size="sm"
                        variant="outline"
                        className="h-7 px-3 text-xs rounded-xl gap-1 border-green-300 dark:border-green-800 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                    >
                        <Edit3 className="w-3 h-3" /> Edit Lesson
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
                            Edit Lesson
                        </DialogTitle>
                    </div>
                    <DialogDescription className="text-xs text-gray-400 dark:text-gray-500 ml-12">
                        Update the title, description, or re-upload the lesson video file.
                    </DialogDescription>
                </DialogHeader>

                {/* ── Form body ── */}
                <div className="px-6 py-5 space-y-5 max-h-[65vh] overflow-y-auto">
                    {/* Title */}
                    <div className="space-y-1.5">
                        <label
                            htmlFor="edit-lesson-title"
                            className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide"
                        >
                            Lesson Title <span className="text-red-500 normal-case font-normal">*</span>
                        </label>
                        <Input
                            id="edit-lesson-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Introduction to TypeScript"
                            maxLength={120}
                            autoFocus
                            className="h-11 rounded-xl bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-sm focus:border-green-500 focus:ring-green-500/30"
                        />
                        <p className="text-xs text-gray-400 text-right">{title.length}/120</p>
                    </div>

                    {/* Description */}
                    {/* <div className="space-y-1.5">
                        <label
                            htmlFor="edit-lesson-description"
                            className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide"
                        >
                            Description
                        </label>
                        <textarea
                            id="edit-lesson-description"
                            value={description || ""}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            maxLength={500}
                            placeholder="Briefly describe what students will learn in this lesson…"
                            className="w-full px-3 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition-colors resize-none"
                        />
                        <p className="text-xs text-gray-400 text-right">{(description || "").length}/500</p>
                    </div> */}

                </div>

                {/* ── Footer ── */}
                <DialogFooter className="px-6 pb-6 pt-3 border-t border-gray-100 dark:border-gray-800 gap-2">
                    <DialogClose asChild>
                        <Button variant="outline" className="rounded-xl font-bold" disabled={isUpdating}>
                            Cancel
                        </Button>
                    </DialogClose>

                    <Button
                        className="rounded-xl font-bold min-w-[130px]"
                        onClick={handleSave}
                        disabled={!title.trim() || isUpdating}
                    >
                        {saved ? (
                            <><CheckCircle2 className="w-4 h-4 mr-2" /> Saved!</>
                        ) : isUpdating ? (
                            <><span className="w-4 h-4 mr-2 border-2 border-white/40 border-t-white rounded-full animate-spin inline-block" /> Saving…</>
                        ) : (
                            <><Save className="w-4 h-4 mr-2" /> Save Changes</>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
