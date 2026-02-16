"use client";

import PageBanner from "@/components/ui/PageBanner";
import GlassCard from "@/components/ui/GlassCard";
import { motion } from "framer-motion";
import { Shield, Sparkles, Heart, Globe } from "lucide-react";

const values = [
    { title: "Trust", desc: "Transparent pricing and reliable services you can count on.", icon: <Shield size={24} /> },
    { title: "Excellence", desc: "We strive for the highest quality in every service we deliver.", icon: <Sparkles size={24} /> },
    { title: "Islamic Ethics", desc: "Halal practices and community-first mindset in all our work.", icon: <Heart size={24} /> },
    { title: "Community", desc: "Serving the global Muslim community with care and dedication.", icon: <Globe size={24} /> },
];

export default function AboutUsPage() {
    return (
        <>
            <PageBanner
                title="About Al-Huda Services"
                subtitle="Serving pilgrims and travelers with trust, excellence, and Islamic values since 2015."
            />

            {/* Story */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-[var(--primary)] font-semibold uppercase tracking-widest text-sm">Our Story</span>
                        <h2 className="text-4xl font-bold font-amiri mt-4 mb-8">Who We Are</h2>
                        <div className="space-y-6 text-gray-600 leading-relaxed">
                            <p>
                                We are a team of dedicated professionals based in Saudi Arabia, serving pilgrims and travelers with excellence. Our services span transport, guided Ziyarat tours, premium Khajoor (dates), Islamic books, and community donation programs.
                            </p>
                            <p>
                                Every service we provide is rooted in Islamic values — honesty, transparency, and a genuine desire to serve the Ummah. Whether you&apos;re visiting for Hajj, Umrah, or business, we&apos;re here to make your journey comfortable and blessed.
                            </p>
                        </div>
                    </motion.div>
                    <div className="relative">
                        <div className="absolute -inset-4 bg-[var(--primary)]/10 rounded-3xl -rotate-2" />
                        <GlassCard className="p-12 text-center bg-[var(--secondary)] text-white border-transparent relative z-10">
                            <p className="font-amiri text-4xl mb-6 text-[var(--primary)]">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
                            <p className="text-gray-300 italic">In the Name of Allah, the Most Gracious, the Most Merciful</p>
                        </GlassCard>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 bg-[var(--cream)]">
                <div className="container mx-auto px-6 text-center mb-16">
                    <h2 className="text-4xl font-bold font-amiri mb-4">Our Core Values</h2>
                    <p className="text-gray-600 max-w-xl mx-auto">These principles guide everything we do, ensuring we serve you with the highest standards.</p>
                </div>
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((v, i) => (
                        <motion.div
                            key={v.title}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <GlassCard className="p-10 h-full text-center hover:border-[var(--primary)]/30 border-white bg-white/40">
                                <div className="p-4 rounded-xl bg-white text-[var(--primary)] mb-6 mx-auto w-fit shadow-sm">
                                    {v.icon}
                                </div>
                                <h3 className="text-xl font-bold font-amiri mb-4">{v.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </section>
        </>
    );
}
