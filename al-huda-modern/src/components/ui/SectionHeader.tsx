"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    center?: boolean;
    light?: boolean;
}

export default function SectionHeader({ title, subtitle, center = true, light = false }: SectionHeaderProps) {
    return (
        <div className={`mb-16 ${center ? "text-center" : "text-left"}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className={`flex items-center gap-4 mb-4 ${center ? "justify-center" : ""}`}>
                    <div className="h-[2px] w-8 bg-primary/40 rounded-full" />
                    <span className="text-primary font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs">
                        Al-Huda Excellence
                    </span>
                    <div className="h-[2px] w-8 bg-primary/40 rounded-full" />
                </div>

                <h2 className={`fluid-h2 font-amiri font-bold mb-6 ${light ? "text-white" : "text-[var(--secondary)]"}`}>
                    {title}
                </h2>

                {subtitle && (
                    <p className={`max-w-2xl text-lg ${center ? "mx-auto" : ""} ${light ? "text-white/70" : "text-gray-500"}`}>
                        {subtitle}
                    </p>
                )}
            </motion.div>
        </div>
    );
}
