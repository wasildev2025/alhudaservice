"use client";

import PageBanner from "@/components/ui/PageBanner";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { ExternalLink, Book, ShoppingBag, Heart } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
    {
        name: "Islamic Books",
        desc: "Quran, Hadith collections, and children's Islamic books.",
        icon: <Book size={32} />,
        href: "#", // Salla URL
    },
    {
        name: "Premium Dates",
        desc: "Ajwa, Safawi, and specialized Madinah date gifts.",
        icon: <ShoppingBag size={32} />,
        href: "/khajoor",
    },
    {
        name: "Donation Packs",
        desc: "Sponsor meals or contribute to mosque maintenance.",
        icon: <Heart size={32} />,
        href: "/donations",
    },
];

export default function ShopPage() {
    const sallaUrl = "https://salla.sa/al-huda"; // Example

    return (
        <>
            <PageBanner
                title="Al-Huda Boutique"
                subtitle="Our complete catalog of authentic Islamic products is available on our dedicated Salla store."
            />

            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <div className="p-6 rounded-full bg-[var(--cream)] w-fit mx-auto mb-8 text-[var(--primary)]">
                            <ShoppingBag size={48} />
                        </div>
                        <h2 className="text-4xl font-bold font-amiri mb-6">Visit Our Online Store</h2>
                        <p className="text-gray-600 mb-10 text-lg">
                            We use the Salla platform to ensure secure payments, reliable delivery tracking, and a smooth shopping experience for our customers across the Kingdom.
                        </p>
                        <a href={sallaUrl} target="_blank" rel="noopener noreferrer">
                            <Button variant="primary" className="py-5 px-12 text-xl shadow-2xl gap-3">
                                <ExternalLink size={24} /> Go to Salla Store
                            </Button>
                        </a>
                        <p className="text-xs text-gray-400 mt-6 uppercase tracking-widest font-semibold">Secure Payment Methods Supported</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {categories.map((cat, index) => (
                            <motion.div
                                key={cat.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <GlassCard className="p-8 h-full flex flex-col items-center text-center border-[var(--border)] hover:border-[var(--primary)] shadow-md">
                                    <div className="p-4 rounded-xl bg-[var(--cream)] text-[var(--primary)] mb-6">
                                        {cat.icon}
                                    </div>
                                    <h3 className="text-xl font-bold font-amiri mb-4">{cat.name}</h3>
                                    <p className="text-gray-500 text-sm mb-6 flex-1">
                                        {cat.desc}
                                    </p>
                                    <Button variant="ghost" className="text-[var(--primary)] font-bold text-sm">
                                        Browse Category
                                    </Button>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Salla Instruction */}
            <section className="py-24 bg-[var(--secondary)] text-white overflow-hidden relative">
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-bold font-amiri mb-8">How to Order?</h2>
                        <div className="space-y-8">
                            <div className="flex gap-6">
                                <div className="w-12 h-12 rounded-full border-2 border-[var(--primary)] flex items-center justify-center shrink-0 font-bold text-[var(--primary)]">1</div>
                                <div>
                                    <h4 className="font-bold text-lg mb-2">Visit the Store</h4>
                                    <p className="text-sm opacity-70 leading-relaxed">Click the button above to open our official boutique on Salla.</p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="w-12 h-12 rounded-full border-2 border-[var(--primary)] flex items-center justify-center shrink-0 font-bold text-[var(--primary)]">2</div>
                                <div>
                                    <h4 className="font-bold text-lg mb-2">Select Products</h4>
                                    <p className="text-sm opacity-70 leading-relaxed">Add your favorite dates, books, or gift boxes to the cart.</p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="w-12 h-12 rounded-full border-2 border-[var(--primary)] flex items-center justify-center shrink-0 font-bold text-[var(--primary)]">3</div>
                                <div>
                                    <h4 className="font-bold text-lg mb-2">Secure Checkout</h4>
                                    <p className="text-sm opacity-70 leading-relaxed">Pay via Mada, Visa, or Apple Pay and receive your items within 2-3 business days.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-[400px] flex items-center justify-center">
                        <GlassCard className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 z-20 border-white/20 bg-white/10" hover={false}>
                            <div />
                        </GlassCard>
                        <div className="w-80 h-[500px] bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] rounded-2xl shadow-2xl z-10 p-6 flex flex-col items-center">
                            <div className="w-full h-8 bg-white/20 rounded-full mb-8" />
                            <div className="w-full h-32 bg-white/10 rounded-xl mb-4" />
                            <div className="w-full h-4 bg-white/20 rounded-full mb-4" />
                            <div className="w-full h-4 bg-white/20 rounded-full mb-4" />
                            <div className="w-full h-4 bg-white/20 rounded-full mb-12" />
                            <div className="w-full h-12 bg-white rounded-xl" />
                        </div>
                        <p className="absolute bottom-0 text-[10px] uppercase tracking-widest opacity-30">Mobile Optimized Checkout</p>
                    </div>
                </div>
            </section>
        </>
    );
}
