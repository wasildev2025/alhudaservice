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
            <section className="py-24 bg-secondary text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1565552645632-d725f8bfcbee?auto=format&fit=crop&q=80')] bg-cover bg-fixed opacity-10" />
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-primary font-bold uppercase tracking-widest text-xs flex items-center gap-2 mb-4">
                            <span className="w-8 h-px bg-primary"></span> Our Story
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold font-amiri mb-8 leading-tight">Serving the Ummah with Excellence</h2>
                        <div className="space-y-6 text-white/70 leading-relaxed font-light text-lg">
                            <p>
                                We are a team of dedicated professionals based in Saudi Arabia, serving pilgrims and travelers with excellence. Our services span transport, guided Ziyarat tours, premium Khajoor (dates), Islamic books, and community donation programs.
                            </p>
                            <p>
                                Every service we provide is rooted in Islamic values — honesty, transparency, and a genuine desire to serve the Ummah. Whether you&apos;re visiting for Hajj, Umrah, or business, we&apos;re here to make your journey comfortable and blessed.
                            </p>
                        </div>
                    </motion.div>
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-transparent rounded-[40px] blur-2xl" />
                        <GlassCard className="p-16 text-center bg-white/10 backdrop-blur-2xl border-white/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] relative z-10 rounded-[30px] group transition-all duration-500 hover:bg-white/15">
                            <p className="font-amiri text-5xl mb-8 text-primary group-hover:scale-105 transition-transform duration-500">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
                            <p className="text-white/60 italic font-light tracking-wide">&quot;In the Name of Allah, the Most Gracious, the Most Merciful&quot;</p>
                        </GlassCard>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cream to-transparent pointer-events-none" />
                <div className="container mx-auto px-6 text-center mb-16 relative z-10">
                    <h2 className="text-4xl font-bold font-amiri mb-4 text-secondary">Our Core Values</h2>
                    <p className="text-gray-500 max-w-xl mx-auto font-light">These principles guide everything we do, ensuring we serve you with the highest standards.</p>
                </div>
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                    {values.map((v, i) => (
                        <motion.div
                            key={v.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <GlassCard className="p-10 h-full text-center hover:border-primary/30 border-gray-100 bg-white shadow-xl hover:shadow-[0_30px_60px_-15px_rgba(212,175,55,0.15)] transition-all duration-500 hover:-translate-y-2 group">
                                <div className="p-5 rounded-2xl bg-cream text-primary mb-8 mx-auto w-fit shadow-inner group-hover:scale-110 transition-transform duration-500 group-hover:bg-primary/10">
                                    {v.icon}
                                </div>
                                <h3 className="text-xl font-bold font-amiri mb-4 text-secondary group-hover:text-primary transition-colors">{v.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed font-light">{v.desc}</p>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </section>
        </>
    );
}
