"use client";

import { motion } from "framer-motion";
import GlassCard from "../ui/GlassCard";
import Button from "../ui/Button";
import Link from "next/link";
import { BookOpen, ShoppingBag } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import Image from "next/image";

export default function ShopShowcase() {
    return (
        <section className="py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6">
                <SectionHeader
                    title="The Al-Huda Boutique"
                    subtitle="Discover authentic Madinah dates and a curated selection of Islamic literature."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Dates Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                    >
                        <GlassCard className="p-0 overflow-hidden flex flex-col md:flex-row h-full group min-h-[450px] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_-20px_rgba(212,175,55,0.15)]">
                            <div
                                className="md:w-1/2 h-80 md:h-auto overflow-hidden relative"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.8 }}
                                    className="relative h-full w-full"
                                >
                                    <Image
                                        src="https://images.unsplash.com/photo-1610450949065-1faba0d74026?auto=format&fit=crop&q=80"
                                        alt="Premium Madinah Dates"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </motion.div>
                            </div>
                            <div className="p-10 md:w-1/2 flex flex-col justify-center bg-white/5 backdrop-blur-sm">
                                <div className="text-primary mb-8 p-4 rounded-2xl bg-primary/10 inline-block w-fit">
                                    <ShoppingBag size={32} />
                                </div>
                                <h3 className="text-3xl font-bold font-amiri mb-6 text-secondary italic">Premium Madinah Dates</h3>
                                <p className="text-gray-500 text-sm mb-10 leading-relaxed font-light">
                                    Sourced directly from the blessed palm groves of Al-Madinah Al-Munawwarah. Our Ajwa and Safawi varieties are hand-picked for perfection.
                                </p>
                                <Link href="/khajoor">
                                    <Button variant="primary" className="w-full py-5 rounded-2xl font-bold tracking-widest text-xs uppercase">
                                        Explore Collection
                                    </Button>
                                </Link>
                            </div>
                        </GlassCard>
                    </motion.div>

                    {/* Books Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                    >
                        <GlassCard className="p-0 overflow-hidden flex flex-col md:flex-row h-full group min-h-[450px] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_-20px_rgba(212,175,55,0.15)]">
                            <div
                                className="md:w-1/2 h-80 md:h-auto md:order-2 overflow-hidden relative"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.8 }}
                                    className="relative h-full w-full"
                                >
                                    <Image
                                        src="https://images.unsplash.com/photo-1585779034823-7e9ac8faec70?auto=format&fit=crop&q=80"
                                        alt="Islamic Bookstore"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </motion.div>
                            </div>
                            <div className="p-10 md:w-1/2 flex flex-col justify-center md:order-1 bg-white/5 backdrop-blur-sm">
                                <div className="text-primary mb-8 p-4 rounded-2xl bg-primary/10 inline-block w-fit">
                                    <BookOpen size={32} />
                                </div>
                                <h3 className="text-3xl font-bold font-amiri mb-6 text-secondary italic">Islamic Bookstore</h3>
                                <p className="text-gray-500 text-sm mb-10 leading-relaxed font-light">
                                    A treasury of spiritual wisdom. From Quranic exegesis to Prophetic biography, discover authentic knowledge to light your path.
                                </p>
                                <Link href="/shop">
                                    <Button variant="outline" className="w-full py-5 rounded-2xl font-bold tracking-widest text-xs uppercase !border-primary/20 hover:!border-primary">
                                        Browse Library
                                    </Button>
                                </Link>
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
