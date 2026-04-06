"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageIcon, UploadCloud, Save, X } from "lucide-react";

export default function CreateCourseDialogPage() {
    const router = useRouter();
    const [open, setOpen] = useState(true);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnailStr, setThumbnailStr] = useState<string>("");

    const isValid = title.trim() && description.trim();

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (!isOpen) {
            router.push("/your-courses"); // Navigate back if dialog is closed/cancelled
        }
    };

    const handleSave = () => {
        if (!isValid) return;

        // Simulate course creation locally
        console.log("Saving new course:", { title, description, thumbnail: thumbnailStr });
        const dummyNewCourseId = 999;

        // Hide dialog and gracefully navigate directly into the new course editor
        setOpen(false);
        router.push(`/your-courses/${dummyNewCourseId}`);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        Create New Course
                    </DialogTitle>
                    <DialogDescription>
                        Give your course a title, a short description, and an attractive thumbnail.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Title */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center">
                            Course Title <span className="text-red-500 ml-1">*</span>
                        </label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Complete Web Development Bootcamp"
                            className="h-11 rounded-xl"
                            autoFocus
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center">
                            Course Description <span className="text-red-500 ml-1">*</span>
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="What will your students learn in this course?"
                            className="flex min-h-[100px] w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent px-4 py-3 text-sm shadow-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-500 disabled:cursor-not-allowed disabled:opacity-50"
                            rows={4}
                        />
                    </div>

                    {/* Thumbnail */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-900 dark:text-gray-100">
                            Thumbnail Image (Optional)
                        </label>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <UploadCloud className="w-8 h-8 mb-2 text-gray-400 dark:text-gray-500" />
                                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                            Click to upload image (max 5MB)
                                        </p>
                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setThumbnailStr(URL.createObjectURL(file));
                                            }
                                        }}
                                    />
                                </label>
                            </div>

                            {/* Thumbnail Preview Area */}
                            {thumbnailStr ? (
                                <div className="w-full sm:w-40 aspect-video rounded-xl overflow-hidden shrink-0 border border-gray-200 dark:border-gray-800 shadow-sm relative group">
                                    <img src={thumbnailStr} alt="Preview" className="w-full h-full object-cover" />
                                    <button
                                        className="absolute top-2 right-2 p-1 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setThumbnailStr("");
                                        }}
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ) : (
                                <div className="w-full sm:w-40 aspect-video rounded-xl bg-gray-50 dark:bg-gray-900 border border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center shrink-0">
                                    <ImageIcon className="w-6 h-6 text-gray-300 dark:text-gray-600 mb-1" />
                                    <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Preview</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <DialogFooter className="pt-2 border-t border-gray-100 dark:border-gray-800 sm:justify-between items-center w-full">
                    <Button
                        variant="ghost"
                        onClick={() => handleOpenChange(false)}
                        className="font-bold text-gray-500 dark:text-gray-400"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={!isValid}
                        className="font-bold rounded-xl shadow-md shadow-green-500/20"
                    >
                        <Save className="w-4 h-4 mr-2" /> Create & Edit Course
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
