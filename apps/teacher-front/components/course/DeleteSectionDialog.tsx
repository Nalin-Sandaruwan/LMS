"use client";

import React from "react";
import { Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";
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
import { useSection } from "@/hooks/useSection";

interface DeleteSectionDialogProps {
    sectionId: number;
    sectionTitle: string;
    onDelete?: () => void;
}

export function DeleteSectionDialog({ sectionId, sectionTitle, onDelete }: DeleteSectionDialogProps) {
    const router = useRouter();
    const params = useParams();
    const courseId = params?.id as string;
    const { deleteSection, isDeleting } = useSection();

    const handleDelete = async () => {
        try {
            await deleteSection(sectionId);
            onDelete?.();
            // Redirect back to the course page to ensure state is fresh
            if (courseId) {
                router.push(`/your-courses/${courseId}`);
            }
        } catch (error) {
            console.error("Delete section error:", error);
        }
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-3xl">
                <DialogHeader>
                    <DialogTitle className="text-red-600 dark:text-red-500 font-black">
                        Delete Section?
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete <strong className="text-gray-900 dark:text-white font-bold">"{sectionTitle}"</strong>? This will permanently delete the section and all its lessons. This action cannot be undone.
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
                            disabled={isDeleting}
                        >
                            {isDeleting ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                "Yes, Delete Section"
                            )}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
