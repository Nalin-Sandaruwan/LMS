"use client"
import * as React from 'react';
import { motion } from 'framer-motion';
import { Code, FileText, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoAreaProps {
    activeLesson: any;
}

export function VideoArea({ activeLesson }: VideoAreaProps) {
    if (!activeLesson) return null;

    return (
        <div className="relative w-full aspect-video bg-black md:rounded-2xl overflow-hidden shadow-2xl group shrink-0 border border-gray-900">
            {activeLesson.type === 'video' ? (
                activeLesson.status === 'published' && activeLesson.fileUrl ? (
                    <iframe
                        src={`${activeLesson.fileUrl}${activeLesson.fileUrl.includes('?') ? '&' : '?'}autoplay=true&loop=false&muted=false&preload=true&responsive=true`}
                        loading="lazy"
                        style={{ border: 0, position: 'absolute', top: 0, height: '100%', width: '100%' }}
                        allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
                        allowFullScreen={true}
                    />
                ) : (
                    <div className="absolute inset-0 bg-linear-to-br from-gray-900 to-black flex items-center justify-center p-6 text-center">
                        <div className="max-w-md">
                            <div className="w-20 h-20 bg-amber-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Clock className="w-10 h-10 text-amber-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                Video Unavailable
                            </h3>
                            <p className="text-gray-400 text-sm">
                                This video is still processing or not yet published. Please wait and check back later.
                            </p>
                        </div>
                    </div>
                )
            ) : (
                <div className="absolute inset-0 bg-linear-to-br from-gray-900 to-black flex items-center justify-center p-6 text-center">
                    <div className="max-w-md">
                        <div className="w-20 h-20 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            {activeLesson.type === 'quiz' ? <Code className="w-10 h-10 text-blue-500" /> : <FileText className="w-10 h-10 text-blue-500" />}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">
                            {activeLesson.type === 'quiz' ? "Ready for a Quiz?" : "Reading Material"}
                        </h3>
                        <p className="text-gray-400 text-sm mb-6">
                            This lesson contains {activeLesson.type === 'quiz' ? "interactive questions" : "supplementary reading"} to help reinforce your learning.
                        </p>
                        <Button className="rounded-xl font-bold px-8">
                            {activeLesson.type === 'quiz' ? "Start Quiz" : "Download Resources"}
                        </Button>
                    </div>
                </div>
            )}

            {/* Only show custom overlays if NOT a video */}
            {activeLesson.type !== 'video' && (
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-transparent to-transparent"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 10, repeat: Infinity }}
                    />
                </div>
            )}
        </div>
    );
}
