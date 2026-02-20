"use client";

import { motion } from "framer-motion";
import GlassCard from "../ui/GlassCard";
import Button from "../ui/Button";
import Link from "next/link";
import SectionHeader from "../ui/SectionHeader";
import Image from "next/image";

const packages = [
    {
        title: "Makkah Ziyarat",
        city: "Makkah",
        desc: "A spiritual journey visiting historical sites around the Holy Masjid.",
        img: "https://images.unsplash.com/photo-1542661957-d24b453eb553?auto=format&fit=crop&q=80",
        href: "/ziyarat-packages/makkah",
    },
    {
        title: "Madinah Ziyarat",
        city: "Madinah",
        desc: "Experience the tranquility of Masjid an-Nabawi and historical battlefields.",
        img: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80",
        href: "/ziyarat-packages/madinah",
    },
    {
        title: "Taif Day Trip",
        city: "Taif",
        desc: "Discover the rose farms and historical architecture of the City of Roses.",
        img: "https://images.unsplash.com/photo-1534008757030-2679aa4352a3?auto=format&fit=crop&q=80",
        href: "/ziyarat-packages/taif",
    },
];

export default function FeaturedPackages() {
    return (
        <section className="py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="flex-1">
                        <SectionHeader
                            center={false}
                            title="Spiritual Journeys"
                            subtitle="Carefully curated Ziyarat packages designed to provide a deep, meaningful connection with the heritage of Islam."
                        />
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="hidden md:block pb-24"
                    >
                        <Link href="/ziyarat-packages">
                            <Button variant="outline" className="px-10 py-4 rounded-full text-xs uppercase tracking-widest font-bold">
                                View All Packages
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {packages.map((pkg, index) => (
                        <motion.div
                            key={pkg.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <GlassCard className="p-0 overflow-hidden flex flex-col h-full group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(212,175,55,0.15)]">
                                <div className="h-72 overflow-hidden relative">
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
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    </motion.div>
                                    <div className="absolute top-6 right-6 glass-premium px-4 py-2 rounded-full">
                                        <span className="text-primary font-bold text-[10px] uppercase tracking-widest">{pkg.city}</span>
                                    </div>
                                    <div className="absolute inset-0 bg-linear-to-t from-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                                <div className="p-10 flex flex-col flex-1">
                                    <h3 className="text-2xl font-bold font-amiri mb-4 text-secondary group-hover:text-primary transition-colors">{pkg.title}</h3>
                                    <p className="text-gray-500 text-sm mb-8 line-clamp-2 leading-relaxed">
                                        {pkg.desc}
                                    </p>
                                    <Link href={pkg.href} className="mt-auto">
                                        <Button variant="ghost" className="px-0 text-primary font-bold flex items-center gap-3 group/btn text-[10px] uppercase tracking-[0.2em]">
                                            Details <span className="group-hover/btn:translate-x-2 transition-transform">→</span>
                                        </Button>
                                    </Link>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-16 md:hidden text-center"
                >
                    <Link href="/ziyarat-packages">
                        <Button variant="outline" className="w-full py-5 rounded-2xl">View All Packages</Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
