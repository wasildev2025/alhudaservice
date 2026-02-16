"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart } from "lucide-react";
import Button from "../ui/Button";

const navLinks = [
    { name: "Pick & Drop", href: "/pick-drop" },
    { name: "Ziyarat", href: "/ziyarat-packages" },
    { name: "Khajoor", href: "/khajoor" },
    { name: "Shop", href: "/shop" },
    { name: "Donations", href: "/donations" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[0.16,1,0.3,1] ${scrolled ? "glass-premium py-4 shadow-premium-lg" : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center text-secondary">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <span className="text-3xl font-bold font-amiri text-primary text-glow leading-none">Al-Huda</span>
                    </div>
                    <div className="flex flex-col">
                        <span className={`text-[10px] uppercase tracking-[0.3em] font-bold ${scrolled ? "text-primary/70" : "text-white/70"}`}>Services</span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-sm font-semibold tracking-wide transition-all duration-300 hover:text-primary relative group ${scrolled ? "text-secondary" : "text-white"
                                }`}
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                    <Link href="/shop">
                        <Button variant="primary" className="px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold">
                            <ShoppingCart size={16} className="mr-2" />
                            Store
                        </Button>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    className={`lg:hidden p-2 rounded-xl bg-primary/10 ${scrolled ? "text-secondary" : "text-white"}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:hidden absolute top-full left-0 right-0 glass-premium border-t border-white/10 overflow-hidden"
                    >
                        <div className="p-8 flex flex-col gap-6">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-2xl font-amiri font-bold text-primary hover:translate-x-2 transition-transform block"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <Link href="/shop" onClick={() => setIsOpen(false)}>
                                <Button variant="primary" className="w-full py-5 text-lg rounded-2xl">
                                    <ShoppingCart size={22} className="mr-3" />
                                    Visit Store
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
