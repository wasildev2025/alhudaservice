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

            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-4xl">
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
                                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${openIndex === index ? "border-[var(--primary)] bg-[var(--cream)]/30 shadow-md" : "border-gray-100 bg-white"
                                        }`}
                                >
                                    <button
                                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                        className="w-full p-6 text-left flex justify-between items-center group"
                                    >
                                        <span className={`font-bold transition-colors ${openIndex === index ? "text-[var(--primary)]" : "text-gray-800"}`}>
                                            {faq.q}
                                        </span>
                                        <motion.div
                                            animate={{ rotate: openIndex === index ? 180 : 0 }}
                                            className={`${openIndex === index ? "text-[var(--primary)]" : "text-gray-400"}`}
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
                                            >
                                                <div className="p-6 pt-0 text-gray-600 text-sm leading-relaxed border-t border-white/50">
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
                        <GlassCard className="p-12 border-[var(--border)] bg-[var(--cream)]/30">
                            <h3 className="text-2xl font-bold font-amiri mb-4">Still Have Questions?</h3>
                            <p className="text-gray-500 mb-8 max-w-lg mx-auto">Our support team is ready to help you with any specific inquiries or custom requests.</p>
                            <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer">
                                <Button variant="primary" className="py-4 px-10 gap-2 shadow-lg">
                                    <MessageSquare size={18} /> Chat with us on WhatsApp
                                </Button>
                            </a>
                        </GlassCard>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
