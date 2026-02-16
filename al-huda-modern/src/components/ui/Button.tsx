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
        primary: "bg-primary text-secondary hover:bg-primary-dark shadow-premium-sm hover:shadow-premium-md",
        secondary: "bg-secondary text-white hover:bg-secondary-light shadow-premium-sm hover:shadow-premium-md",
        outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-secondary",
        ghost: "bg-transparent hover:bg-primary/10 text-[var(--foreground)]",
    };

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className={cn(
                "btn shimmer active:translate-y-0.5",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
}
