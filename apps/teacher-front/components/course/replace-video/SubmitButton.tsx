import React from "react";
import { Save, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { UploadPhase } from "./types";

interface SubmitButtonProps {
    phase: UploadPhase;
    disabled: boolean;
    onClick: () => void;
}

/**
 * The primary action button whose label/icon reflects the current upload phase.
 *
 * idle      → "Replace Video"
 * uploading → spinner + "Uploading…"
 * encoding  → spinner + "Encoding…"
 * done      → check + "Published!"
 */
export function SubmitButton({ phase, disabled, onClick }: SubmitButtonProps) {
    return (
        <Button
            className="rounded-xl font-bold min-w-[150px]"
            onClick={onClick}
            disabled={disabled}
        >
            {phase === "done" ? (
                <><CheckCircle2 className="w-4 h-4 mr-2" /> Published!</>
            ) : phase === "encoding" ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Encoding…</>
            ) : phase === "uploading" ? (
                <><span className="w-4 h-4 mr-2 border-2 border-white/40 border-t-white rounded-full animate-spin inline-block" /> Uploading…</>
            ) : (
                <><Save className="w-4 h-4 mr-2" /> Replace Video</>
            )}
        </Button>
    );
}
