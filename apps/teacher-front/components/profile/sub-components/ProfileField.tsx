import React from "react";

interface ProfileFieldProps {
    label: string;
    icon: React.ElementType;
    value: string;
    onChange: (v: string) => void;
    type?: string;
    multiline?: boolean;
    readOnly?: boolean;
    placeholder?: string;
    rows?: number;
}

const baseClass =
    "w-full pl-9 pr-4 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500 transition-colors";

/**
 * Reusable labeled form field with an icon.
 * Supports single-line inputs and multi-line textareas.
 * Read-only fields show a helper note and are visually dimmed.
 */
export function ProfileField({
    label,
    icon: Icon,
    value,
    onChange,
    type = "text",
    multiline = false,
    readOnly = false,
    placeholder = "",
    rows = 4,
}: ProfileFieldProps) {
    return (
        <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                {label}
            </label>
            <div className="relative">
                <div className="absolute left-3 top-3 text-gray-400">
                    <Icon className="w-4 h-4" />
                </div>
                {multiline ? (
                    <textarea
                        rows={rows}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        readOnly={readOnly}
                        className={`${baseClass} py-2.5 rounded-xl resize-none ${readOnly ? "opacity-60 cursor-not-allowed" : ""}`}
                    />
                ) : (
                    <input
                        type={type}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        readOnly={readOnly}
                        className={`${baseClass} h-11 py-0 rounded-xl ${readOnly ? "opacity-60 cursor-not-allowed" : ""}`}
                    />
                )}
            </div>
            {readOnly && (
                <p className="text-[11px] text-gray-400 dark:text-gray-500">
                    This field is managed by your account settings.
                </p>
            )}
        </div>
    );
}
