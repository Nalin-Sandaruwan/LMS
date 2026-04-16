"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { UploadCloud, Video } from "lucide-react";
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
import { useLesson } from "@/hooks/useLesson";

// Sub-components
import type { UploadPhase } from "./replace-video/types";
import { VideoFilePicker } from "./replace-video/VideoFilePicker";
import { UploadingPhase } from "./replace-video/UploadingPhase";
import { EncodingPhase } from "./replace-video/EncodingPhase";
import { DonePhase } from "./replace-video/DonePhase";
import { SubmitButton } from "./replace-video/SubmitButton";

interface ReplaceVideoDialogProps {
    lesson: Lesson;
    /** Called when the full flow (upload + encoding) completes */
    onSave?: (file: File) => void;
    trigger?: React.ReactNode;
}

export function ReplaceVideoDialog({ lesson, onSave, trigger }: ReplaceVideoDialogProps) {
    const [open, setOpen] = useState(false);
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [phase, setPhase] = useState<UploadPhase>("idle");
    const [progress, setProgress] = useState(0);

    const { replaceVideo } = useLesson();

    // Reset state whenever the dialog is (re-)opened
    useEffect(() => {
        if (open) {
            setVideoFile(null);
            setPhase("idle");
            setProgress(0);
        }
    }, [open]);

    const handleSave = async () => {
        if (!videoFile || phase !== "idle") return;

        // Capture before await so TypeScript retains the non-null type across async boundaries
        const file = videoFile;
        setPhase("uploading");

        try {
            await replaceVideo({
                id: lesson.id,
                file,
                onProgress: (p) => setProgress(p),
                // Fires the moment TUS bytes are fully sent — switches UI to encoding phase
                onUploadComplete: () => setPhase("encoding"),
            });

            // replaceVideo only resolves after polling confirms bunnyStatus === 'finished'
            setPhase("done");
            onSave?.(file);
            setTimeout(() => setOpen(false), 900);
        } catch {
            // Errors are already toasted inside the hook — allow retry
            setPhase("idle");
        }
    };

    const isBusy = phase === "uploading" || phase === "encoding";
    const isDone = phase === "done";

    return (
        <Dialog open={open} onOpenChange={(v) => { if (!isBusy) setOpen(v); }}>
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
                        Upload a new MP4 video for{" "}
                        <span className="font-semibold text-gray-600 dark:text-gray-300">
                            "{lesson.title}"
                        </span>
                        . This will overwrite the current video.
                    </DialogDescription>
                </DialogHeader>

                {/* ── Body ── */}
                <div className="px-6 py-5 space-y-4">
                    {/* File picker — hidden while busy or done */}
                    {!isBusy && !isDone && (
                        <VideoFilePicker
                            videoFile={videoFile}
                            hasExistingVideo={!!lesson.fileUrl}
                            onChange={setVideoFile}
                        />
                    )}

                    {/* Phase panels — animated in/out */}
                    <AnimatePresence>
                        {phase === "uploading" && (
                            <UploadingPhase fileName={videoFile?.name} progress={progress} />
                        )}
                        {phase === "encoding" && (
                            <EncodingPhase />
                        )}
                        {phase === "done" && (
                            <DonePhase />
                        )}
                    </AnimatePresence>
                </div>

                {/* ── Footer ── */}
                <DialogFooter className="px-6 pb-6 pt-0 gap-2">
                    <DialogClose asChild>
                        <Button
                            variant="outline"
                            className="rounded-xl font-bold"
                            disabled={isBusy}
                        >
                            Cancel
                        </Button>
                    </DialogClose>

                    <SubmitButton
                        phase={phase}
                        disabled={!videoFile || isBusy || isDone}
                        onClick={handleSave}
                    />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
