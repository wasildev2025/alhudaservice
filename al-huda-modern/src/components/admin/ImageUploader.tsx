"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, Link2, X, Loader2 } from "lucide-react";

interface ImageUploaderProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
}

export default function ImageUploader({ value, onChange, label = "Image" }: ImageUploaderProps) {
    const [mode, setMode] = useState<"url" | "upload">(value && value.startsWith("http") ? "url" : "upload");
    const [uploading, setUploading] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await fetch("/api/upload", { method: "POST", body: formData });
            const data = await res.json();
            if (data.success) {
                onChange(data.url);
            } else {
                alert(data.message || "Upload failed");
            }
        } catch {
            alert("Upload failed. Please try again.");
        }
        setUploading(false);
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <label className="block text-white/70 text-sm">{label}</label>
                <div className="flex gap-1 bg-white/5 rounded-lg p-0.5">
                    <button
                        type="button"
                        onClick={() => setMode("upload")}
                        className={`px-3 py-1 rounded-md text-xs transition-all ${mode === "upload" ? "bg-[#D4AF37]/20 text-[#D4AF37]" : "text-white/40 hover:text-white/60"}`}
                    >
                        <Upload size={12} className="inline mr-1" />Upload
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode("url")}
                        className={`px-3 py-1 rounded-md text-xs transition-all ${mode === "url" ? "bg-[#D4AF37]/20 text-[#D4AF37]" : "text-white/40 hover:text-white/60"}`}
                    >
                        <Link2 size={12} className="inline mr-1" />URL
                    </button>
                </div>
            </div>

            {mode === "url" ? (
                <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50"
                    placeholder="https://example.com/image.jpg"
                />
            ) : (
                <div>
                    <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                    <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        disabled={uploading}
                        className="w-full py-3 border-2 border-dashed border-white/10 rounded-xl bg-white/[0.02] hover:bg-white/5 text-white/40 hover:text-white/60 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {uploading ? (
                            <><Loader2 size={16} className="animate-spin" /> Uploading...</>
                        ) : (
                            <><Upload size={16} /> Click to upload image (max 5MB)</>
                        )}
                    </button>
                </div>
            )}

            {/* Preview */}
            {value && (
                <div className="relative inline-block">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-white/10">
                        <Image src={value} alt="Preview" fill className="object-cover" sizes="96px" />
                    </div>
                    <button
                        type="button"
                        onClick={() => onChange("")}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                    >
                        <X size={10} />
                    </button>
                </div>
            )}
        </div>
    );
}
