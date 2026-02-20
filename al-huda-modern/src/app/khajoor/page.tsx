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
                                <GlassCard className="p-0 overflow-hidden flex flex-col h-full border border-white/20 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_40px_80px_-20px_rgba(212,175,55,0.15)] group transition-all duration-500 hover:-translate-y-2">
                                    <div className="h-72 relative overflow-hidden">
                                        <motion.div
                                            className="w-full h-full bg-cover bg-center"
                                            style={{ backgroundImage: `url(${date.img})` }}
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.8 }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                                        {date.popular && (
                                            <div className="absolute top-4 left-4 bg-primary text-secondary-foreground text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-tighter shadow-lg flex items-center gap-1">
                                                ★ Most Popular
                                            </div>
                                        )}
                                        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-primary font-bold px-4 py-2 rounded-xl shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                            {date.price}
                                        </div>
                                    </div>
                                    <div className="p-8 flex flex-col flex-1 bg-white/40 backdrop-blur-md relative z-10">
                                        <h3 className="text-2xl font-bold font-amiri mb-2 text-secondary">{date.name}</h3>
                                        <p className="text-gray-500 text-sm mb-8 leading-relaxed flex-1">
                                            {date.desc}
                                        </p>
                                        <Button variant="primary" className="w-full mt-auto">
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
            <section className="py-24 bg-secondary relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542661957-d24b453eb553?auto=format&fit=crop&q=80')] bg-cover bg-fixed opacity-5" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                            <GlassCard className="p-10 border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col items-center text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] hover:bg-white/10 transition-colors duration-500 rounded-3xl h-full">
                                <div className="p-5 rounded-3xl bg-primary/20 text-primary mb-8 shadow-inner border border-primary/20">
                                    <Package size={36} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-3xl font-bold font-amiri mb-4 text-white">Bulk & Wholesale Inquiries</h3>
                                <p className="text-white/60 text-sm mb-10 leading-relaxed max-w-md mx-auto">
                                    Planning for an event, distribution, or resale? We provide special wholesale rates for bulk orders delivered across Saudi Arabia.
                                </p>
                                <form className="w-full space-y-6 text-left mt-auto">
                                    <div className="relative group/input">
                                        <input type="text" className="w-full p-4 rounded-2xl border-2 border-white/10 bg-black/20 text-white transition-all duration-300 focus:bg-black/40 focus:border-primary outline-none backdrop-blur-sm" placeholder="Your Name" />
                                    </div>
                                    <div className="relative group/input">
                                        <input type="tel" className="w-full p-4 rounded-2xl border-2 border-white/10 bg-black/20 text-white transition-all duration-300 focus:bg-black/40 focus:border-primary outline-none backdrop-blur-sm" placeholder="Quantity (kg or boxes)" />
                                    </div>
                                    <Button variant="primary" className="w-full py-5 text-sm uppercase tracking-widest rounded-2xl mt-8">
                                        Send Bulk Inquiry <ArrowRight size={18} />
                                    </Button>
                                </form>
                            </GlassCard>
                        </motion.div>

                        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                            <GlassCard className="p-10 border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col items-center text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] hover:bg-white/10 transition-colors duration-500 rounded-3xl h-full">
                                <div className="p-5 rounded-3xl bg-primary/20 text-primary mb-8 shadow-inner border border-primary/20">
                                    <Gift size={36} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-3xl font-bold font-amiri mb-4 text-white">Premium Gift Boxes</h3>
                                <p className="text-white/60 text-sm mb-10 leading-relaxed max-w-md mx-auto">
                                    Custom-packaged gift sets for Hajj, Umrah, or special occasions. We can curate a selection of premium dates and accessories.
                                </p>
                                <form className="w-full space-y-6 text-left mt-auto">
                                    <div className="relative group/input">
                                        <input type="text" className="w-full p-4 rounded-2xl border-2 border-white/10 bg-black/20 text-white transition-all duration-300 focus:bg-black/40 focus:border-primary outline-none backdrop-blur-sm" placeholder="Recipient Details" />
                                    </div>
                                    <div className="relative group/input">
                                        <select className="w-full p-4 rounded-2xl border-2 border-white/10 bg-black/20 text-white/70 transition-all duration-300 focus:bg-black/40 focus:border-primary outline-none backdrop-blur-sm appearance-none">
                                            <option>Standard Gift Box</option>
                                            <option>Luxury Wooden Chest</option>
                                            <option>Custom Ramadan Pack</option>
                                        </select>
                                    </div>
                                    <Button variant="outline" className="w-full py-5 text-sm uppercase tracking-widest !text-white !border-white/30 hover:!bg-white/10 rounded-2xl mt-8">
                                        Send Gift Inquiry <ArrowRight size={18} />
                                    </Button>
                                </form>
                            </GlassCard>
                        </motion.div>

                    </div>
                </div>
            </section>
        </>
    );
}
