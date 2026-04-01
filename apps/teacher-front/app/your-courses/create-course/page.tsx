"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
    ArrowLeft,
    Plus,
    Trash2,
    GripVertical,
    ChevronDown,
    Video,
    FileText,
    FileUp,
    X,
    Eye,
    EyeOff,
    ImageIcon,
    BookOpen,
    Save,
    Send,
    Zap,
    AlarmClock,
    CheckCircle2,
    Info,
    ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Navigation } from "@/components/baseComponets/navBar";

// ─── Types ────────────────────────────────────────────────────────────────────

type LessonType = "video" | "pdf" | "word";
type LessonStatus = "published" | "draft";
type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

interface Lesson {
    _id: string;
    title: string;
    type: LessonType;
    duration: string;
    status: LessonStatus;
    fileName: string;      // stored file name after selection
    file: File | null;     // the actual File object (client-side only)
    uploadedUrl: string;   // URL returned by /api/upload after success
    preview: boolean;
    description: string;
}

interface Section {
    _id: string;
    title: string;
    lessons: Lesson[];
}

interface CourseForm {
    title: string;
    description: string;
    category: string;
    level: CourseLevel | "";
    thumbnail: string;
    sections: Section[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const uid = () => `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

const newLesson = (): Lesson => ({
    _id: uid(),
    title: "",
    type: "video",
    duration: "",
    status: "draft",
    fileName: "",
    file: null,
    uploadedUrl: "",
    preview: false,
    description: "",
});

const newSection = (): Section => ({
    _id: uid(),
    title: "",
    lessons: [newLesson()],
});

const CATEGORIES = ["Web Development", "Design", "Programming", "Data Science", "DevOps", "Mobile", "Business", "Marketing", "Other"];
const LEVELS: CourseLevel[] = ["Beginner", "Intermediate", "Advanced"];

const LESSON_TYPE_META: Record<LessonType, { label: string; icon: React.ElementType; color: string; accept: string; hint: string }> = {
    video: { label: "Video", icon: Video, color: "text-blue-500", accept: "video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov", hint: "MP4, WEBM or MOV · max 2 GB" },
    pdf: { label: "PDF", icon: FileText, color: "text-violet-500", accept: "application/pdf,.pdf", hint: "PDF files only · max 200 MB" },
    word: { label: "Word", icon: FileText, color: "text-sky-500", accept: ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document", hint: ".DOC or .DOCX · max 100 MB" },
};

// ─── Animation Variants ────────────────────────────────────────────────────────

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

// ─── Field Components ─────────────────────────────────────────────────────────

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
    return (
        <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1.5">
            {children} {required && <span className="text-red-500 normal-case">*</span>}
        </label>
    );
}

function FieldInput({
    value, onChange, placeholder, type = "text", className = ""
}: {
    value: string; onChange: (v: string) => void; placeholder?: string; type?: string; className?: string;
}) {
    return (
        <Input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`h-11 rounded-xl bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-sm focus:ring-green-500/40 focus:border-green-500 ${className}`}
        />
    );
}

function FieldSelect({
    value, onChange, options, placeholder
}: {
    value: string; onChange: (v: string) => void; options: string[]; placeholder: string;
}) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-11 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white px-3 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500 transition-colors"
        >
            <option value="" disabled>{placeholder}</option>
            {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
    );
}

function FieldTextarea({
    value, onChange, placeholder, rows = 3
}: {
    value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
    return (
        <textarea
            rows={rows}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500 transition-colors resize-none"
        />
    );
}

// ─── Upload state types ───────────────────────────────────────────────────────

type UploadStatus = "idle" | "uploading" | "complete" | "error";

interface UploadState {
    status: UploadStatus;
    progress: number;       // 0-100
    speed: string;          // "2.4 MB/s"
    timeLeft: string;       // "~12s"
    url: string;
    error: string;
}

// ─── File Upload Input (with real XHR upload + progress) ─────────────────────

function FileUploadInput({
    accept,
    hint,
    lessonType,
    fileName,
    uploadedUrl,
    onUploadComplete,
    onClear,
}: {
    accept: string;
    hint: string;
    lessonType: LessonType;
    fileName: string;
    uploadedUrl: string;
    onUploadComplete: (url: string, name: string) => void;
    onClear: () => void;
}) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const xhrRef = React.useRef<XMLHttpRequest | null>(null);
    const [dragging, setDragging] = useState(false);
    const [upload, setUpload] = useState<UploadState>({
        status: uploadedUrl ? "complete" : "idle",
        progress: uploadedUrl ? 100 : 0,
        speed: "",
        timeLeft: "",
        url: uploadedUrl,
        error: "",
    });

    const TypeIcon = lessonType === "video" ? Video : FileText;
    const iconColor = LESSON_TYPE_META[lessonType].color;
    const category = lessonType === "video" ? "video" : "document";

    const formatBytes = (b: number) => {
        if (b >= 1073741824) return `${(b / 1073741824).toFixed(1)} GB`;
        if (b >= 1048576) return `${(b / 1048576).toFixed(1)} MB`;
        return `${(b / 1024).toFixed(0)} KB`;
    };

    const startUpload = (file: File) => {
        const startTime = Date.now();
        const xhr = new XMLHttpRequest();
        xhrRef.current = xhr;

        setUpload({ status: "uploading", progress: 0, speed: "", timeLeft: "", url: "", error: "" });

        xhr.upload.addEventListener("progress", (e) => {
            if (!e.lengthComputable) return;
            const pct = Math.round((e.loaded / e.total) * 100);
            const elapsed = (Date.now() - startTime) / 1000;
            const bps = e.loaded / elapsed;
            const remaining = (e.total - e.loaded) / bps;

            setUpload((prev) => ({
                ...prev,
                progress: pct,
                speed: `${formatBytes(bps)}/s`,
                timeLeft: remaining > 60
                    ? `~${Math.ceil(remaining / 60)}m`
                    : `~${Math.ceil(remaining)}s`,
            }));
        });

        xhr.addEventListener("load", () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                const res = JSON.parse(xhr.responseText);
                setUpload({ status: "complete", progress: 100, speed: "", timeLeft: "", url: res.url, error: "" });
                onUploadComplete(res.url, file.name);
            } else {
                const res = JSON.parse(xhr.responseText || "{}");
                setUpload((prev) => ({ ...prev, status: "error", error: res.error || "Upload failed." }));
            }
        });

        xhr.addEventListener("error", () =>
            setUpload((prev) => ({ ...prev, status: "error", error: "Network error. Check your connection." }))
        );

        xhr.addEventListener("abort", () =>
            setUpload({ status: "idle", progress: 0, speed: "", timeLeft: "", url: "", error: "" })
        );

        const fd = new FormData();
        fd.append("file", file);
        fd.append("category", category);
        xhr.open("POST", "/api/upload");
        xhr.send(fd);
    };

    const handleFiles = (files: FileList | null) => {
        if (files?.[0]) startUpload(files[0]);
    };

    const cancelUpload = () => {
        xhrRef.current?.abort();
    };

    const clearFile = () => {
        xhrRef.current?.abort();
        setUpload({ status: "idle", progress: 0, speed: "", timeLeft: "", url: "", error: "" });
        onClear();
        // reset native input so the same file can be re-selected
        if (inputRef.current) inputRef.current.value = "";
    };

    // ── Rendering ──

    if (upload.status === "uploading") {
        return (
            <div className="w-full rounded-xl border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 p-4 space-y-3">
                {/* File info row */}
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconColor} bg-current/10`}>
                        <TypeIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                            {fileName || "Uploading…"}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-2 mt-0.5">
                            <span className="font-medium text-green-600 dark:text-green-400">{upload.progress}%</span>
                            {upload.speed && <span>{upload.speed}</span>}
                            {upload.timeLeft && <span className="text-gray-400">{upload.timeLeft} left</span>}
                        </p>
                    </div>
                    <button
                        onClick={cancelUpload}
                        className="h-7 px-3 text-xs font-bold rounded-lg text-red-500 border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors shrink-0"
                    >
                        Cancel
                    </button>
                </div>
                {/* Progress bar */}
                <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full rounded-full"
                        style={{ background: "linear-gradient(to right, #074C00, #42A341, #B8E2A3)" }}
                        animate={{ width: `${upload.progress}%` }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                </div>
            </div>
        );
    }

    if (upload.status === "complete") {
        return (
            <div className="w-full rounded-xl border border-green-400 dark:border-green-700 bg-green-50 dark:bg-green-900/20 p-3">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconColor} bg-current/10`}>
                        <TypeIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{fileName}</p>
                        <p className="text-xs font-medium text-green-600 dark:text-green-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Uploaded successfully
                        </p>
                    </div>
                    <button
                        onClick={clearFile}
                        className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-400 hover:text-red-500 transition-colors shrink-0"
                        title="Remove file"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        );
    }

    if (upload.status === "error") {
        return (
            <div className="w-full rounded-xl border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/10 p-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-red-500 bg-red-100 dark:bg-red-900/30">
                        <X className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-red-700 dark:text-red-400">Upload failed</p>
                        <p className="text-xs text-red-500 dark:text-red-400 truncate">{upload.error}</p>
                    </div>
                    <button
                        onClick={() => inputRef.current?.click()}
                        className="h-7 px-3 text-xs font-bold rounded-lg border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors shrink-0"
                    >
                        Retry
                    </button>
                </div>
                <input ref={inputRef} type="file" accept={accept} className="sr-only" onChange={(e) => handleFiles(e.target.files)} />
            </div>
        );
    }

    // ── Idle / drop zone ──
    return (
        <div
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
            className={`relative flex flex-col items-center justify-center gap-2 w-full min-h-[96px] rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 ${dragging
                ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-green-400 hover:bg-green-50/50 dark:hover:border-green-700 dark:hover:bg-green-900/10"
                }`}
        >
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                className="sr-only"
                onChange={(e) => handleFiles(e.target.files)}
            />
            <div className="flex flex-col items-center gap-1 py-3 text-center px-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1 ${iconColor} bg-current/10`}>
                    <FileUp className="w-5 h-5" />
                </div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    <span className="text-green-600 dark:text-green-400">Click to upload</span> or drag & drop
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{hint}</p>
            </div>
        </div>
    );
}


