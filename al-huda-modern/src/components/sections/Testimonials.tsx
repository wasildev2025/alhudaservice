"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, Plus, X, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import SectionHeader from "../ui/SectionHeader";
import Button from "../ui/Button";

interface Testimonial {
    id: string;
    name: string;
    location: string;
    review: string;
    stars: number;
}

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form state
    const [form, setForm] = useState({ name: "", location: "", review: "", stars: 5 });
    const [submitting, setSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetch("/api/testimonials")
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setTestimonials(data.data);
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const maxIndex = Math.max(0, testimonials.length - 3);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setFormStatus(null);
        try {
            const res = await fetch("/api/testimonials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (data.success) {
                setFormStatus({ type: "success", msg: "Review submitted successfully! It will appear once approved." });
                setForm({ name: "", location: "", review: "", stars: 5 });
                setTimeout(() => {
                    setIsModalOpen(false);
                    setFormStatus(null);
                }, 3000);
            } else {
                setFormStatus({ type: "error", msg: data.message || "Failed to submit review." });
            }
        } catch {
            setFormStatus({ type: "error", msg: "Network error." });
        }
        setSubmitting(false);
    };

    if (loading && testimonials.length === 0) return null;
    if (!loading && testimonials.length === 0) return null; // hide section if no approved testimonials

    const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3);

    return (
        <section className="py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center text-center mb-16 gap-6 relative">
                    <SectionHeader
                        center={true}
                        title="Voices of Gratitude"
                        subtitle="Hear from the brothers and sisters who have experienced the Al-Huda difference."
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                    >
                        <Button
                            variant="primary"
                            className="px-8 py-4 rounded-full text-xs uppercase tracking-widest font-bold flex items-center gap-2"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Plus size={16} /> Submit Your Experience
                        </Button>
                    </motion.div>
                </div>

                {testimonials.length > 3 && (
                    <div className="flex justify-center md:justify-end gap-4 mb-8">
                        <button onClick={handlePrev} className="p-3 rounded-full border border-primary/20 hover:bg-primary/10 transition-colors text-primary glass-premium hover:scale-105 active:scale-95">
                            <ChevronLeft size={20} />
                        </button>
                        <button onClick={handleNext} className="p-3 rounded-full border border-primary/20 hover:bg-primary/10 transition-colors text-primary glass-premium hover:scale-105 active:scale-95">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 min-h-[400px]">
                    <AnimatePresence mode="popLayout">
                        {visibleTestimonials.map((t, index) => (
                            <motion.div
                                key={`${t.id}-${currentIndex}`} // force re-animation when index changes
                                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95, x: -20 }}
                                transition={{ duration: 0.4 }}
                                className="h-full"
                            >
                                <GlassCard className="h-full p-12 flex flex-col items-center text-center relative pt-20 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(212,175,55,0.15)] group">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border-8 border-background overflow-hidden shadow-premium-lg transition-transform duration-500 group-hover:scale-110">
                                        <div className="w-full h-full bg-secondary text-primary flex items-center justify-center text-4xl font-bold font-amiri uppercase">
                                            {t.name[0]}
                                        </div>
                                    </div>
                                    <div className="mb-8 flex gap-1">
                                        {[...Array(t.stars)].map((_, i) => (
                                            <Star key={i} size={16} className="fill-primary text-primary" />
                                        ))}
                                    </div>
                                    <Quote className="text-primary/10 absolute top-20 left-10 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110" size={60} />
                                    <p className="text-gray-500 italic mb-10 leading-loose font-light relative z-10">
                                        "{t.review}"
                                    </p>
                                    <div className="mt-auto relative z-10">
                                        <h4 className="font-bold text-secondary text-xl">{t.name}</h4>
                                        <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mt-2">{t.location}</p>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Submission Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-secondary/80 backdrop-blur-sm"
                            onClick={() => setIsModalOpen(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white rounded-3xl p-8 max-w-md w-full relative z-10 shadow-add"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <X size={24} />
                            </button>
                            <h3 className="text-2xl font-bold font-amiri text-secondary mb-2">Share Your Experience</h3>
                            <p className="text-gray-500 text-sm mb-6">Your feedback helps us improve and guides other pilgrims.</p>

                            {formStatus?.type === "success" ? (
                                <div className="py-10 text-center flex flex-col items-center gap-4 text-green-600">
                                    <CheckCircle size={48} />
                                    <p className="font-semibold">{formStatus.msg}</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {formStatus?.type === "error" && (
                                        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
                                            {formStatus.msg}
                                        </div>
                                    )}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-widest text-secondary/70 mb-2">Name</label>
                                            <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full p-3 rounded-xl border-2 border-gray-100 focus:border-primary outline-none text-sm transition-colors" placeholder="John Doe" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-widest text-secondary/70 mb-2">Location</label>
                                            <input type="text" required value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="w-full p-3 rounded-xl border-2 border-gray-100 focus:border-primary outline-none text-sm transition-colors" placeholder="e.g. London, UK" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-secondary/70 mb-2">Rating</label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setForm({ ...form, stars: star })}
                                                    className={`transition-colors ${form.stars >= star ? 'text-primary' : 'text-gray-300'}`}
                                                >
                                                    <Star size={24} className={form.stars >= star ? 'fill-primary' : ''} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-secondary/70 mb-2">Your Review</label>
                                        <textarea required value={form.review} onChange={e => setForm({ ...form, review: e.target.value })} rows={4} className="w-full p-3 rounded-xl border-2 border-gray-100 focus:border-primary outline-none text-sm transition-colors resize-none" placeholder="Tell us about your experience..." />
                                    </div>
                                    <Button type="submit" variant="primary" className="w-full py-4 text-sm uppercase tracking-widest rounded-xl" disabled={submitting}>
                                        {submitting ? "Submitting..." : "Submit Review"}
                                    </Button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
