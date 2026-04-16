"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import type { Lesson } from "@/components/course/courseTypes";
import { useLesson } from "@/hooks/useLesson";

interface DeleteLessonDialogProps {
    lesson: Lesson;
    onDelete?: () => void;
}

export function DeleteLessonDialog({ lesson, onDelete }: DeleteLessonDialogProps) {
    const { deleteLesson, isDeleting } = useLesson();
    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteLesson(lesson.id);
            setOpen(false);
            onDelete?.();
            toast.success("Lesson deleted successfully");
        } catch (error) {
            toast.error("Failed to delete lesson. Please try again.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    size="sm"
                    variant="outline"
                    className="h-7 px-3 text-xs rounded-xl gap-1 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                    <Trash2 className="w-3 h-3" /> Delete
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-3xl">
                <DialogHeader>
                    <DialogTitle className="text-red-600 dark:text-red-500 font-black">
                        Delete Lesson?
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete <strong className="text-gray-900 dark:text-white font-bold">"{lesson.title}"</strong>? This action cannot be undone and will completely remove it from the curriculum.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:justify-end mt-2 pt-4 border-t border-gray-100 dark:border-gray-800 w-full">
                    <DialogClose asChild>
                        <Button variant="outline" className="rounded-xl font-bold px-6" disabled={isDeleting}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        className="rounded-xl font-bold bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-500/20 px-6"
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Yes, Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
