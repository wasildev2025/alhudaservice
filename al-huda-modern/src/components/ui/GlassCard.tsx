"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
}

export default function GlassCard({ children, className, hover = true }: GlassCardProps) {
    return (
        <motion.div
            whileHover={hover ? { y: -10 } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(
                "glass-card-premium",
                className
            )}
        >
            {children}
        </motion.div>
    );
}
