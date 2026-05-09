// ─── Shared TypeScript Types ───────────────────────────────────────────────────

/** Exact shape returned by GET /api/teacher/:id */
export interface TeacherProfile {
    id: number;
    fullName: string;
    email: string;
    mobileNumber?: string;
    teachingExpert?: string;
    shortBio?: string;
    /** Comma-separated list of social link URLs e.g. "https://linkedin.com/in/you, https://github.com/you" */
    socialLinks?: string;
    profilePicture?: string;
    createdAt?: string;
    updatedAt?: string;
}

// ─── Shared Helpers ────────────────────────────────────────────────────────────

/** Parse the comma-separated socialLinks string into a clean array of URLs */
export function parseSocialLinks(raw?: string): string[] {
    if (!raw) return [];
    return raw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
}

/** Format ISO date string → "Month YYYY" */
export function formatJoinDate(iso?: string, fallback = "Recently"): string {
    if (!iso) return fallback;
    return new Date(iso).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

/** Get 2-letter initials from a full name */
export function getInitials(name?: string, fallback = "TC"): string {
    if (!name) return fallback;
    return name.substring(0, 2).toUpperCase();
}
