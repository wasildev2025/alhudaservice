"use client";

import { useState, useEffect } from "react";
import PageBanner from "@/components/ui/PageBanner";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { ShoppingCart, Gift, Package, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface KhajoorProduct {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string | null;
    popular: boolean;
    isActive: boolean;
}

export default function KhajoorPage() {
    const [products, setProducts] = useState<KhajoorProduct[]>([]);
    const [loaded, setLoaded] = useState(false);

    // Inquiry forms
    const [bulkForm, setBulkForm] = useState({ fullName: "", mobile: "", requiredType: "", quantity: "", deliveryCity: "" });
    const [giftForm, setGiftForm] = useState({ fullName: "", mobile: "", requiredType: "", quantity: "1", deliveryCity: "" });
    const [bulkSubmitting, setBulkSubmitting] = useState(false);
    const [giftSubmitting, setGiftSubmitting] = useState(false);
    const [bulkSuccess, setBulkSuccess] = useState(false);
    const [giftSuccess, setGiftSuccess] = useState(false);
    const [bulkError, setBulkError] = useState("");
    const [giftError, setGiftError] = useState("");

    useEffect(() => {
        fetch("/api/khajoor")
            .then((r) => r.json())
            .then((data) => {
                if (data.success) {
                    const active = data.data.filter((p: KhajoorProduct) => p.isActive);
                    setProducts(active);
                    // Set default type for forms
                    if (active.length > 0) {
                        setBulkForm((f) => ({ ...f, requiredType: active[0].name }));
                        setGiftForm((f) => ({ ...f, requiredType: active[0].name }));
                    }
                }
            })
            .catch(console.error)
            .finally(() => setLoaded(true));
    }, []);

    const submitInquiry = async (
        form: typeof bulkForm,
        setSubmitting: (v: boolean) => void,
        setSuccess: (v: boolean) => void,
        setError: (v: string) => void,
        resetForm: () => void
    ) => {
        setSubmitting(true);
        setError("");
        setSuccess(false);
        try {
            const res = await fetch("/api/bookings/khajoor", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (data.success) {
                setSuccess(true);
                resetForm();
            } else {
                setError(data.message || "Something went wrong.");
            }
        } catch {
            setError("Network error. Please try again.");
        }
        setSubmitting(false);
    };

    const defaultImg = "/images/dates/ajwa.png";

    return (
        <>
            <PageBanner
                title="Premium Madinah Dates"
                subtitle="Experience the sweetness of the blessed city with our hand-picked Khajoor collection."
            />

            {/* Products */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold font-amiri mb-4">Our Finest Selection</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Sourced directly from the lush palm groves of Madinah al-Munawwarah.</p>
                    </div>

                    {!loaded ? (
                        <div className="text-center py-12">
                            <div className="inline-block w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                        </div>
                    ) : products.length === 0 ? (
                        <p className="text-center text-gray-500 py-12">Products coming soon. Check back later!</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {products.map((date, index) => (
                                <motion.div
                                    key={date.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <GlassCard className="p-0 overflow-hidden flex flex-col h-full border border-white/20 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_40px_80px_-20px_rgba(212,175,55,0.15)] group transition-all duration-500 hover:-translate-y-2">
                                        <div className="h-72 relative overflow-hidden">
                                            <motion.div className="relative w-full h-full" whileHover={{ scale: 1.1 }} transition={{ duration: 0.8 }}>
                                                <Image
                                                    src={date.image || defaultImg}
                                                    alt={date.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, 33vw"
                                                />
                                            </motion.div>
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
                                            <p className="text-gray-500 text-sm mb-8 leading-relaxed flex-1">{date.description}</p>
                                            <a href="https://salla.sa" target="_blank" rel="noopener noreferrer">
                                                <Button variant="primary" className="w-full">
                                                    <ShoppingCart size={18} /> Buy on Salla Store
                                                </Button>
                                            </a>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Bulk & Gifts */}
            <section className="py-24 bg-secondary relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/dates/ajwa.png')] bg-cover bg-fixed opacity-5" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* Bulk */}
                        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                            <GlassCard className="p-10 border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col items-center text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] hover:bg-white/10 transition-colors duration-500 rounded-3xl h-full">
                                <div className="p-5 rounded-3xl bg-primary/20 text-primary mb-8 shadow-inner border border-primary/20">
                                    <Package size={36} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-3xl font-bold font-amiri mb-4 text-white">Bulk & Wholesale Inquiries</h3>
                                <p className="text-white/60 text-sm mb-6 leading-relaxed max-w-md mx-auto">Planning for an event, distribution, or resale? We provide special wholesale rates.</p>

                                {bulkSuccess && <div className="w-full mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-xl text-green-300 text-sm">✅ Inquiry sent!</div>}
                                {bulkError && <div className="w-full mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm">❌ {bulkError}</div>}

                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    submitInquiry(bulkForm, setBulkSubmitting, setBulkSuccess, setBulkError, () =>
                                        setBulkForm({ fullName: "", mobile: "", requiredType: products[0]?.name || "", quantity: "", deliveryCity: "" })
                                    );
                                }} className="w-full space-y-6 text-left mt-auto">
                                    <input type="text" required value={bulkForm.fullName} onChange={(e) => setBulkForm({ ...bulkForm, fullName: e.target.value })} className="w-full p-4 rounded-2xl border-2 border-white/10 bg-black/20 text-white transition-all duration-300 focus:bg-black/40 focus:border-primary outline-none backdrop-blur-sm" placeholder="Your Name" />
                                    <input type="tel" required value={bulkForm.mobile} onChange={(e) => setBulkForm({ ...bulkForm, mobile: e.target.value })} className="w-full p-4 rounded-2xl border-2 border-white/10 bg-black/20 text-white transition-all duration-300 focus:bg-black/40 focus:border-primary outline-none backdrop-blur-sm" placeholder="Mobile / WhatsApp" />
                                    <div>
                                        <label className="block text-white/50 text-xs uppercase tracking-wider mb-2 ml-1">Khajoor Type</label>
                                        <select value={bulkForm.requiredType} onChange={(e) => setBulkForm({ ...bulkForm, requiredType: e.target.value })} className="w-full p-4 rounded-2xl border-2 border-white/10 bg-black/20 text-white/80 transition-all duration-300 focus:bg-black/40 focus:border-primary outline-none backdrop-blur-sm appearance-none">
                                            {products.map((p) => <option key={p.id} value={p.name} className="bg-[#0a1a0f]">{p.name}</option>)}
                                            <option value="Mixed Variety" className="bg-[#0a1a0f]">Mixed Variety</option>
                                        </select>
                                    </div>
                                    <input type="text" required value={bulkForm.quantity} onChange={(e) => setBulkForm({ ...bulkForm, quantity: e.target.value })} className="w-full p-4 rounded-2xl border-2 border-white/10 bg-black/20 text-white transition-all duration-300 focus:bg-black/40 focus:border-primary outline-none backdrop-blur-sm" placeholder="Quantity (kg or boxes)" />
                                    <input type="text" required value={bulkForm.deliveryCity} onChange={(e) => setBulkForm({ ...bulkForm, deliveryCity: e.target.value })} className="w-full p-4 rounded-2xl border-2 border-white/10 bg-black/20 text-white transition-all duration-300 focus:bg-black/40 focus:border-primary outline-none backdrop-blur-sm" placeholder="Delivery City" />
                                    <Button type="submit" variant="primary" className="w-full py-5 text-sm uppercase tracking-widest rounded-2xl mt-8 disabled:opacity-50" disabled={bulkSubmitting}>
                                        {bulkSubmitting ? "Sending..." : "Send Bulk Inquiry"} <ArrowRight size={18} />
                                    </Button>
                                </form>
                            </GlassCard>
                        </motion.div>

                        {/* Gift */}
                        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                            <GlassCard className="p-10 border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col items-center text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] hover:bg-white/10 transition-colors duration-500 rounded-3xl h-full">
                                <div className="p-5 rounded-3xl bg-primary/20 text-primary mb-8 shadow-inner border border-primary/20">
                                    <Gift size={36} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-3xl font-bold font-amiri mb-4 text-white">Premium Gift Boxes</h3>
                                <p className="text-white/60 text-sm mb-6 leading-relaxed max-w-md mx-auto">Custom-packaged gift sets for Hajj, Umrah, or special occasions.</p>

                                {giftSuccess && <div className="w-full mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-xl text-green-300 text-sm">✅ Gift inquiry sent!</div>}
                                {giftError && <div className="w-full mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm">❌ {giftError}</div>}

                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    submitInquiry(giftForm, setGiftSubmitting, setGiftSuccess, setGiftError, () =>
                                        setGiftForm({ fullName: "", mobile: "", requiredType: products[0]?.name || "", quantity: "1", deliveryCity: "" })
                                    );
                                }} className="w-full space-y-6 text-left mt-auto">
                                    <input type="text" required value={giftForm.fullName} onChange={(e) => setGiftForm({ ...giftForm, fullName: e.target.value })} className="w-full p-4 rounded-2xl border-2 border-white/10 bg-black/20 text-white transition-all duration-300 focus:bg-black/40 focus:border-primary outline-none backdrop-blur-sm" placeholder="Recipient / Your Name" />
                                    <input type="tel" required value={giftForm.mobile} onChange={(e) => setGiftForm({ ...giftForm, mobile: e.target.value })} className="w-full p-4 rounded-2xl border-2 border-white/10 bg-black/20 text-white transition-all duration-300 focus:bg-black/40 focus:border-primary outline-none backdrop-blur-sm" placeholder="Mobile / WhatsApp" />
                                    <div>
                                        <label className="block text-white/50 text-xs uppercase tracking-wider mb-2 ml-1">Khajoor Type</label>
                                        <select value={giftForm.requiredType} onChange={(e) => setGiftForm({ ...giftForm, requiredType: e.target.value })} className="w-full p-4 rounded-2xl border-2 border-white/10 bg-black/20 text-white/80 transition-all duration-300 focus:bg-black/40 focus:border-primary outline-none backdrop-blur-sm appearance-none">
                                            {products.map((p) => <option key={p.id} value={p.name} className="bg-[#0a1a0f]">{p.name}</option>)}
                                            <option value="Mixed Gift Box" className="bg-[#0a1a0f]">Mixed Gift Box</option>
                                        </select>
                                    </div>
                                    <input type="text" required value={giftForm.deliveryCity} onChange={(e) => setGiftForm({ ...giftForm, deliveryCity: e.target.value })} className="w-full p-4 rounded-2xl border-2 border-white/10 bg-black/20 text-white transition-all duration-300 focus:bg-black/40 focus:border-primary outline-none backdrop-blur-sm" placeholder="Delivery City" />
                                    <Button type="submit" variant="outline" className="w-full py-5 text-sm uppercase tracking-widest !text-white !border-white/30 hover:!bg-white/10 rounded-2xl mt-8 disabled:opacity-50" disabled={giftSubmitting}>
                                        {giftSubmitting ? "Sending..." : "Send Gift Inquiry"} <ArrowRight size={18} />
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
