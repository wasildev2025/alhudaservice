"use client";

import { motion } from "framer-motion";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd"> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    children: ReactNode;
}

export default function Button({ children, variant = "primary", className, ...props }: ButtonProps) {
    const variants = {
        primary: "bg-gradient-to-r from-primary via-primary to-primary-dark text-white shadow-[0_8px_16px_-6px_rgba(212,175,55,0.5)] hover:shadow-[0_12px_24px_-8px_rgba(212,175,55,0.7)] border border-primary-light/40 relative before:absolute before:inset-0 before:bg-white/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity",
        secondary: "bg-gradient-to-r from-secondary via-secondary to-secondary-light text-white shadow-[0_8px_16px_-6px_rgba(26,58,42,0.5)] hover:shadow-[0_12px_24px_-8px_rgba(26,58,42,0.7)] border border-white/10 relative before:absolute before:inset-0 before:bg-white/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity",
        outline: "bg-white/5 backdrop-blur-sm border border-primary/40 text-primary hover:bg-primary/5 hover:border-primary shadow-[0_4px_12px_-4px_rgba(212,175,55,0.2)] hover:shadow-[0_8px_16px_-4px_rgba(212,175,55,0.4)]",
        ghost: "bg-transparent hover:bg-primary/10 text-[var(--foreground)] hover:text-primary border border-transparent",
    };

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className={cn(
                "btn shimmer inline-flex items-center justify-center gap-2 font-bold tracking-wide transition-all duration-300 rounded-xl px-6 py-3.5 overflow-hidden",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
}
