"use client";

import PageBanner from "@/components/ui/PageBanner";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { MapPin, Clock, Users, ArrowRight } from "lucide-react";
import Image from "next/image";

const packages = [
    {
        title: "Makkah Historic Sites",
        city: "Makkah",
        duration: "4-5 Hours",
        group: "1-5 Persons",
        desc: "Visit Jabal al-Nour, Jabal Thawr, Mina, Muzdalifah, and Arafat with a professional guide.",
        img: "https://images.unsplash.com/photo-1542661957-d24b453eb553?auto=format&fit=crop&q=80",
    },
    {
        title: "Madinah Ziyarat",
        city: "Madinah",
        duration: "3-4 Hours",
        group: "1-5 Persons",
        desc: "Guided tour to Masjid Quba, Masjid Qiblatain, Seven Mosques, and Uhud Mountain.",
        img: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80",
    },
    {
        title: "Badr Battlefield Tour",
        city: "Badr",
        duration: "Full Day",
        group: "1-4 Persons",
        desc: "A spiritual journey to the site of the first battle of Islam, including the martyrs' cemetery.",
        img: "https://images.unsplash.com/photo-1582233221943-42e0591b658a?auto=format&fit=crop&q=80",
    },
    {
        title: "Taif City Highlights",
        city: "Taif",
        duration: "Full Day",
        group: "1-5 Persons",
        desc: "Explore the mosque of Abdullah Ibn Abbas, the rose water factories, and the mountain views.",
        img: "https://images.unsplash.com/photo-1534008757030-2679aa4352a3?auto=format&fit=crop&q=80",
    },
];

export default function ZiyaratPackagesPage() {
    return (
        <>
            <PageBanner
                title="Ziyarat Packages"
                subtitle="Curated guided tours to the sacred and historical sites of the Holy Land."
            />

            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {packages.map((pkg, index) => (
                            <motion.div
                                key={pkg.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <GlassCard className="p-0 overflow-hidden flex flex-col sm:flex-row h-full border border-white/20 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.1)] group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_-20px_rgba(212,175,55,0.15)]">
                                    <div
                                        className="sm:w-2/5 h-64 sm:h-auto relative overflow-hidden"
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.8 }}
                                            className="relative h-full w-full"
                                        >
                                            <Image
                                                src={pkg.img}
                                                alt={pkg.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 640px) 100vw, 40vw"
                                            />
                                        </motion.div>
                                    </div>
                                    <div className="p-8 sm:w-3/5 flex flex-col justify-center bg-white/40 backdrop-blur-md">
                                        <div className="flex items-center gap-2 text-[var(--primary)] text-xs font-bold uppercase tracking-wider mb-4">
                                            <MapPin size={14} /> {pkg.city}
                                        </div>
                                        <h3 className="text-2xl font-bold font-amiri mb-3">{pkg.title}</h3>
                                        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                                            {pkg.desc}
                                        </p>
                                        <div className="flex flex-wrap gap-4 mb-8 text-xs font-medium text-gray-500">
                                            <span className="flex items-center gap-1"><Clock size={14} /> {pkg.duration}</span>
                                            <span className="flex items-center gap-1"><Users size={14} /> {pkg.group}</span>
                                        </div>
                                        <Button variant="outline" className="w-full sm:w-fit text-sm group/btn">
                                            Request Package <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </Button>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Inquiry Form Section */}
            <section className="py-24 bg-[var(--cream)]">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold font-amiri mb-6">Need a Custom Itinerary?</h2>
                    <p className="text-gray-600 max-w-xl mx-auto mb-10">
                        If you want to visit specific sites or have special requirements, our guides can tailor a package just for you.
                    </p>
                    <div className="max-w-3xl mx-auto relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 pointer-events-none" />
                        <GlassCard className="p-10 border border-white/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] bg-white/40 backdrop-blur-2xl relative z-10 transition-all duration-500">
                            <form className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-6 text-left">
                                <div className="flex flex-col gap-2 relative group/input">
                                    <label className="text-xs font-bold uppercase tracking-widest text-secondary/70 ml-1 transition-colors group-focus-within/input:text-primary">Package Interest</label>
                                    <select className="w-full p-4 rounded-2xl border-2 border-white/50 bg-white/50 transition-all duration-300 focus:bg-white focus:border-primary focus:shadow-[0_0_0_4px_rgba(212,175,55,0.1)] outline-none backdrop-blur-sm text-gray-600 appearance-none">
                                        <option>Makkah Sites</option>
                                        <option>Madinah Sites</option>
                                        <option>Badr Tour</option>
                                        <option>Taif Day Trip</option>
                                        <option>Custom Tour</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2 relative group/input">
                                    <label className="text-xs font-bold uppercase tracking-widest text-secondary/70 ml-1 transition-colors group-focus-within/input:text-primary">Number of Persons</label>
                                    <input type="number" className="w-full p-4 rounded-2xl border-2 border-white/50 bg-white/50 transition-all duration-300 focus:bg-white focus:border-primary focus:shadow-[0_0_0_4px_rgba(212,175,55,0.1)] outline-none backdrop-blur-sm" placeholder="2" />
                                </div>
                                <div className="flex flex-col gap-2 relative group/input">
                                    <label className="text-xs font-bold uppercase tracking-widest text-secondary/70 ml-1 transition-colors group-focus-within/input:text-primary">Travel Date</label>
                                    <input type="date" className="w-full p-4 rounded-2xl border-2 border-white/50 bg-white/50 transition-all duration-300 focus:bg-white focus:border-primary focus:shadow-[0_0_0_4px_rgba(212,175,55,0.1)] outline-none backdrop-blur-sm text-gray-600" />
                                </div>
                                <div className="flex flex-col gap-2 relative group/input">
                                    <label className="text-xs font-bold uppercase tracking-widest text-secondary/70 ml-1 transition-colors group-focus-within/input:text-primary">Mobile / WhatsApp</label>
                                    <input type="tel" className="w-full p-4 rounded-2xl border-2 border-white/50 bg-white/50 transition-all duration-300 focus:bg-white focus:border-primary focus:shadow-[0_0_0_4px_rgba(212,175,55,0.1)] outline-none backdrop-blur-sm" placeholder="+966 50 000 0000" />
                                </div>
                                <div className="md:col-span-2 mt-4">
                                    <Button variant="primary" className="w-full py-5 text-sm uppercase tracking-widest rounded-2xl hover:-translate-y-1">
                                        Send Inquiry
                                    </Button>
                                </div>
                            </form>
                        </GlassCard>
                    </div>
                </div>
            </section>
        </>
    );
}
