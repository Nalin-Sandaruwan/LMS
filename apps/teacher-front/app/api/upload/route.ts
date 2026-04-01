import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// ── Allow larger bodies for video uploads (Node.js runtime only) ──
export const runtime = "nodejs";

// Max file sizes per type (enforced on server)
const MAX_SIZES: Record<string, number> = {
    "video/mp4": 2 * 1024 * 1024 * 1024,          // 2 GB
    "video/webm": 2 * 1024 * 1024 * 1024,
    "video/quicktime": 2 * 1024 * 1024 * 1024,
    "application/pdf": 200 * 1024 * 1024,          // 200 MB
    "application/msword": 100 * 1024 * 1024,       // 100 MB
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": 100 * 1024 * 1024,
};

const ALLOWED_TYPES = new Set([
    "video/mp4",
    "video/webm",
    "video/quicktime",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function sanitizeFileName(name: string): string {
    return name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9._-]/g, "")
        .slice(0, 128);
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;
        const category = (formData.get("category") as string) || "misc";

        if (!file) {
            return NextResponse.json({ error: "No file provided." }, { status: 400 });
        }

        // ── Type validation ──
        if (!ALLOWED_TYPES.has(file.type)) {
            return NextResponse.json(
                { error: `File type "${file.type}" is not allowed. Accepted: MP4, WEBM, MOV, PDF, DOC, DOCX.` },
                { status: 415 }
            );
        }

        // ── Size validation ──
        const maxSize = MAX_SIZES[file.type] ?? 100 * 1024 * 1024;
        if (file.size > maxSize) {
            const mb = (maxSize / (1024 * 1024)).toFixed(0);
            return NextResponse.json(
                { error: `File exceeds the ${mb} MB limit for this type.` },
                { status: 413 }
            );
        }

        // ── Write file to /public/uploads/<category>/ ──
        const subDir = category === "video" ? "videos" : "documents";
        const uploadDir = path.join(process.cwd(), "public", "uploads", subDir);
        await mkdir(uploadDir, { recursive: true });

        const ext = path.extname(file.name) || "";
        const baseName = sanitizeFileName(path.basename(file.name, ext));
        const uniqueName = `${Date.now()}-${baseName}${ext}`;
        const filePath = path.join(uploadDir, uniqueName);

        const buffer = Buffer.from(await file.arrayBuffer());
        await writeFile(filePath, buffer);

        const publicUrl = `/uploads/${subDir}/${uniqueName}`;

        return NextResponse.json({
            url: publicUrl,
            name: file.name,
            size: file.size,
            type: file.type,
        });
    } catch (err) {
        console.error("[upload] error:", err);
        return NextResponse.json({ error: "Upload failed. Please try again." }, { status: 500 });
    }
}
