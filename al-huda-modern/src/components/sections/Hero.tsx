"use client";

import { motion } from "framer-motion";
import Button from "../ui/Button";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-secondary">
            {/* Background with advanced overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-linear-to-b from-secondary/80 via-secondary/40 to-secondary/90 z-10" />
                <motion.div
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, ease: "linear" }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80')" }}
                />
            </div>

            <div className="container mx-auto px-6 relative z-20 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-8 inline-block"
                >
                    <p className="font-amiri text-4xl md:text-6xl mb-4 text-primary text-glow drop-shadow-2xl">
                        بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
                    </p>
                    <div className="h-[1px] w-full bg-linear-to-r from-transparent via-primary/50 to-transparent" />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xs md:text-sm uppercase tracking-[0.5em] font-bold mb-8 text-primary/80"
                >
                    In the Name of Allah, the Most Gracious, the Most Merciful
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="fluid-h1 font-bold font-amiri mb-10 tracking-tight leading-tight"
                >
                    Excellence in <span className="text-primary italic">Ziyarat</span> & <span className="text-primary italic">Seva</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-lg md:text-xl max-w-3xl mx-auto mb-16 text-white/70 leading-relaxed font-light"
                >
                    Al-Huda Services provides premium transport, bespoke spiritual journeys, and the finest selection of authentic Madinah dates for the global Muslim community.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-wrap justify-center gap-8"
                >
                    <Link href="/pick-drop">
                        <Button variant="primary" className="py-5 px-14 text-sm uppercase tracking-widest font-bold rounded-full shadow-2xl">
                            Book Transport
                        </Button>
                    </Link>
                    <Link href="/ziyarat-packages">
                        <Button variant="outline" className="py-5 px-14 text-sm uppercase tracking-widest font-bold rounded-full !border-white/20 !text-white hover:!bg-white hover:!text-secondary backdrop-blur-sm transition-all">
                            View Packages
                        </Button>
                    </Link>
                </motion.div>
            </div>

            {/* Scroll indicator with refined design */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary/50">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-5 h-8 border border-primary/30 rounded-full flex justify-center p-1.5"
                >
                    <motion.div className="w-1 h-1.5 bg-primary rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
}
