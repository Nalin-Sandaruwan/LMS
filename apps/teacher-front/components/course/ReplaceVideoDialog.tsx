"use client";

import React, { useState, useEffect } from "react";
import {
    Save,
    Video,
    CheckCircle2,
    UploadCloud
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
import type { Lesson } from "@/components/course/courseTypes";

interface ReplaceVideoDialogProps {
    lesson: Lesson;
    /** Called when the teacher confirms the new video */
    onSave?: (file: File) => void;
    trigger?: React.ReactNode;
}

export function ReplaceVideoDialog({ lesson, onSave, trigger }: ReplaceVideoDialogProps) {
    const [open, setOpen] = useState(false);
    const [videoFile, setVideoFile] = useState<File | null>(null);

    // UI state
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    // Reset when opening dialog
    useEffect(() => {
        if (open) {
            setVideoFile(null);
            setSaved(false); 
            setSaving(false);
        }
    }, [open]);

    const handleSave = async () => {
        if (!videoFile) return;
        setSaving(true);
        await new Promise((r) => setTimeout(r, 600)); // Simulated API
        
        onSave?.(videoFile);

        setSaving(false);
        setSaved(true);
        setTimeout(() => setOpen(false), 700);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger ?? (
                    <Button size="sm" variant="outline" className="h-7 px-3 text-xs rounded-xl gap-1">
                        <Video className="w-3 h-3" /> Replace Video
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="sm:max-w-md rounded-3xl p-0 overflow-hidden">
                {/* ── Header ── */}
                <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3 mb-1">
                        <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: "linear-gradient(135deg, #074C00, #42A341)" }}
                        >
                            <UploadCloud className="w-4 h-4 text-white" />
                        </div>
                        <DialogTitle className="text-base font-black text-gray-900 dark:text-white">
                            Replace Lesson Video
                        </DialogTitle>
                    </div>
                    <DialogDescription className="text-xs text-gray-400 dark:text-gray-500 ml-12">
                        Upload a new MP4 video for <span className="font-semibold text-gray-600 dark:text-gray-300">"{lesson.title}"</span>. This will overwrite the current video.
                    </DialogDescription>
                </DialogHeader>

                {/* ── Form body ── */}
                <div className="px-6 py-5">
                    <div className="space-y-1.5">
                        <label className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
                            videoFile 
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
                                        <p className="text-sm font-bold text-gray-700 dark:text-gray-300">Click to upload new video</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1 mb-2">MP4 format only (max. 2GB)</p>
                                        {lesson.videoUrl && (
                                            <span className="text-[10px] bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2.5 py-1 rounded-full font-bold">
                                                A video currently exists
                                            </span>
                                        )}
                                    </>
                                )}
                            </div>
                            <input
                                type="file"
                                className="hidden"
                                accept="video/mp4"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) setVideoFile(file);
                                }}
                            />
                        </label>
                    </div>
                </div>

                {/* ── Footer ── */}
                <DialogFooter className="px-6 pb-6 pt-0 gap-2">
                    <DialogClose asChild>
                        <Button variant="outline" className="rounded-xl font-bold" disabled={saving}>
                            Cancel
                        </Button>
                    </DialogClose>

                    <Button
                        className="rounded-xl font-bold min-w-[130px]"
                        onClick={handleSave}
                        disabled={!videoFile || saving}
                    >
                        {saved ? (
                            <><CheckCircle2 className="w-4 h-4 mr-2" /> Uploaded!</>
                        ) : saving ? (
                            <><span className="w-4 h-4 mr-2 border-2 border-white/40 border-t-white rounded-full animate-spin inline-block" /> Uploading…</>
                        ) : (
                            <><Save className="w-4 h-4 mr-2" /> Replace Video</>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
