"use client";

import { useState, useEffect } from "react";
import { Plus, LayoutList, CheckCircle2 } from "lucide-react";
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

// ─── Props ────────────────────────────────────────────────────────────────────

interface AddSectionDialogProps {
    /** Called when the teacher saves a new section title and description */
    onAdd: (title: string, description: string) => void;
    /** Optional custom trigger — defaults to the green "Add Section" button */
    trigger?: React.ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AddSectionDialog({ onAdd, trigger }: AddSectionDialogProps) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    // Reset form every time the dialog opens
    useEffect(() => {
        if (open) {
            setTitle("");
            setDescription("");
            setSaved(false);
            setSaving(false);
        }
    }, [open]);

    const handleAdd = async () => {
        const trimmedTitle = title.trim();
        const trimmedDescription = description.trim();
        if (!trimmedTitle) return;

        setSaving(true);
        // Simulate async — swap for real API call
        await new Promise((r) => setTimeout(r, 500));

        onAdd(trimmedTitle, trimmedDescription);
        setSaving(false);
        setSaved(true);
        setTimeout(() => setOpen(false), 700);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleAdd();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger ?? (
                    <Button size="sm" className="h-9 px-4 rounded-2xl font-bold text-xs">
                        <Plus className="w-3.5 h-3.5 mr-1" /> Add Section
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
                            <LayoutList className="w-4 h-4 text-white" />
                        </div>
                        <DialogTitle className="text-base font-black text-gray-900 dark:text-white">
                            New Section
                        </DialogTitle>
                    </div>
                    <DialogDescription className="text-xs text-gray-400 dark:text-gray-500 ml-12">
                        Sections group related lessons together. You can add lessons after creating the section.
                    </DialogDescription>
                </DialogHeader>

                {/* ── Form ── */}
                <div className="px-6 py-5 space-y-4">
                    <div>
                        <label
                            htmlFor="section-title"
                            className="flex items-center gap-1.5 text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1.5"
                        >
                            <LayoutList className="w-3 h-3" /> Section Title
                            <span className="text-red-500 normal-case font-normal">*</span>
                        </label>
                        <Input
                            id="section-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="e.g. Getting Started, Advanced Concepts…"
                            maxLength={80}
                            autoFocus
                            className="h-11 rounded-xl bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-sm focus:border-green-500 focus:ring-green-500/30"
                        />
                        <p className="text-xs text-gray-400 dark:text-gray-500 text-right mt-1">
                            {title.length}/80
                        </p>
                    </div>

                    <div>
                        <label
                            htmlFor="section-desc"
                            className="flex items-center gap-1.5 text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1.5"
                        >
                            Section Description
                        </label>
                        <textarea
                            id="section-desc"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="A brief overview of what students will learn in this section…"
                            maxLength={250}
                            className="flex w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/30 min-h-[80px]"
                        />
                        <p className="text-xs text-gray-400 dark:text-gray-500 text-right mt-1">
                            {description.length}/250
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
                        className="rounded-xl font-bold min-w-[130px]"
                        onClick={handleAdd}
                        disabled={!title.trim() || saving}
                    >
                        {saved ? (
                            <>
                                <CheckCircle2 className="w-4 h-4 mr-2" /> Section Added!
                            </>
                        ) : saving ? (
                            <>
                                <span className="w-4 h-4 mr-2 border-2 border-white/40 border-t-white rounded-full animate-spin inline-block" />
                                Adding…
                            </>
                        ) : (
                            <>
                                <Plus className="w-4 h-4 mr-2" /> Add Section
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
