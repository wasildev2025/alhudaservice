"use client";

import { motion } from "framer-motion";
import { Moon, Sun, Cloud, Sunrise, Stars } from "lucide-react";
import { useEffect, useState } from "react";
import SectionHeader from "../ui/SectionHeader";

const prayers = [
    { name: "Fajr", icon: <Moon size={20} />, time: "05:24 AM" },
    { name: "Dhuhr", icon: <Sun size={20} />, time: "12:26 PM" },
    { name: "Asr", icon: <Cloud size={20} />, time: "03:45 PM" },
    { name: "Maghrib", icon: <Sunrise size={20} />, time: "06:12 PM" },
    { name: "Isha", icon: <Stars size={20} />, time: "07:42 PM" },
];

export default function PrayerTimes() {
    const [date, setDate] = useState("");

    useEffect(() => {
        const d = new Date();
        setDate(d.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" }));
    }, []);

    return (
        <section className="py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-5xl">
                <SectionHeader
                    title="Daily Spiritual Rhythms"
                    subtitle="Accurate prayer timings for the Holy Cities of Makkah and Madinah."
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="glass-premium rounded-[3rem] p-10 md:p-16 relative overflow-hidden group"
                >
                    {/* Decorative radial gradient */}
                    <div className="absolute top-0 right-0 w-full h-full bg-radial-gradient(circle at 100% 0%, rgba(212, 175, 55, 0.05), transparent) pointer-events-none" />

                    <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 relative z-10">
                        <div className="text-center md:text-left">
                            <h3 className="text-3xl font-bold font-amiri text-secondary mb-2">Makkah / Madinah Region</h3>
                            <p className="text-primary font-bold tracking-[0.2em] text-xs uppercase">{date}</p>
                        </div>
                        <div className="p-5 rounded-2xl bg-secondary text-white text-center min-w-[180px] shadow-premium-lg border border-white/10 group-hover:scale-105 transition-transform duration-500">
                            <p className="text-[10px] uppercase tracking-widest opacity-60 mb-2">Next Prayer</p>
                            <p className="text-2xl font-bold font-amiri tracking-wider">Asr in 45m</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
                        {prayers.map((prayer, index) => (
                            <motion.div
                                key={prayer.name}
                                whileHover={{ y: -5 }}
                                className="p-8 rounded-3xl bg-secondary/5 border border-white/20 hover:bg-primary/10 transition-all duration-300 text-center flex flex-col items-center group/item"
                            >
                                <div className="p-4 rounded-xl bg-white shadow-premium-sm text-primary mb-6 group-hover/item:scale-110 transition-transform duration-500">
                                    {prayer.icon}
                                </div>
                                <span className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-2">{prayer.name}</span>
                                <span className="text-xl font-bold text-secondary font-amiri tracking-wider">{prayer.time}</span>
                            </motion.div>
                        ))}
                    </div>

                    <p className="mt-12 text-center text-[10px] text-gray-400 uppercase tracking-widest leading-loose">
                        * Prayer times are indicative. Please consult local Masajid for exact Iqamah schedules.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
