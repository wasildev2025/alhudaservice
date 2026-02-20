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
    const [nextPrayerText, setNextPrayerText] = useState("Loading...");

    useEffect(() => {
        const d = new Date();
        setDate(d.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" }));

        const calculateNextPrayer = () => {
            const now = new Date();
            let nextPrayer = prayers[0];
            let minDiff = Infinity;

            for (const prayer of prayers) {
                const [timeStr, ampm] = prayer.time.split(" ");
                let [hours, minutes] = timeStr.split(":").map(Number);
                if (ampm === "PM" && hours !== 12) hours += 12;
                if (ampm === "AM" && hours === 12) hours = 0;

                const prayerTime = new Date();
                prayerTime.setHours(hours, minutes, 0, 0);

                let diff = prayerTime.getTime() - now.getTime();

                if (diff > 0 && diff < minDiff) {
                    minDiff = diff;
                    nextPrayer = prayer;
                }
            }

            // If all prayers today have passed, next is Fajr tomorrow
            if (minDiff === Infinity) {
                const fajr = prayers[0];
                const [timeStr, ampm] = fajr.time.split(" ");
                let [hours, minutes] = timeStr.split(":").map(Number);
                if (ampm === "PM" && hours !== 12) hours += 12;
                if (ampm === "AM" && hours === 12) hours = 0;

                const tomorrowFajr = new Date();
                tomorrowFajr.setDate(tomorrowFajr.getDate() + 1);
                tomorrowFajr.setHours(hours, minutes, 0, 0);

                minDiff = tomorrowFajr.getTime() - now.getTime();
                nextPrayer = fajr;
            }

            const hrsLeft = Math.floor(minDiff / (1000 * 60 * 60));
            const minsLeft = Math.floor((minDiff % (1000 * 60 * 60)) / (1000 * 60));

            const timeString = hrsLeft > 0 ? `${hrsLeft}h ${minsLeft}m` : `${minsLeft}m`;
            setNextPrayerText(`${nextPrayer.name} in ${timeString}`);
        };

        calculateNextPrayer();
        const interval = setInterval(calculateNextPrayer, 60000);

        return () => clearInterval(interval);
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
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 relative z-10">
                        <div className="text-center md:text-left">
                            <h3 className="text-4xl font-bold font-amiri text-secondary mb-3 text-glow transition-all duration-300">Makkah / Madinah Region</h3>
                            <p className="text-primary font-bold tracking-[0.25em] text-xs uppercase flex items-center justify-center md:justify-start gap-2">
                                <span className="w-8 h-[1px] bg-primary/50 hidden md:block" />
                                {date}
                            </p>
                        </div>
                        <div className="p-6 md:p-8 rounded-[2rem] bg-gradient-to-br from-secondary via-secondary to-secondary-light text-white text-center min-w-[220px] shadow-[0_20px_40px_-10px_rgba(26,58,42,0.5)] border border-primary/20 group-hover:scale-105 transition-transform duration-500 relative overflow-hidden">
                            <div className="absolute inset-0 bg-primary/5 shimmer" />
                            <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold opacity-70 mb-2 md:mb-3 text-primary-light">Next Prayer</p>
                            <p className="text-3xl font-bold font-amiri tracking-wider text-white drop-shadow-md">{nextPrayerText}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
                        {prayers.map((prayer, index) => (
                            <motion.div
                                key={prayer.name}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="p-8 rounded-[2rem] bg-white/40 backdrop-blur-md border border-white/60 hover:border-primary/30 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(212,175,55,0.12)] transition-all duration-500 text-center flex flex-col items-center group/item relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500" />
                                <div className="p-5 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-white shadow-[0_10px_20px_rgba(212,175,55,0.08)] group-hover/item:shadow-[0_15px_30px_rgba(212,175,55,0.2)] text-primary mb-6 group-hover/item:scale-110 group-hover/item:-translate-y-1 transition-all duration-500 relative z-10">
                                    {prayer.icon}
                                </div>
                                <span className="text-xs uppercase tracking-[0.25em] font-bold text-gray-500 mb-3 relative z-10 group-hover/item:text-primary transition-colors">{prayer.name}</span>
                                <span className="text-2xl font-bold text-secondary font-amiri tracking-wider relative z-10 drop-shadow-sm">{prayer.time.split(" ")[0]}</span>
                                <span className="text-xs font-bold text-secondary/60 tracking-wider relative z-10 mt-1">{prayer.time.split(" ")[1]}</span>
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
