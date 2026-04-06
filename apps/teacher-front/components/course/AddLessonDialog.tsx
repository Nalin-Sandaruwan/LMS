"use client";

import React, { useState, useEffect } from "react";
import {
    Plus,
    Video,
    FileText,
    BadgeCheck,
    AlarmClock,
    Eye,
    EyeOff,
    CheckCircle2,
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
import type { Lesson, LessonType, LessonStatus } from "@/components/course/courseTypes";

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

interface AddLessonDialogProps {
    /** Called when the teacher confirms the new lesson */
    onAdd: (lesson: Omit<Lesson, "id">) => void;
    /** Optional custom trigger; defaults to the ghost "Add Lesson" button */
    trigger?: React.ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AddLessonDialog({ onAdd, trigger }: AddLessonDialogProps) {
    const [open, setOpen] = useState(false);

    // Form fields
    const [title, setTitle] = useState("");
    const [type, setType] = useState<LessonType>("video");
    const [duration, setDuration] = useState("");
    const [status, setStatus] = useState<LessonStatus>("draft");
    const [preview, setPreview] = useState(false);
    const [description, setDescription] = useState("");
    const [videoFile, setVideoFile] = useState<File | null>(null);

    // UI state
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    // Reset on open
    useEffect(() => {
        if (open) {
            setTitle(""); setType("video"); setDuration("");
            setStatus("draft"); setPreview(false); setDescription("");
            setVideoFile(null);
            setSaved(false); setSaving(false);
        }
    }, [open]);

    const handleAdd = async () => {
        if (!title.trim()) return;
        setSaving(true);
        await new Promise((r) => setTimeout(r, 500)); // replace with real API call
        onAdd({
            title: title.trim(),
            type,
            duration: duration.trim() || "—",
            status,
            preview,
            description: description.trim(),
            file: type === "video" && videoFile ? videoFile : undefined,
        });
        setSaving(false);
        setSaved(true);
        setTimeout(() => setOpen(false), 700);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger ?? (
                    <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2 text-xs rounded-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Plus className="w-3.5 h-3.5 mr-1" /> Add Lesson
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
                            <Plus className="w-4 h-4 text-white" />
                        </div>
                        <DialogTitle className="text-base font-black text-gray-900 dark:text-white">
                            Add New Lesson
                        </DialogTitle>
                    </div>
                    <DialogDescription className="text-xs text-gray-400 dark:text-gray-500 ml-12">
                        Fill in the details below. You can upload content and edit more settings after saving.
                    </DialogDescription>
                </DialogHeader>

                {/* ── Form body ── */}
                <div className="px-6 py-5 space-y-5 max-h-[65vh] overflow-y-auto">

                    {/* Title */}
                    <div className="space-y-1.5">
                        <label
                            htmlFor="lesson-title"
                            className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide"
                        >
                            Lesson Title <span className="text-red-500 normal-case font-normal">*</span>
                        </label>
                        <Input
                            id="lesson-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Introduction to TypeScript"
                            maxLength={120}
                            autoFocus
                            className="h-11 rounded-xl bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-sm focus:border-green-500 focus:ring-green-500/30"
                        />
                        <p className="text-xs text-gray-400 text-right">{title.length}/120</p>
                    </div>

                    {/* Lesson type */}
                    <div className="space-y-2">
                        <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                            Lesson Type
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                            {TYPE_OPTIONS.map(({ type: t, label, icon: Icon, activeColor, iconColor }) => (
                                <button
                                    key={t}
                                    onClick={() => setType(t)}
                                    className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 text-xs font-bold transition-all ${type === t
                                        ? activeColor
                                        : "border-gray-200 dark:border-gray-700 text-gray-400 hover:border-gray-300 dark:hover:border-gray-600"
                                        }`}
                                >
                                    <Icon className={`w-4 h-4 ${type === t ? "" : iconColor}`} />
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Duration + Status */}
                    {/* <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <label
                                htmlFor="lesson-duration"
                                className="flex items-center gap-1 text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide"
                            >
                                <AlarmClock className="w-3 h-3" /> Duration
                            </label>
                            <Input
                                id="lesson-duration"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                placeholder="e.g. 12:30"
                                className="h-11 rounded-xl bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-sm focus:border-green-500 focus:ring-green-500/30"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label
                                htmlFor="lesson-status"
                                className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide"
                            >
                                Status
                            </label>
                            <select
                                id="lesson-status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value as LessonStatus)}
                                className="w-full h-11 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white px-3 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition-colors"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>
                    </div> */}

                    {/* Free preview toggle */}
                    {/* <button
                        onClick={() => setPreview(!preview)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${preview
                                ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                                : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300"
                            }`}
                    >
                        <span className="flex items-center gap-2">
                            {preview ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            Free Preview
                        </span>
                        <span className="text-xs">
                            {preview ? "Students can watch for free" : "Enrolled students only"}
                        </span>
                    </button> */}

                    {/* Description */}
                    {/* <div className="space-y-1.5">
                        <label
                            htmlFor="lesson-description"
                            className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide"
                        >
                            Description
                        </label>
                        <textarea
                            id="lesson-description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            maxLength={500}
                            placeholder="Briefly describe what students will learn in this lesson…"
                            className="w-full px-3 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition-colors resize-none"
                        />
                        <p className="text-xs text-gray-400 text-right">{description.length}/500</p>
                    </div> */}

                    {/* Video file uplode section */}
                    {type === "video" && (
                        <div className="space-y-1.5 pt-2">
                            <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                                Upload Video File (MP4)
                            </label>

                            <label className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${videoFile
                                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                                    : "border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                }`}>
                                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                                    {videoFile ? (
                                        <>
                                            <CheckCircle2 className="w-8 h-8 mb-2 text-green-500" />
                                            <p className="text-sm font-bold text-green-700 dark:text-green-400 line-clamp-1">
                                                {videoFile.name}
                                            </p>
                                            <p className="text-xs text-green-600/80 dark:text-green-500/80 mt-1">
                                                {(videoFile.size / (1024 * 1024)).toFixed(2)} MB • Click to replace
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <Video className="w-8 h-8 mb-2 text-gray-400" />
                                            <p className="text-sm font-bold text-gray-700 dark:text-gray-300">Click to attach MP4 video</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">MP4 format only (max. 2GB)</p>
                                        </>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="video/mp4"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setVideoFile(file);
                                        }
                                    }}
                                />
                            </label>
                        </div>
                    )}
                </div>

                {/* ── Footer ── */}
                <DialogFooter className="px-6 pb-6 pt-3 border-t border-gray-100 dark:border-gray-800 gap-2">
                    <DialogClose asChild>
                        <Button variant="outline" className="rounded-xl font-bold" disabled={saving}>
                            Cancel
                        </Button>
                    </DialogClose>

                    <Button
                        className="rounded-xl font-bold min-w-[130px]"
                        onClick={handleAdd}
                        disabled={!title.trim() || saving}
                    >
                        {saved ? (
                            <><CheckCircle2 className="w-4 h-4 mr-2" /> Lesson Added!</>
                        ) : saving ? (
                            <><span className="w-4 h-4 mr-2 border-2 border-white/40 border-t-white rounded-full animate-spin inline-block" /> Adding…</>
                        ) : (
                            <><Plus className="w-4 h-4 mr-2" /> Add Lesson</>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
