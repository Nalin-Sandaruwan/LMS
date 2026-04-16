"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
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
import { useDeleteCourse } from "@/hooks/useCourses";

interface DeleteCourseDialogProps {
    courseId: number;
    courseTitle: string;
    onDelete?: () => void;
}

export function DeleteCourseDialog({ courseId, courseTitle, onDelete }: DeleteCourseDialogProps) {
    const router = useRouter();
    const { mutateAsync: deleteCourse, isPending } = useDeleteCourse();

    const handleDelete = async () => {
        try {
            await deleteCourse(courseId.toString());
            onDelete?.();
            router.push("/your-courses");
        } catch (error) {
            // Error is handled by the hook's toast
            console.error("Delete course error:", error);
        }
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="rounded-2xl font-bold h-9 border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 text-xs"
                >
                    <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Delete Course
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-3xl">
                <DialogHeader>
                    <DialogTitle className="text-red-600 dark:text-red-500 font-black">
                        Delete Course?
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete <strong className="text-gray-900 dark:text-white font-bold">"{courseTitle}"</strong>? This will permanently delete the entire course, all its sections, lessons, and enrolled student data. This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:justify-end mt-2 pt-4 border-t border-gray-100 dark:border-gray-800 w-full">
                    <DialogClose asChild>
                        <Button variant="outline" className="rounded-xl font-bold px-6">
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            className="rounded-xl font-bold bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-500/20 px-6"
                            onClick={(e) => {
                                e.preventDefault();
                                handleDelete();
                            }}
                            disabled={isPending}
                        >
                            {isPending ? (
                                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Deleting...</>
                            ) : (
                                "Yes, Delete Course"
                            )}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