// ─── Lesson Editor ─────────────────────────────────────────────────────────────

function LessonEditor({
    lesson,
    lessonIndex,
    onUpdate,
    onDelete,
}: {
    lesson: Lesson;
    lessonIndex: number;
    onUpdate: (field: keyof Lesson, value: string | boolean) => void;
    onDelete: () => void;
}) {
    const [expanded, setExpanded] = useState(true);
    const TypeIcon = LESSON_TYPE_META[lesson.type].icon;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden"
        >
            {/* Lesson header */}
            <div
                className={`flex items-center gap-2 px-4 py-3 cursor-pointer transition-colors ${expanded ? "bg-gray-50 dark:bg-gray-800/60" : "hover:bg-gray-50 dark:hover:bg-gray-800/40"
                    }`}
                onClick={() => setExpanded(!expanded)}
            >
                <GripVertical className="w-4 h-4 text-gray-300 dark:text-gray-600 shrink-0 cursor-grab" />
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${LESSON_TYPE_META[lesson.type].color} bg-current/10`}>
                    <TypeIcon className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-gray-400 dark:text-gray-500 shrink-0">
                    L{String(lessonIndex + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-sm font-semibold text-gray-700 dark:text-gray-200 truncate min-w-0">
                    {lesson.title || <span className="text-gray-400 font-normal italic">Untitled lesson</span>}
                </span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 hidden sm:inline ${lesson.status === "published"
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-500"
                    }`}>
                    {lesson.status === "published" ? "Live" : "Draft"}
                </span>
                <button
                    onClick={(e) => { e.stopPropagation(); onDelete(); }}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors shrink-0"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                </button>
                <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
            </div>

            {/* Lesson form */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 space-y-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                            {/* Row 1: Title + Type */}
                            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
                                <div>
                                    <Label required>Lesson Title</Label>
                                    <FieldInput
                                        value={lesson.title}
                                        onChange={(v) => onUpdate("title", v)}
                                        placeholder="e.g. Introduction to TypeScript"
                                    />
                                </div>
                                <div className="sm:w-36">
                                    <Label>Type</Label>
                                    <div className="flex gap-1.5">
                                        {(["video", "pdf", "word"] as LessonType[]).map((t) => {
                                            const { icon: Icon, color, label } = LESSON_TYPE_META[t];
                                            return (
                                                <button
                                                    key={t}
                                                    onClick={() => onUpdate("type", t)}
                                                    className={`flex-1 h-11 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${lesson.type === t
                                                        ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                                                        : "border-gray-200 dark:border-gray-700 text-gray-400 hover:border-gray-300 dark:hover:border-gray-600"
                                                        }`}
                                                >
                                                    <Icon className={`w-3.5 h-3.5 ${lesson.type === t ? "" : color}`} />
                                                    {/* <span className="hidden sm:inline">{label}</span> */}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Row 2: Duration + Status + Preview */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                <div>
                                    <Label>Duration</Label>
                                    <div className="relative">
                                        <AlarmClock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                        <FieldInput
                                            value={lesson.duration}
                                            onChange={(v) => onUpdate("duration", v)}
                                            placeholder="e.g. 12:30"
                                            className="pl-9"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label>Status</Label>
                                    <FieldSelect
                                        value={lesson.status}
                                        onChange={(v) => onUpdate("status", v)}
                                        options={["draft", "published"]}
                                        placeholder="Pick status"
                                    />
                                </div>
                                <div className="col-span-2 sm:col-span-1 flex items-end pb-0.5">
                                    <button
                                        onClick={() => onUpdate("preview", !lesson.preview)}
                                        className={`flex items-center gap-2 h-11 px-4 rounded-xl border w-full justify-center text-xs font-bold transition-all ${lesson.preview
                                            ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                                            : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300"
                                            }`}
                                    >
                                        {lesson.preview ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                                        {lesson.preview ? "Free Preview" : "Set as Preview"}
                                    </button>
                                </div>
                            </div>

                            {/* File upload */}
                            <div>
                                <Label>Upload {LESSON_TYPE_META[lesson.type].label} File</Label>
                                <FileUploadInput
                                    accept={LESSON_TYPE_META[lesson.type].accept}
                                    hint={LESSON_TYPE_META[lesson.type].hint}
                                    lessonType={lesson.type}
                                    fileName={lesson.fileName}
                                    uploadedUrl={lesson.uploadedUrl}
                                    onUploadComplete={(url, name) => {
                                        onUpdate("uploadedUrl", url);
                                        onUpdate("fileName", name);
                                    }}
                                    onClear={() => {
                                        onUpdate("uploadedUrl", "");
                                        onUpdate("fileName", "");
                                    }}
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <Label>Lesson Description</Label>
                                <FieldTextarea
                                    value={lesson.description}
                                    onChange={(v) => onUpdate("description", v)}
                                    placeholder="Briefly describe what students will learn in this lesson."
                                    rows={2}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// ─── Section Editor ────────────────────────────────────────────────────────────

function SectionEditor({
    section,
    sectionIndex,
    onUpdateTitle,
    onUpdateLesson,
    onAddLesson,
    onDeleteLesson,
    onDelete,
}: {
    section: Section;
    sectionIndex: number;
    onUpdateTitle: (v: string) => void;
    onUpdateLesson: (lessonId: string, field: keyof Lesson, value: string | boolean) => void;
    onAddLesson: () => void;
    onDeleteLesson: (lessonId: string) => void;
    onDelete: () => void;
}) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm"
        >
            {/* Section header */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/40">
                <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black text-white shrink-0"
                    style={{ background: "linear-gradient(135deg, #074C00, #42A341)" }}
                >
                    {sectionIndex + 1}
                </div>
                <input
                    value={section.title}
                    onChange={(e) => onUpdateTitle(e.target.value)}
                    placeholder={`Section ${sectionIndex + 1} title…`}
                    className="flex-1 bg-transparent text-sm font-bold text-gray-900 dark:text-white placeholder:text-gray-400 placeholder:font-normal focus:outline-none min-w-0"
                />
                <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0 hidden sm:inline">
                    {section.lessons.length} lesson{section.lessons.length !== 1 ? "s" : ""}
                </span>
                <button
                    onClick={onDelete}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors shrink-0"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shrink-0"
                >
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${collapsed ? "-rotate-90" : ""}`} />
                </button>
            </div>

            {/* Lessons list */}
            <AnimatePresence>
                {!collapsed && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 space-y-3">
                            <AnimatePresence mode="popLayout">
                                {section.lessons.map((lesson, idx) => (
                                    <LessonEditor
                                        key={lesson._id}
                                        lesson={lesson}
                                        lessonIndex={idx}
                                        onUpdate={(field, value) => onUpdateLesson(lesson._id, field, value)}
                                        onDelete={() => onDeleteLesson(lesson._id)}
                                    />
                                ))}
                            </AnimatePresence>

                            {/* Add lesson */}
                            <button
                                onClick={onAddLesson}
                                className="w-full flex items-center justify-center gap-2 h-10 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-400 dark:text-gray-500 hover:border-green-400 hover:text-green-600 dark:hover:border-green-700 dark:hover:text-green-400 transition-all"
                            >
                                <Plus className="w-3.5 h-3.5" /> Add Lesson
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function CreateCoursePage() {
    const [course, setCourse] = useState<CourseForm>({
        title: "",
        description: "",
        category: "",
        level: "",
        thumbnail: "",
        sections: [newSection()],
    });
    const [submitted, setSubmitted] = useState(false);

    // ── Course field helpers ──
    const updateField = (field: keyof CourseForm, value: string) =>
        setCourse((prev) => ({ ...prev, [field]: value }));

    // ── Section helpers ──
    const addSection = () =>
        setCourse((prev) => ({ ...prev, sections: [...prev.sections, newSection()] }));

    const deleteSection = (sectionId: string) =>
        setCourse((prev) => ({ ...prev, sections: prev.sections.filter((s) => s._id !== sectionId) }));

    const updateSectionTitle = (sectionId: string, title: string) =>
        setCourse((prev) => ({
            ...prev,
            sections: prev.sections.map((s) => s._id === sectionId ? { ...s, title } : s),
        }));

    // ── Lesson helpers ──
    const addLesson = (sectionId: string) =>
        setCourse((prev) => ({
            ...prev,
            sections: prev.sections.map((s) =>
                s._id === sectionId ? { ...s, lessons: [...s.lessons, newLesson()] } : s
            ),
        }));

    const deleteLesson = (sectionId: string, lessonId: string) =>
        setCourse((prev) => ({
            ...prev,
            sections: prev.sections.map((s) =>
                s._id === sectionId
                    ? { ...s, lessons: s.lessons.filter((l) => l._id !== lessonId) }
                    : s
            ),
        }));

    const updateLesson = useCallback((sectionId: string, lessonId: string, field: keyof Lesson, value: string | boolean) =>
        setCourse((prev) => ({
            ...prev,
            sections: prev.sections.map((s) =>
                s._id === sectionId
                    ? { ...s, lessons: s.lessons.map((l) => l._id === lessonId ? { ...l, [field]: value } : l) }
                    : s
            ),
        })), []);

    // ── Stats for sidebar ──
    const totalLessons = course.sections.reduce((a, s) => a + s.lessons.length, 0);
    const videoCount = course.sections.reduce((a, s) => a + s.lessons.filter((l) => l.type === "video").length, 0);
    const isValid = course.title.trim() && course.category && course.level;

    const handleSave = (publish = false) => {
        if (!isValid) return;
        // Build final object matching the course data structure
        const output = {
            title: course.title,
            description: course.description,
            category: course.category,
            level: course.level,
            thumbnail: course.thumbnail,
            status: publish ? "Published" : "Draft",
            sections: course.sections.map((s, si) => ({
                id: si + 1,
                title: s.title,
                lessons: s.lessons.map((l, li) => ({
                    id: li + 1,
                    title: l.title,
                    type: l.type,
                    duration: l.duration,
                    status: l.status,
                    videoUrl: l.uploadedUrl || l.fileName,
                    preview: l.preview,
                    description: l.description,
                })),
            })),
        };
        console.log("Course data:", JSON.stringify(output, null, 2));
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-black font-sans flex items-center justify-center">
                <Navigation />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-md px-8"
                >
                    <div className="w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg, #074C00, #42A341)" }}
                    >
                        <CheckCircle2 className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Course Created!</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium">Your course has been saved successfully.</p>
                    <div className="flex gap-3 justify-center">
                        <Link href="/your-courses">
                            <Button className="rounded-2xl font-bold">
                                <BookOpen className="w-4 h-4 mr-2" /> View My Courses
                            </Button>
                        </Link>
                        <Button variant="outline" className="rounded-2xl font-bold" onClick={() => setSubmitted(false)}>
                            Create Another
                        </Button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black font-sans">
            <Navigation />

            <main className="pt-28 pb-20 container mx-auto px-4 sm:px-6 lg:px-8">

                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: -14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
                >
                    <div>
                        <Link href="/your-courses" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors mb-2">
                            <ArrowLeft className="w-3.5 h-3.5" /> Back to My Courses
                        </Link>
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-green-600 dark:text-green-400 mb-1">
                            <Zap className="w-3.5 h-3.5" /> New Content
                        </div>
                        <h1 className="text-4xl font-black text-gray-900 dark:text-white">
                            Create{" "}
                            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(to right, #074C00, #42A341, #B8E2A3)" }}>
                                New Course
                            </span>
                        </h1>
                    </div>

                    {/* Save actions */}
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            className="h-11 px-5 rounded-2xl font-bold"
                            onClick={() => handleSave(false)}
                            disabled={!isValid}
                        >
                            <Save className="w-4 h-4 mr-2" /> Save Draft
                        </Button>
                        <Button
                            className="h-11 px-5 rounded-2xl font-bold shadow-lg shadow-green-500/20"
                            onClick={() => handleSave(true)}
                            disabled={!isValid}
                        >
                            <Send className="w-4 h-4 mr-2" /> Publish Course
                        </Button>
                    </div>
                </motion.div>

                {/* Validation hint */}
                {!isValid && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-6 flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 px-4 py-2.5 rounded-2xl"
                    >
                        <Info className="w-4 h-4 shrink-0" />
                        Fill in the course title, category, and level to enable saving.
                    </motion.div>
                )}

                <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6">

                    {/* ── Left: Main form ── */}
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        animate="visible"
                        className="space-y-5"
                    >
                        {/* Basic Info */}
                        <motion.div variants={fadeUp} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 space-y-5">
                            <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-green-500" /> Basic Information
                            </h2>

                            <div>
                                <Label required>Course Title</Label>
                                <FieldInput
                                    value={course.title}
                                    onChange={(v) => updateField("title", v)}
                                    placeholder="e.g. Complete Next.js Developer Bootcamp"
                                />
                            </div>

                            <div>
                                <Label>Course Description</Label>
                                <FieldTextarea
                                    value={course.description}
                                    onChange={(v) => updateField("description", v)}
                                    placeholder="What will students learn? What problems does this course solve?"
                                    rows={3}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Label required>Category</Label>
                                    <FieldSelect
                                        value={course.category}
                                        onChange={(v) => updateField("category", v)}
                                        options={CATEGORIES}
                                        placeholder="Select a category"
                                    />
                                </div>
                                <div>
                                    <Label required>Level</Label>
                                    <FieldSelect
                                        value={course.level}
                                        onChange={(v) => updateField("level", v)}
                                        options={LEVELS}
                                        placeholder="Select level"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label>Thumbnail URL</Label>
                                <div className="flex gap-3">
                                    <div className="flex-1">
                                        <div className="relative">
                                            <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <Input
                                                type="url"
                                                value={course.thumbnail}
                                                onChange={(e) => updateField("thumbnail", e.target.value)}
                                                placeholder="https://images.unsplash.com/…"
                                                className="pl-9 h-11 rounded-xl bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-sm"
                                            />
                                        </div>
                                    </div>
                                    {/* Thumbnail preview */}
                                    {course.thumbnail ? (
                                        <div className="w-20 h-11 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shrink-0">
                                            <img src={course.thumbnail} alt="Thumbnail preview" className="w-full h-full object-cover" />
                                        </div>
                                    ) : (
                                        <div className="w-20 h-11 rounded-xl bg-gray-100 dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center shrink-0">
                                            <ImageIcon className="w-4 h-4 text-gray-400" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        {/* Curriculum Builder */}
                        <motion.div variants={fadeUp}>
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h2 className="font-bold text-gray-900 dark:text-white">Course Curriculum</h2>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                        {course.sections.length} section{course.sections.length !== 1 ? "s" : ""} · {totalLessons} lesson{totalLessons !== 1 ? "s" : ""}
                                    </p>
                                </div>
                                <Button size="sm" className="h-9 px-4 rounded-2xl text-xs font-bold" onClick={addSection}>
                                    <Plus className="w-3.5 h-3.5 mr-1" /> Add Section
                                </Button>
                            </div>

                            <div className="space-y-4">
                                <AnimatePresence mode="popLayout">
                                    {course.sections.map((section, idx) => (
                                        <SectionEditor
                                            key={section._id}
                                            section={section}
                                            sectionIndex={idx}
                                            onUpdateTitle={(v) => updateSectionTitle(section._id, v)}
                                            onUpdateLesson={(lessonId, field, value) => updateLesson(section._id, lessonId, field, value)}
                                            onAddLesson={() => addLesson(section._id)}
                                            onDeleteLesson={(lessonId) => deleteLesson(section._id, lessonId)}
                                            onDelete={() => deleteSection(section._id)}
                                        />
                                    ))}
                                </AnimatePresence>

                                {/* Add section (bottom) */}
                                <button
                                    onClick={addSection}
                                    className="w-full flex items-center justify-center gap-2 h-12 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-400 dark:text-gray-500 hover:border-green-400 hover:text-green-600 dark:hover:border-green-700 dark:hover:text-green-400 transition-all"
                                >
                                    <Plus className="w-4 h-4" /> Add New Section
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* ── Right: Sticky sidebar ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.45, delay: 0.15 }}
                        className="space-y-4 xl:sticky xl:top-28 xl:self-start"
                    >
                        {/* Course preview card */}
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
                            <div className="h-32 bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
                                {course.thumbnail ? (
                                    <img src={course.thumbnail} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <ImageIcon className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                                {course.category && (
                                    <span className="absolute bottom-2 left-3 text-xs font-semibold text-white bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
                                        {course.category}
                                    </span>
                                )}
                            </div>
                            <div className="p-4 space-y-2">
                                <p className="font-bold text-gray-900 dark:text-white text-sm line-clamp-2">
                                    {course.title || <span className="text-gray-400 font-normal italic">No title yet…</span>}
                                </p>
                                {course.level && (
                                    <span className="inline-block text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 px-2 py-0.5 rounded-full">
                                        {course.level}
                                    </span>
                                )}
                                <p className="text-xs text-gray-400 dark:text-gray-500 line-clamp-2">
                                    {course.description || "No description yet."}
                                </p>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-5 space-y-3">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Course Summary</h3>
                            {[
                                { label: "Sections", value: course.sections.length },
                                { label: "Total Lessons", value: totalLessons },
                                { label: "Video Lessons", value: videoCount },
                                { label: "Other Lessons", value: totalLessons - videoCount },
                            ].map(({ label, value }) => (
                                <div key={label} className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</span>
                                    <span className="text-sm font-black text-gray-900 dark:text-white">{value}</span>
                                </div>
                            ))}
                            {/* Progress fill */}
                            <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                                <div className="flex justify-between text-xs font-medium mb-1.5">
                                    <span className="text-gray-400">Completeness</span>
                                    <span className="text-green-600 dark:text-green-400">
                                        {Math.round(([course.title, course.description, course.category, course.level, course.thumbnail].filter(Boolean).length / 5) * 100)}%
                                    </span>
                                </div>
                                <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full rounded-full"
                                        style={{ background: "linear-gradient(to right, #074C00, #42A341, #B8E2A3)" }}
                                        animate={{ width: `${([course.title, course.description, course.category, course.level, course.thumbnail].filter(Boolean).length / 5) * 100}%` }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Tips */}
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-3xl p-5 space-y-2">
                            <h3 className="text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-wide flex items-center gap-1.5">
                                <Zap className="w-3.5 h-3.5" /> Pro Tips
                            </h3>
                            {[
                                "Add a clear, eye-catching thumbnail",
                                "Keep lesson videos under 15 minutes",
                                "Mark a few lessons as Free Preview",
                                "Save as Draft first, then publish",
                            ].map((tip) => (
                                <p key={tip} className="text-xs text-green-700 dark:text-green-400 flex items-start gap-1.5">
                                    <ChevronRight className="w-3 h-3 mt-0.5 shrink-0" /> {tip}
                                </p>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
