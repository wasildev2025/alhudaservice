"use client";

import PageBanner from "@/components/ui/PageBanner";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { MessageSquare, Phone, Mail, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactUsPage() {
    const whatsappLink = "https://wa.me/966500000000";

    return (
        <>
            <PageBanner
                title="Contact Us"
                subtitle="We'd love to hear from you. Reach out for bookings, inquiries, or support."
            />

            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                        <GlassCard className="p-10 text-center border-[var(--border)] hover:bg-[var(--cream)]/30">
                            <div className="p-4 rounded-full bg-[var(--cream)] text-[var(--primary)] mb-6 mx-auto w-fit">
                                <MessageSquare size={32} />
                            </div>
                            <h3 className="text-xl font-bold font-amiri mb-2">WhatsApp</h3>
                            <p className="text-gray-500 text-sm mb-6">Fastest for quick inquiries and booking confirmations.</p>
                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                <Button variant="primary" className="w-full">Chat Now</Button>
                            </a>
                        </GlassCard>

                        <GlassCard className="p-10 text-center border-[var(--border)] hover:bg-[var(--cream)]/30">
                            <div className="p-4 rounded-full bg-[var(--cream)] text-[var(--primary)] mb-6 mx-auto w-fit">
                                <Phone size={32} />
                            </div>
                            <h3 className="text-xl font-bold font-amiri mb-2">Phone</h3>
                            <p className="text-gray-500 text-sm mb-6">Call us directly for urgent travel and transport needs.</p>
                            <a href="tel:+966500000000">
                                <Button variant="outline" className="w-full">+966 50 000 0000</Button>
                            </a>
                        </GlassCard>

                        <GlassCard className="p-10 text-center border-[var(--border)] hover:bg-[var(--cream)]/30">
                            <div className="p-4 rounded-full bg-[var(--cream)] text-[var(--primary)] mb-6 mx-auto w-fit">
                                <Mail size={32} />
                            </div>
                            <h3 className="text-xl font-bold font-amiri mb-2">Email</h3>
                            <p className="text-gray-500 text-sm mb-6">For formal inquiries, feedback, and documentation.</p>
                            <a href="mailto:info@alhudaservices.com">
                                <Button variant="outline" className="w-full">info@alhudaservices.com</Button>
                            </a>
                        </GlassCard>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold font-amiri mb-8">Send Us a Message</h2>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input type="text" className="p-4 rounded-xl border border-gray-100 outline-none focus:border-[var(--primary)] bg-[var(--cream)]/30" placeholder="Full Name" />
                                    <input type="email" className="p-4 rounded-xl border border-gray-100 outline-none focus:border-[var(--primary)] bg-[var(--cream)]/30" placeholder="Email Address" />
                                </div>
                                <input type="text" className="p-4 rounded-xl border border-gray-100 outline-none focus:border-[var(--primary)] bg-[var(--cream)]/30 w-full" placeholder="Subject" />
                                <textarea rows={6} className="p-4 rounded-xl border border-gray-100 outline-none focus:border-[var(--primary)] bg-[var(--cream)]/30 w-full" placeholder="How can we help you?"></textarea>
                                <Button variant="primary" className="w-full py-5 text-lg gap-3">
                                    <Send size={20} /> Send Message
                                </Button>
                            </form>
                        </motion.div>

                        <div className="space-y-12">
                            <div>
                                <h3 className="text-2xl font-bold font-amiri mb-6">Our Location</h3>
                                <div className="flex gap-4">
                                    <div className="p-3 rounded-xl bg-[var(--cream)] text-[var(--primary)] h-fit">
                                        <MapPin size={24} />
                                    </div>
                                    <p className="text-gray-600 leading-relaxed">
                                        Based in Saudi Arabia, serving Makkah, Madinah, Jeddah, Taif, and all surrounding areas. We operate across the Kingdom with professional hubs in the Holy Cities.
                                    </p>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold font-amiri mb-6">Working Hours</h3>
                                <div className="bg-[var(--secondary)] text-white p-8 rounded-3xl">
                                    <p className="text-orange-400 font-bold mb-2 uppercase tracking-widest text-xs">Always Available</p>
                                    <p className="text-xl mb-4 font-amiri italic">&quot;We are here to serve you when you need us most.&quot;</p>
                                    <div className="flex justify-between text-sm opacity-70">
                                        <span>WhatsApp & Phone</span>
                                        <span>24 Hours / 7 Days</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
