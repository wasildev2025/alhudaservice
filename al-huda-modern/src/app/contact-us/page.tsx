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
                        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                            <GlassCard className="p-10 text-center border border-white/20 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_40px_80px_-20px_rgba(212,175,55,0.15)] bg-white/40 backdrop-blur-md h-full transition-all duration-300">
                                <div className="p-4 rounded-full bg-primary/10 text-primary mb-6 mx-auto w-fit">
                                    <MessageSquare size={32} />
                                </div>
                                <h3 className="text-xl font-bold font-amiri mb-2 text-secondary">WhatsApp</h3>
                                <p className="text-gray-500 text-sm mb-6">Fastest for quick inquiries and booking confirmations.</p>
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                    <Button variant="primary" className="w-full">Chat Now</Button>
                                </a>
                            </GlassCard>
                        </motion.div>

                        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                            <GlassCard className="p-10 text-center border border-white/20 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_40px_80px_-20px_rgba(212,175,55,0.15)] bg-white/40 backdrop-blur-md h-full transition-all duration-300">
                                <div className="p-4 rounded-full bg-primary/10 text-primary mb-6 mx-auto w-fit">
                                    <Phone size={32} />
                                </div>
                                <h3 className="text-xl font-bold font-amiri mb-2 text-secondary">Phone</h3>
                                <p className="text-gray-500 text-sm mb-6">Call us directly for urgent travel and transport needs.</p>
                                <a href="tel:+966500000000">
                                    <Button variant="outline" className="w-full">+966 50 000 0000</Button>
                                </a>
                            </GlassCard>
                        </motion.div>

                        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                            <GlassCard className="p-10 text-center border border-white/20 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_40px_80px_-20px_rgba(212,175,55,0.15)] bg-white/40 backdrop-blur-md h-full transition-all duration-300">
                                <div className="p-4 rounded-full bg-primary/10 text-primary mb-6 mx-auto w-fit">
                                    <Mail size={32} />
                                </div>
                                <h3 className="text-xl font-bold font-amiri mb-2 text-secondary">Email</h3>
                                <p className="text-gray-500 text-sm mb-6">For formal inquiries, feedback, and documentation.</p>
                                <a href="mailto:info@alhudaservices.com">
                                    <Button variant="outline" className="w-full">info@alhudaservices.com</Button>
                                </a>
                            </GlassCard>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 pointer-events-none" />
                            <GlassCard className="p-10 border border-white/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] bg-white/40 backdrop-blur-2xl relative z-10 transition-all duration-500">
                                <h2 className="text-3xl font-bold font-amiri mb-8 text-primary">Send Us a Message</h2>
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2 relative group/input">
                                            <label className="text-xs font-bold uppercase tracking-widest text-secondary/70 ml-1 transition-colors group-focus-within/input:text-primary">Full Name</label>
                                            <input type="text" className="w-full p-4 rounded-2xl border-2 border-white/50 bg-white/50 transition-all duration-300 focus:bg-white focus:border-primary focus:shadow-[0_0_0_4px_rgba(212,175,55,0.1)] outline-none backdrop-blur-sm" placeholder="Full Name" />
                                        </div>
                                        <div className="flex flex-col gap-2 relative group/input">
                                            <label className="text-xs font-bold uppercase tracking-widest text-secondary/70 ml-1 transition-colors group-focus-within/input:text-primary">Email Address</label>
                                            <input type="email" className="w-full p-4 rounded-2xl border-2 border-white/50 bg-white/50 transition-all duration-300 focus:bg-white focus:border-primary focus:shadow-[0_0_0_4px_rgba(212,175,55,0.1)] outline-none backdrop-blur-sm" placeholder="Email Address" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 relative group/input">
                                        <label className="text-xs font-bold uppercase tracking-widest text-secondary/70 ml-1 transition-colors group-focus-within/input:text-primary">Subject</label>
                                        <input type="text" className="w-full p-4 rounded-2xl border-2 border-white/50 bg-white/50 transition-all duration-300 focus:bg-white focus:border-primary focus:shadow-[0_0_0_4px_rgba(212,175,55,0.1)] outline-none backdrop-blur-sm" placeholder="Subject" />
                                    </div>
                                    <div className="flex flex-col gap-2 relative group/input">
                                        <label className="text-xs font-bold uppercase tracking-widest text-secondary/70 ml-1 transition-colors group-focus-within/input:text-primary">Message</label>
                                        <textarea rows={6} className="w-full p-4 rounded-2xl border-2 border-white/50 bg-white/50 transition-all duration-300 focus:bg-white focus:border-primary focus:shadow-[0_0_0_4px_rgba(212,175,55,0.1)] outline-none backdrop-blur-sm resize-none" placeholder="How can we help you?"></textarea>
                                    </div>
                                    <Button variant="primary" className="w-full py-5 text-sm uppercase tracking-widest font-bold shadow-[0_10px_20px_-10px_rgba(212,175,55,0.5)] hover:shadow-[0_15px_30px_-10px_rgba(212,175,55,0.6)] hover:-translate-y-1 transition-all duration-300 rounded-2xl flex items-center justify-center gap-3">
                                        <Send size={20} /> Send Message
                                    </Button>
                                </form>
                            </GlassCard>
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
