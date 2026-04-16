import React from "react";
import { Video, CheckCircle2 } from "lucide-react";

interface VideoFilePickerProps {
    videoFile: File | null;
    hasExistingVideo: boolean;
    onChange: (file: File) => void;
}

/**
 * Dashed drop-zone for selecting an MP4 video file.
 * Shows the selected file name/size when a file is chosen,
 * or an empty prompt with an optional "currently exists" badge.
 */
export function VideoFilePicker({ videoFile, hasExistingVideo, onChange }: VideoFilePickerProps) {
    return (
        <label
            className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
                videoFile
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : "border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
            }`}
        >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                {videoFile ? (
                    <>
                        <CheckCircle2 className="w-8 h-8 mb-2 text-green-500" />
                        <p className="text-sm font-bold text-green-700 dark:text-green-400 line-clamp-1">
                            {videoFile.name}
                        </p>
                        <p className="text-xs text-green-600/80 dark:text-green-500/80 mt-1">
                            {(videoFile.size / (1024 * 1024)).toFixed(2)} MB • Click to change
                        </p>
                    </>
                ) : (
                    <>
                        <Video className="w-8 h-8 mb-2 text-gray-400" />
                        <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                            Click to upload new video
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1 mb-2">
                            MP4 format only (max. 2GB)
                        </p>
                        {hasExistingVideo && (
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
                    if (file) onChange(file);
                }}
            />
        </label>
    );
}
