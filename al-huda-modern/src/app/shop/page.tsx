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
                            <Button variant="primary" className="py-5 px-12 text-sm uppercase tracking-widest rounded-2xl">
                                <ExternalLink size={20} /> Go to Salla Store
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
                                <GlassCard className="p-8 h-full flex flex-col items-center text-center border border-white/20 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_40px_80px_-20px_rgba(212,175,55,0.15)] bg-white/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 group">
                                    <div className="p-4 rounded-xl bg-primary/10 text-primary mb-6 transition-transform group-hover:scale-110 duration-300">
                                        {cat.icon}
                                    </div>
                                    <h3 className="text-xl font-bold font-amiri mb-4 text-secondary group-hover:text-primary transition-colors">{cat.name}</h3>
                                    <p className="text-gray-500 text-sm mb-6 flex-1">
                                        {cat.desc}
                                    </p>
                                    <Button variant="ghost" className="text-primary text-xs uppercase tracking-widest group-hover:gap-3">
                                        Browse Category <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                    </Button>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Salla Instruction */}
            <section className="py-24 bg-secondary text-white overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent pointer-events-none opacity-50" />
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                    <div>
                        <h2 className="text-4xl font-bold font-amiri mb-8">How to Order?</h2>
                        <div className="space-y-8">
                            <motion.div whileHover={{ x: 10 }} transition={{ duration: 0.3 }} className="flex gap-6 group">
                                <div className="w-12 h-12 rounded-full border-2 border-primary/50 group-hover:border-primary flex items-center justify-center shrink-0 font-bold text-primary transition-colors">1</div>
                                <div>
                                    <h4 className="font-bold text-lg mb-2">Visit the Store</h4>
                                    <p className="text-sm text-white/70 leading-relaxed font-light">Click the button above to open our official boutique on Salla.</p>
                                </div>
                            </motion.div>
                            <motion.div whileHover={{ x: 10 }} transition={{ duration: 0.3 }} className="flex gap-6 group">
                                <div className="w-12 h-12 rounded-full border-2 border-primary/50 group-hover:border-primary flex items-center justify-center shrink-0 font-bold text-primary transition-colors">2</div>
                                <div>
                                    <h4 className="font-bold text-lg mb-2">Select Products</h4>
                                    <p className="text-sm text-white/70 leading-relaxed font-light">Add your favorite dates, books, or gift boxes to the cart.</p>
                                </div>
                            </motion.div>
                            <motion.div whileHover={{ x: 10 }} transition={{ duration: 0.3 }} className="flex gap-6 group">
                                <div className="w-12 h-12 rounded-full border-2 border-primary/50 group-hover:border-primary flex items-center justify-center shrink-0 font-bold text-primary transition-colors">3</div>
                                <div>
                                    <h4 className="font-bold text-lg mb-2">Secure Checkout</h4>
                                    <p className="text-sm text-white/70 leading-relaxed font-light">Pay via Mada, Visa, or Apple Pay and receive your items within 2-3 business days.</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                    <div className="relative h-[400px] flex items-center justify-center">
                        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
                        <GlassCard className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 z-20 border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl">
                            <div className="flex flex-col h-full gap-4">
                                <div className="w-full h-32 bg-white/20 rounded-xl animate-pulse" />
                                <div className="w-3/4 h-4 bg-white/20 rounded-full" />
                                <div className="w-1/2 h-4 bg-white/20 rounded-full" />
                                <div className="mt-auto w-full h-10 bg-primary/80 rounded-lg flex items-center justify-center text-xs font-bold uppercase tracking-widest text-primary-foreground">Add to Cart</div>
                            </div>
                        </GlassCard>
                        <div className="w-80 h-[500px] bg-gradient-to-br from-primary to-accent rounded-3xl shadow-2xl z-10 p-6 flex flex-col items-center border border-white/10 relative overflow-hidden">
                            <div className="absolute inset-0 bg-black/10 backdrop-blur-sm pointer-events-none" />
                            <div className="relative z-10 w-full flex flex-col items-center">
                                <div className="w-full h-8 bg-white/20 rounded-full mb-8" />
                                <div className="w-full h-32 bg-white/10 rounded-xl mb-4" />
                                <div className="w-full h-4 bg-white/20 rounded-full mb-4" />
                                <div className="w-full h-4 bg-white/20 rounded-full mb-4" />
                                <div className="w-full h-4 bg-white/20 rounded-full mb-12" />
                            </div>
                        </div>
                        <p className="absolute bottom-[-20px] text-[10px] uppercase tracking-widest text-white/50 font-bold">Mobile Optimized Checkout</p>
                    </div>
                </div>
            </section>
        </>
    );
}
