"use client";

import { useState, useEffect, useRef } from "react";
import PageBanner from "@/components/ui/PageBanner";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Users, ArrowRight, X } from "lucide-react";
import Image from "next/image";

interface ZiyaratPackage {
    id: string;
    name: string;
    city: string;
    duration: string;
    price: number;
    currency: string;
    includes: string;
    itinerary: string;
    images?: string;
    isActive: boolean;
}

export default function ZiyaratPackagesPage() {
    const [packages, setPackages] = useState<ZiyaratPackage[]>([]);
    const [loading, setLoading] = useState(true);

    // Inquiry form state
    const [selectedPkg, setSelectedPkg] = useState<ZiyaratPackage | null>(null);
    const [form, setForm] = useState({ fullName: "", mobile: "", pickupLocation: "", date: "", persons: 2, notes: "" });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetch("/api/packages")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setPackages(data.data.filter((p: ZiyaratPackage) => p.isActive));
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const update = (field: string, value: string | number) => setForm((prev) => ({ ...prev, [field]: value }));

    const openInquiry = (pkg: ZiyaratPackage) => {
        setSelectedPkg(pkg);
        setSuccess(false);
        setError("");
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");
        setSuccess(false);
        try {
            // If a specific package is selected, use ziyarat API; otherwise use contact API for custom request
            const isCustom = !selectedPkg;
            const url = isCustom ? "/api/contact" : "/api/bookings/ziyarat";
            const body = isCustom
                ? {
                    name: form.fullName,
                    emailOrPhone: form.mobile,
                    message: `[Custom Ziyarat Request] Persons: ${form.persons}, Date: ${form.date}, Pickup: ${form.pickupLocation}${form.notes ? `, Notes: ${form.notes}` : ""}`,
                }
                : {
                    fullName: form.fullName,
                    mobile: form.mobile,
                    pickupLocation: form.pickupLocation,
                    date: form.date,
                    persons: form.persons,
                    notes: form.notes,
                    packageId: selectedPkg!.id,
                };

            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const data = await res.json();
            if (data.success) {
                setSuccess(true);
                setForm({ fullName: "", mobile: "", pickupLocation: "", date: "", persons: 2, notes: "" });
            } else {
                setError(data.message || "Something went wrong.");
            }
        } catch {
            setError("Network error. Please try again.");
        }
        setSubmitting(false);
    };

    const getPackageImage = (pkg: ZiyaratPackage) => {
        if (pkg.images) {
            try {
                const imgs = JSON.parse(pkg.images);
                if (Array.isArray(imgs) && imgs.length > 0) return imgs[0];
                if (typeof pkg.images === "string" && pkg.images.startsWith("http")) return pkg.images;
            } catch {
                // It might be a plain URL string
                if (pkg.images.startsWith("http") || pkg.images.startsWith("/")) return pkg.images;
            }
        }
        const cityImages: Record<string, string> = {
            Makkah: "https://images.unsplash.com/photo-1542661957-d24b453eb553?auto=format&fit=crop&q=80",
            Madinah: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80",
            Badr: "https://images.unsplash.com/photo-1582233221943-42e0591b658a?auto=format&fit=crop&q=80",
            Taif: "https://images.unsplash.com/photo-1534008757030-2679aa4352a3?auto=format&fit=crop&q=80",
        };
        return cityImages[pkg.city] || cityImages.Makkah;
    };

    return (
        <>
            <PageBanner
                title="Ziyarat Packages"
                subtitle="Curated guided tours to the sacred and historical sites of the Holy Land."
            />

            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="inline-block w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                            <p className="text-gray-500 mt-4">Loading packages...</p>
                        </div>
                    ) : packages.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">No packages available right now. Please check back soon!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {packages.map((pkg, index) => (
                                <motion.div
                                    key={pkg.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <GlassCard className="p-0 overflow-hidden flex flex-col sm:flex-row h-full border border-white/20 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.1)] group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_-20px_rgba(212,175,55,0.15)]">
                                        <div className="sm:w-2/5 h-64 sm:h-auto relative overflow-hidden">
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ duration: 0.8 }}
                                                className="relative h-full w-full"
                                            >
                                                <Image
                                                    src={getPackageImage(pkg)}
                                                    alt={pkg.name}
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
                                            <h3 className="text-2xl font-bold font-amiri mb-3">{pkg.name}</h3>
                                            <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
                                                {pkg.itinerary}
                                            </p>
                                            <div className="flex flex-wrap gap-4 mb-4 text-xs font-medium text-gray-500">
                                                <span className="flex items-center gap-1"><Clock size={14} /> {pkg.duration}</span>
                                                <span className="flex items-center gap-1"><Users size={14} /> Group</span>
                                            </div>
                                            <div className="text-lg font-bold text-primary mb-6">
                                                {pkg.price} {pkg.currency}
                                            </div>
                                            <Button
                                                variant="outline"
                                                className="w-full sm:w-fit text-sm group/btn"
                                                onClick={() => openInquiry(pkg)}
                                            >
                                                Request Package <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                            </Button>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Inquiry Form Section — works with OR without a selected package */}
            <section className="py-24 bg-[var(--cream)]" ref={formRef}>
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold font-amiri mb-6">
                        {selectedPkg ? `Inquire: ${selectedPkg.name}` : "Request a Custom Tour"}
                    </h2>
                    <p className="text-gray-600 max-w-xl mx-auto mb-10">
                        {selectedPkg
                            ? `Fill in your details to book the ${selectedPkg.name} package.`
                            : "Tell us your requirements and we will design a personalized Ziyarat itinerary for you."
                        }
                    </p>

                    <AnimatePresence>
                        {selectedPkg && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="max-w-3xl mx-auto mb-6"
                            >
                                <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-5 py-2.5 rounded-full text-sm font-semibold">
                                    <MapPin size={14} /> {selectedPkg.name} — {selectedPkg.city}
                                    <button onClick={() => setSelectedPkg(null)} className="ml-2 hover:text-red-500 transition-colors">
                                        <X size={14} />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="max-w-3xl mx-auto relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 pointer-events-none" />
                        <GlassCard className="p-10 border border-white/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] bg-white/40 backdrop-blur-2xl relative z-10 transition-all duration-500">

                            {success && (
                                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl text-green-700 text-sm text-left">
                                    ✅ <strong>Inquiry sent!</strong> We will get back to you shortly.
                                </div>
                            )}
                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm text-left">
                                    ❌ {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-6 text-left">
                                <div className="flex flex-col gap-2 relative group/input">
                                    <label className="text-xs font-bold uppercase tracking-widest text-secondary/70 ml-1">Full Name</label>
                                    <input type="text" required value={form.fullName} onChange={(e) => update("fullName", e.target.value)} className="w-full p-4 rounded-2xl border-2 border-white/50 bg-white/50 transition-all duration-300 focus:bg-white focus:border-primary focus:shadow-[0_0_0_4px_rgba(212,175,55,0.1)] outline-none backdrop-blur-sm" placeholder="Full Name" />
                                </div>
                                <div className="flex flex-col gap-2 relative group/input">
                                    <label className="text-xs font-bold uppercase tracking-widest text-secondary/70 ml-1">Mobile / WhatsApp</label>
                                    <input type="tel" required value={form.mobile} onChange={(e) => update("mobile", e.target.value)} className="w-full p-4 rounded-2xl border-2 border-white/50 bg-white/50 transition-all duration-300 focus:bg-white focus:border-primary focus:shadow-[0_0_0_4px_rgba(212,175,55,0.1)] outline-none backdrop-blur-sm" placeholder="+966 50 000 0000" />
                                </div>
                                <div className="flex flex-col gap-2 relative group/input">
                                    <label className="text-xs font-bold uppercase tracking-widest text-secondary/70 ml-1">Pickup Location</label>
                                    <input type="text" required value={form.pickupLocation} onChange={(e) => update("pickupLocation", e.target.value)} className="w-full p-4 rounded-2xl border-2 border-white/50 bg-white/50 transition-all duration-300 focus:bg-white focus:border-primary focus:shadow-[0_0_0_4px_rgba(212,175,55,0.1)] outline-none backdrop-blur-sm" placeholder="Hotel / Area" />
                                </div>
                                <div className="flex flex-col gap-2 relative group/input">
                                    <label className="text-xs font-bold uppercase tracking-widest text-secondary/70 ml-1">Travel Date</label>
                                    <input type="date" required value={form.date} onChange={(e) => update("date", e.target.value)} className="w-full p-4 rounded-2xl border-2 border-white/50 bg-white/50 transition-all duration-300 focus:bg-white focus:border-primary focus:shadow-[0_0_0_4px_rgba(212,175,55,0.1)] outline-none backdrop-blur-sm text-gray-600" />
                                </div>
                                <div className="flex flex-col gap-2 relative group/input">
                                    <label className="text-xs font-bold uppercase tracking-widest text-secondary/70 ml-1">Number of Persons</label>
                                    <input type="number" required value={form.persons} onChange={(e) => update("persons", parseInt(e.target.value) || 1)} className="w-full p-4 rounded-2xl border-2 border-white/50 bg-white/50 transition-all duration-300 focus:bg-white focus:border-primary focus:shadow-[0_0_0_4px_rgba(212,175,55,0.1)] outline-none backdrop-blur-sm" placeholder="2" />
                                </div>
                                <div className="flex flex-col gap-2 relative group/input">
                                    <label className="text-xs font-bold uppercase tracking-widest text-secondary/70 ml-1">Notes (Optional)</label>
                                    <input type="text" value={form.notes} onChange={(e) => update("notes", e.target.value)} className="w-full p-4 rounded-2xl border-2 border-white/50 bg-white/50 transition-all duration-300 focus:bg-white focus:border-primary focus:shadow-[0_0_0_4px_rgba(212,175,55,0.1)] outline-none backdrop-blur-sm" placeholder="Special requests..." />
                                </div>
                                <div className="md:col-span-2 mt-4">
                                    <Button type="submit" variant="primary" className="w-full py-5 text-sm uppercase tracking-widest rounded-2xl hover:-translate-y-1 disabled:opacity-50" disabled={submitting}>
                                        {submitting ? "Sending..." : selectedPkg ? `Request ${selectedPkg.name}` : "Send Custom Tour Request"}
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
