import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Extended props ────────────────────────────────────────────────────────────

interface InputProps extends React.ComponentProps<"input"> {
    /** Icon rendered inside the left side of the input */
    leftIcon?: React.ReactNode;
    /** Icon or action rendered inside the right side of the input */
    rightIcon?: React.ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

function Input({ className, type, leftIcon, rightIcon, ...props }: InputProps) {
    // When icons are provided, wrap in a relative container
    if (leftIcon || rightIcon) {
        return (
            <div className="relative w-full">
                {leftIcon && (
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground [&_svg]:h-4 [&_svg]:w-4">
                        {leftIcon}
                    </span>
                )}
                <input
                    type={type}
                    data-slot="input"
                    className={cn(
                        "h-9 w-full min-w-0 rounded-4xl border border-input bg-input/30 py-1 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 md:text-sm dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
                        leftIcon  ? "pl-10" : "pl-3",
                        rightIcon ? "pr-10" : "pr-3",
                        className
                    )}
                    {...props}
                />
                {rightIcon && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:h-4 [&_svg]:w-4">
                        {rightIcon}
                    </span>
                )}
            </div>
        );
    }

    // Plain input — no icons
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                "h-9 w-full min-w-0 rounded-4xl border border-input bg-input/30 px-3 py-1 text-base transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 md:text-sm dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
                className
            )}
            {...props}
        />
    );
}

export { Input };
export type { InputProps };
