import React from "react";
import { BookOpen, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { STATS, PERKS } from "./authTypes";

export function BrandPanel() {
    return (
        <div
            className="hidden lg:flex lg:w-1/2 flex-col justify-between p-14 relative overflow-hidden"
            style={{ background: "linear-gradient(140deg, #021a00 0%, #074C00 45%, #1a8a00 100%)" }}
        >
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-green-400/5 blur-3xl" />
            </div>

            {/* Logo */}
            <div className="relative flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-black text-xl tracking-tight">LearnSpace</span>
            </div>

            {/* Main copy */}
            <div className="relative space-y-8">
                <div className="space-y-4">
                    <h2 className="text-4xl font-black text-white leading-tight">
                        Share your expertise<br />with the world.
                    </h2>
                    <p className="text-green-200 font-medium leading-relaxed text-sm">
                        Join thousands of instructors who earn a living doing what they love.
                        Build courses, grow your audience, and make an impact globally.
                    </p>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-3">
                    {STATS.map(({ icon: Icon, value, label }) => (
                        <div
                            key={label}
                            className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10"
                        >
                            <Icon className="w-5 h-5 text-green-300 mb-2" />
                            <p className="text-2xl font-black text-white">{value}</p>
                            <p className="text-xs text-green-200 font-medium mt-0.5">{label}</p>
                        </div>
                    ))}
                </div>

                {/* Perks list */}
                <div className="space-y-2.5">
                    {PERKS.map((perk) => (
                        <div key={perk} className="flex items-center gap-2.5">
                            <div className="w-5 h-5 rounded-full bg-green-400/20 border border-green-400/40 flex items-center justify-center shrink-0">
                                <CheckCircle2 className="w-3 h-3 text-green-300" />
                            </div>
                            <span className="text-sm text-green-100 font-medium">{perk}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Already have an account */}
            <div className="relative text-center">
                <p className="text-sm text-green-200/70 font-medium">
                    Already an instructor?{" "}
                    <Link href="/login" className="text-white font-bold hover:underline">
                        Sign in →
                    </Link>
                </p>
            </div>
        </div>
    );
}
