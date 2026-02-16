"use client";

import { motion } from "framer-motion";

interface PageBannerProps {
    title: string;
    subtitle?: string;
}

export default function PageBanner({ title, subtitle }: PageBannerProps) {
    return (
        <section className="relative h-64 md:h-80 flex items-center justify-center bg-[var(--secondary)] overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-60"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80')" }}
                />
            </div>

            <div className="container mx-auto px-6 relative z-20 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold font-amiri text-white mb-4"
                >
                    {title}
                </motion.h1>
                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-200 max-w-2xl mx-auto"
                    >
                        {subtitle}
                    </motion.p>
                )}
            </div>
        </section>
    );
}
