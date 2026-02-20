"use client";

import PageBanner from "@/components/ui/PageBanner";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageSquare } from "lucide-react";
import { useState } from "react";

const faqs = [
    {
        q: "How do I book a Pick & Drop service?",
        a: "Simple! Fill out the form on our Pick & Drop page with your travel details. Our team will review your request and contact you via WhatsApp within minutes to confirm the booking and assign a driver.",
    },
    {
        q: "What types of vehicles are available?",
        a: "We provide a range of modern, air-conditioned vehicles including Sedans for individual travelers (up to 4 passengers), SUVs for families, Vans for medium groups (7-9 passengers), and Hiace for larger groups (up to 14 passengers).",
    },
    {
        q: "Can I customize a Ziyarat package?",
        a: "Absolutely. While we offer featured packages for Makkah, Madinah, and Taif, we can create a fully custom itinerary based on the historical sites you wish to visit and your preferred schedule.",
    },
    {
        q: "How long does it take for Khajoor delivery?",
        a: "Domestic orders within Saudi Arabia typically arrive within 2-3 business days. For international wholesale orders, please contact us for a customized shipping timeline and quote.",
    },
    {
        q: "What are your payment methods?",
        a: "We currently accept bank transfers and cash. Our Salla store also supports Mada, Visa, and Apple Pay for product purchases. We will soon be integrating an online payment gateway for transport bookings.",
    },
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <>
            <PageBanner
                title="Frequently Asked Questions"
                subtitle="Finding answers shouldn't be difficult. Here are some of the most common questions our customers ask."
            />

            <section className="py-24 bg-cream relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&q=80')] bg-cover bg-fixed opacity-[0.03] pointer-events-none" />
                <div className="container mx-auto px-6 max-w-4xl relative z-10">
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div
                                    className={`rounded-2xl border transition-all duration-300 overflow-hidden backdrop-blur-md ${openIndex === index ? "border-primary/50 bg-white/60 shadow-[0_15px_30px_-10px_rgba(212,175,55,0.1)]" : "border-white/50 bg-white/40 hover:bg-white/50 hover:border-primary/30"
                                        }`}
                                >
                                    <button
                                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                        className="w-full p-6 text-left flex justify-between items-center group"
                                    >
                                        <span className={`font-bold font-amiri text-lg transition-colors duration-300 ${openIndex === index ? "text-primary" : "text-secondary group-hover:text-primary"}`}>
                                            {faq.q}
                                        </span>
                                        <motion.div
                                            animate={{ rotate: openIndex === index ? 180 : 0 }}
                                            className={`p-2 rounded-full transition-colors duration-300 ${openIndex === index ? "bg-primary text-white" : "bg-white/50 text-secondary group-hover:bg-primary/10 group-hover:text-primary"}`}
                                        >
                                            <ChevronDown size={20} />
                                        </motion.div>
                                    </button>
                                    <AnimatePresence>
                                        {openIndex === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                <div className="p-6 pt-0 text-gray-600 text-sm leading-relaxed border-t border-primary/10 font-light bg-white/30">
                                                    {faq.a}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="mt-20 text-center"
                    >
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 pointer-events-none" />
                            <GlassCard className="p-12 border border-white/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] bg-white/50 backdrop-blur-2xl relative z-10 transition-all duration-500 hover:bg-white/60">
                                <h3 className="text-3xl font-bold font-amiri mb-4 text-secondary">Still Have Questions?</h3>
                                <p className="text-gray-500 mb-8 max-w-lg mx-auto font-light">Our support team is ready to help you with any specific inquiries or custom requests.</p>
                                <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer">
                                    <Button variant="primary" className="py-5 px-10 gap-3 shadow-[0_10px_20px_-10px_rgba(212,175,55,0.5)] hover:shadow-[0_15px_30px_-10px_rgba(212,175,55,0.6)] hover:-translate-y-1 transition-all duration-300 rounded-2xl flex items-center justify-center mx-auto text-sm uppercase tracking-widest font-bold">
                                        <MessageSquare size={18} /> Chat with us on WhatsApp
                                    </Button>
                                </a>
                            </GlassCard>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
