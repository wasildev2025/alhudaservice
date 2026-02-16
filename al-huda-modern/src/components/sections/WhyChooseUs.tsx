"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Timer, Headset, Heart } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import SectionHeader from "../ui/SectionHeader";

const values = [
    {
        title: "Trusted Service",
        desc: "Over 8 years of dedicated experience serving pilgrims in the Holy Cities.",
        icon: <ShieldCheck size={32} />,
    },
    {
        title: "Transparent Pricing",
        desc: "No hidden fees. Honest, upfront rates for every service we provide.",
        icon: <Timer size={32} />,
    },
    {
        title: "24/7 Support",
        desc: "Our team is available round the clock via WhatsApp for your peace of mind.",
        icon: <Headset size={32} />,
    },
    {
        title: "Halal & Ethical",
        desc: "Rooted in Islamic values, ensuring excellence in every interaction.",
        icon: <Heart size={32} />,
    },
];

export default function WhyChooseUs() {
    return (
        <section className="py-32 bg-secondary text-white relative overflow-hidden">
            {/* Background pattern or subtle glow */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6">
                <SectionHeader
                    light
                    title="Why Trust Al-Huda?"
                    subtitle="With over a decade of experience, we've mastered the art of providing seamless travel and spiritual services."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-16">
                    {values.map((value, index) => (
                        <motion.div
                            key={value.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            viewport={{ once: true }}
                            className="text-center group"
                        >
                            <div className="mb-8 relative inline-block">
                                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 group-hover:scale-200 transition-transform duration-700" />
                                <div className="relative p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 text-primary shadow-premium-lg group-hover:-rotate-6 transition-transform">
                                    {value.icon}
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold font-amiri mb-4 italic">{value.title}</h3>
                            <p className="text-white/60 text-sm leading-relaxed font-light">
                                {value.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
