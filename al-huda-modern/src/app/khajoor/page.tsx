"use client";

import PageBanner from "@/components/ui/PageBanner";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { ShoppingCart, Gift, Package, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const dates = [
    {
        name: "Ajwa Al-Madinah",
        desc: "The world-famous 'Prophet's Date'. Soft, dark, and sweet with numerous health benefits.",
        img: "https://images.unsplash.com/photo-1610450949065-1faba0d74026?auto=format&fit=crop&q=80",
        price: "From 60 SAR / kg",
        popular: true,
    },
    {
        name: "Safawi Madinah",
        desc: "Beautiful dark-colored semi-dry dates. Known for their soft texture and deep sweetness.",
        img: "https://images.unsplash.com/photo-1541123281989-d935639f75ec?auto=format&fit=crop&q=80",
        price: "From 45 SAR / kg",
        popular: false,
    },
    {
        name: "Mabroom Dates",
        desc: "Long, slender dates with a unique chewy texture and a light, honey-like sweetness.",
        img: "https://images.unsplash.com/photo-1579294247076-921b795669f6?auto=format&fit=crop&q=80",
        price: "From 55 SAR / kg",
        popular: false,
    },
];

export default function KhajoorPage() {
    return (
        <>
            <PageBanner
                title="Premium Madinah Dates"
                subtitle="Experience the sweetness of the blessed city with our hand-picked Khajoor collection."
            />

            {/* Varieties */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold font-amiri mb-4">Our Finest Selection</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Sourced directly from the lush palm groves of Madinah al-Munawwarah.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {dates.map((date, index) => (
                            <motion.div
                                key={date.name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <GlassCard className="p-0 overflow-hidden flex flex-col h-full border-[var(--border)] group">
                                    <div
                                        className="h-72 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                        style={{ backgroundImage: `url(${date.img})` }}
                                    >
                                        {date.popular && (
                                            <div className="absolute top-4 left-4 bg-[var(--primary)] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
                                                Most Popular
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-8 flex flex-col flex-1 bg-white">
                                        <h3 className="text-2xl font-bold font-amiri mb-2">{date.name}</h3>
                                        <span className="text-[var(--primary)] font-bold mb-4">{date.price}</span>
                                        <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                                            {date.desc}
                                        </p>
                                        <Button variant="primary" className="w-full gap-2 mt-auto">
                                            <ShoppingCart size={18} /> Buy on Salla Store
                                        </Button>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bulk & Gifts */}
            <section className="py-24 bg-[var(--cream)]">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        <GlassCard className="p-10 border-white bg-white/60 flex flex-col items-center text-center">
                            <div className="p-4 rounded-full bg-[var(--secondary)] text-[var(--primary)] mb-6">
                                <Package size={32} />
                            </div>
                            <h3 className="text-2xl font-bold font-amiri mb-4">Bulk & Wholesale Inquiries</h3>
                            <p className="text-gray-600 text-sm mb-8">
                                Planning for an event, distribution, or resale? We provide special wholesale rates for bulk orders delivered across Saudi Arabia.
                            </p>
                            <form className="w-full space-y-4 text-left">
                                <input type="text" className="w-full p-4 rounded-xl border border-gray-100 outline-none focus:border-[var(--primary)]" placeholder="Your Name" />
                                <input type="tel" className="w-full p-4 rounded-xl border border-gray-100 outline-none focus:border-[var(--primary)]" placeholder="Quantity (kg or boxes)" />
                                <Button variant="outline" className="w-full py-4 flex items-center justify-center gap-2 group">
                                    Send Bulk Inquiry <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </form>
                        </GlassCard>

                        <GlassCard className="p-10 border-white bg-white/60 flex flex-col items-center text-center">
                            <div className="p-4 rounded-full bg-[var(--primary)] text-white mb-6">
                                <Gift size={32} />
                            </div>
                            <h3 className="text-2xl font-bold font-amiri mb-4">Premium Gift Boxes</h3>
                            <p className="text-gray-600 text-sm mb-8">
                                Custom-packaged gift sets for Hajj, Umrah, or special occasions. We can curate a selection of premium dates and accessories.
                            </p>
                            <form className="w-full space-y-4 text-left">
                                <input type="text" className="w-full p-4 rounded-xl border border-gray-100 outline-none focus:border-[var(--primary)]" placeholder="Recipient Details" />
                                <select className="w-full p-4 rounded-xl border border-gray-100 outline-none focus:border-[var(--primary)] appearance-none">
                                    <option>Standard Gift Box</option>
                                    <option>Luxury Wooden Chest</option>
                                    <option>Custom Ramadan Pack</option>
                                </select>
                                <Button variant="outline" className="w-full py-4 flex items-center justify-center gap-2 group">
                                    Send Gift Inquiry <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </form>
                        </GlassCard>

                    </div>
                </div>
            </section>
        </>
    );
}
