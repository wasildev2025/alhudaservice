import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// Magic bytes for allowed image types
const MAGIC_BYTES: { [key: string]: number[] } = {
    "image/jpeg": [0xff, 0xd8, 0xff],
    "image/png": [0x89, 0x50, 0x4e, 0x47],
    "image/webp": [0x52, 0x49, 0x46, 0x46], // RIFF
    "image/gif": [0x47, 0x49, 0x46],
};

function validateMagicBytes(buffer: Buffer, declaredType: string): boolean {
    const expected = MAGIC_BYTES[declaredType];
    if (!expected) return false;
    for (let i = 0; i < expected.length; i++) {
        if (buffer[i] !== expected[i]) return false;
    }
    return true;
}

// Sanitize filename — strip path traversal, non-ASCII, and dangerous chars
function sanitizeFilename(name: string): string {
    return name
        .replace(/[^a-zA-Z0-9._-]/g, "")
        .replace(/\.{2,}/g, ".")
        .slice(-50); // max 50 chars
}

// POST – Upload an image file (admin only – protected by middleware)
export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json(
                { success: false, message: "No file uploaded" },
                { status: 400 }
            );
        }

        // Validate MIME type
        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { success: false, message: "Only JPEG, PNG, WebP, and GIF images are allowed" },
                { status: 400 }
            );
        }

        // Max 5MB
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json(
                { success: false, message: "File too large. Maximum size is 5MB" },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Validate magic bytes match declared MIME type
        if (!validateMagicBytes(buffer, file.type)) {
            return NextResponse.json(
                { success: false, message: "File content does not match declared type. Possible malicious upload." },
                { status: 400 }
            );
        }

        // Generate safe filename
        const ext = sanitizeFilename(file.name.split(".").pop() || "jpg");
        const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

        // Ensure uploads directory exists
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        await mkdir(uploadDir, { recursive: true });

        const filepath = path.join(uploadDir, filename);
        await writeFile(filepath, buffer);

        const publicUrl = `/uploads/${filename}`;

        return NextResponse.json({
            success: true,
            url: publicUrl,
        });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { success: false, message: "Upload failed" },
            { status: 500 }
        );
    }
}
