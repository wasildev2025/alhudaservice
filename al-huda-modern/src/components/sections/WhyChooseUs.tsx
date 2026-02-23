"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Timer, Headset, Heart, Users, MapPin, Award } from "lucide-react";
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
    const [stats, setStats] = useState({
        customers: "10,000+",
        ziyarats: "500+",
        years: "10+"
    });

    useEffect(() => {
        fetch("/api/settings")
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) {
                    setStats({
                        customers: data.data.statCustomers || "10,000+",
                        ziyarats: data.data.statZiyarats || "500+",
                        years: data.data.statYears || "10+"
                    });
                }
            })
            .catch(console.error);
    }, []);

    return (
        <section className="py-32 bg-secondary text-white relative overflow-hidden">
            {/* Background pattern or subtle glow */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <SectionHeader
                    light
                    title="Why Trust Al-Huda?"
                    subtitle="With over a decade of experience, we've mastered the art of providing seamless travel and spiritual services."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-16 mb-24">
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

                {/* Company Statistics Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center flex flex-col items-center group hover:bg-white/10 transition-colors duration-500">
                        <Users className="text-primary mb-4 opacity-80 group-hover:scale-110 transition-transform duration-500" size={40} />
                        <div className="text-5xl font-bold font-amiri text-white mb-2 tracking-tight">{stats.customers}</div>
                        <div className="text-primary text-xs uppercase tracking-[0.2em] font-bold">Happy Customers</div>
                    </div>

                    <div className="bg-primary/10 backdrop-blur-md border border-primary/20 rounded-3xl p-8 text-center flex flex-col items-center group hover:bg-primary/20 transition-colors duration-500 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none" />
                        <MapPin className="text-primary mb-4 opacity-80 group-hover:scale-110 transition-transform duration-500" size={40} />
                        <div className="text-5xl font-bold font-amiri text-white mb-2 tracking-tight">{stats.ziyarats}</div>
                        <div className="text-primary text-xs uppercase tracking-[0.2em] font-bold">Guided Ziyarats</div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center flex flex-col items-center group hover:bg-white/10 transition-colors duration-500">
                        <Award className="text-primary mb-4 opacity-80 group-hover:scale-110 transition-transform duration-500" size={40} />
                        <div className="text-5xl font-bold font-amiri text-white mb-2 tracking-tight">{stats.years}</div>
                        <div className="text-primary text-xs uppercase tracking-[0.2em] font-bold">Years of Trust</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
