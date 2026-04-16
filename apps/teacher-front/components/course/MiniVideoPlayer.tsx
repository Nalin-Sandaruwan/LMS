"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle } from "lucide-react";

interface MiniVideoPlayerProps {
    url: string;
    title: string;
}

export function MiniVideoPlayer({ url, title }: MiniVideoPlayerProps) {
    const [playing, setPlaying] = useState(false);
    const videoRef = React.useRef<HTMLVideoElement>(null);

    const toggle = () => {
        if (!videoRef.current) return;
        if (playing) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setPlaying(!playing);
    };

    const isBunnyEmbed = url.includes("iframe.mediadelivery.net");

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
        >
            <div className="mt-3 rounded-2xl overflow-hidden bg-black border border-gray-800 relative group">
                {isBunnyEmbed ? (
                    <iframe
                        src={url || undefined}
                        loading="lazy"
                        className="w-full aspect-video border-none"
                        allow="accelerometer; gyroscope; autocomplete; encrypted-media; picture-in-picture;"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <>
                        <video
                            ref={videoRef}
                            src={url || undefined}
                            className="w-full aspect-video object-cover"
                            onEnded={() => setPlaying(false)}
                            onClick={toggle}
                            title={title}
                        />

                        {/* Play overlay when paused */}
                        {!playing && (
                            <div
                                onClick={toggle}
                                className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer group-hover:bg-black/30 transition-colors"
                            >
                                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
                                    <PlayCircle className="w-7 h-7 text-green-700 fill-green-600" />
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* Bottom label */}
                <div className="absolute bottom-0 left-0 right-0 px-3 py-1.5 bg-linear-to-t from-black/70 to-transparent flex items-center justify-between text-xs text-white font-medium">
                    <span className="truncate max-w-[70%]">{title}</span>
                    <button
                        onClick={toggle}
                        className="text-white/80 hover:text-white transition-colors"
                    >
                        {playing ? "Pause" : "Play"}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
