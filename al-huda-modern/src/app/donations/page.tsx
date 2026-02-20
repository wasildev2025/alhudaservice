"use client";

import PageBanner from "@/components/ui/PageBanner";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { Heart, Home, GraduationCap, Users, Gift } from "lucide-react";
import { motion } from "framer-motion";

const causes = [
    {
        title: "Masjid Support",
        icon: <Home size={32} />,
        desc: "Help maintain and improve local mosques, Quran circles, and community centers.",
    },
    {
        title: "Student Scholarships",
        icon: <GraduationCap size={32} />,
        desc: "Fund Islamic education for students of knowledge from underprivileged backgrounds.",
    },
    {
        title: "Community Aid",
        icon: <Users size={32} />,
        desc: "Provide basic food baskets, medical assistance, and emergency relief to families.",
    },
];

export default function DonationsPage() {
    return (
        <>
            <PageBanner
                title="Support Our Mission"
                subtitle="Your Sadaqah and Zakat help us serve the community and maintain the heritage of the Holy Cities."
            />

            {/* Impact Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold font-amiri mb-4">Where Your Donation Goes</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Every contribution is managed with full transparency and dedicated to the specific cause you choose.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {causes.map((cause, index) => (
                            <motion.div
                                key={cause.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <GlassCard className="p-10 h-full flex flex-col items-center text-center border border-white/20 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_40px_80px_-20px_rgba(212,175,55,0.15)] bg-white/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 group">
                                    <div className="p-5 rounded-3xl bg-primary/10 text-primary mb-6 transition-transform group-hover:scale-110 duration-500 shadow-inner border border-primary/10">
                                        {cause.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold font-amiri mb-4 text-secondary group-hover:text-primary transition-colors">{cause.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        {cause.desc}
                                    </p>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Scripture Quote */}
            <section className="py-24 bg-[var(--cream)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none select-none overflow-hidden">
                    <p className="text-[20rem] font-amiri absolute -top-20 -left-20">صدقة</p>
                </div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="font-amiri text-2xl md:text-4xl text-[var(--secondary)] mb-8 leading-relaxed italic"
                    >
                        &quot;The example of those who spend their wealth in the cause of Allah is like a seed that produces seven ears, each ear having a hundred grains.&quot;
                    </motion.p>
                    <p className="text-[var(--primary)] font-bold tracking-widest text-sm uppercase">— Surah Al-Baqarah 2:261</p>
                </div>
            </section>

            {/* Contribution Form */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 pointer-events-none" />
                        <GlassCard className="p-10 border border-white/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] bg-white/40 backdrop-blur-2xl relative z-10 transition-all duration-500">
                            <h2 className="text-3xl font-bold font-amiri mb-4 text-primary text-center">Make a Contribution</h2>
                            <p className="text-center text-gray-500 mb-10 text-sm font-light">Please select a cause and amount. We will contact you or provide a payment link to complete the donation.</p>

                            <form className="space-y-6 text-left">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-6">
                                    <div className="flex flex-col gap-2 relative group/input">
                                        <label className="text-xs font-bold uppercase tracking-widest text-secondary/70 ml-1 transition-colors group-focus-within/input:text-primary">Donation Type</label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary opacity-70"><Heart size={18} /></div>
                                            <select className="w-full p-4 pl-12 rounded-2xl border-2 border-white/50 bg-white/50 transition-all duration-300 focus:bg-white focus:border-primary focus:shadow-[0_0_0_4px_rgba(212,175,55,0.1)] outline-none backdrop-blur-sm text-gray-600 appearance-none">
                                                <option>Sadaqah (General)</option>
                                                <option>Zakat</option>
                                                <option>Iftar Sponsorship</option>
                                                <option>Quran Program</option>
                                            </select>
                                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">▼</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 relative group/input">
                                        <label className="text-xs font-bold uppercase tracking-widest text-secondary/70 ml-1 transition-colors group-focus-within/input:text-primary">Amount (SAR)</label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">﷼</div>
                                            <input type="number" className="w-full p-4 pl-10 rounded-2xl border-2 border-white/50 bg-white/50 transition-all duration-300 focus:bg-white focus:border-primary focus:shadow-[0_0_0_4px_rgba(212,175,55,0.1)] outline-none backdrop-blur-sm" placeholder="100" />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-6">
                                    <div className="flex flex-col gap-2 relative group/input">
                                        <label className="text-xs font-bold uppercase tracking-widest text-secondary/70 ml-1 transition-colors group-focus-within/input:text-primary">Your Name (Optional)</label>
                                        <input type="text" className="w-full p-4 rounded-2xl border-2 border-white/50 bg-white/50 transition-all duration-300 focus:bg-white focus:border-primary focus:shadow-[0_0_0_4px_rgba(212,175,55,0.1)] outline-none backdrop-blur-sm" placeholder="Full Name" />
                                    </div>

                                    <div className="flex flex-col gap-2 relative group/input">
                                        <label className="text-xs font-bold uppercase tracking-widest text-secondary/70 ml-1 transition-colors group-focus-within/input:text-primary">WhatsApp Number</label>
                                        <input type="tel" className="w-full p-4 rounded-2xl border-2 border-white/50 bg-white/50 transition-all duration-300 focus:bg-white focus:border-primary focus:shadow-[0_0_0_4px_rgba(212,175,55,0.1)] outline-none backdrop-blur-sm" placeholder="+966 50 000 0000" />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 relative group/input">
                                    <label className="text-xs font-bold uppercase tracking-widest text-secondary/70 ml-1 transition-colors group-focus-within/input:text-primary">Message / Special Dua Request</label>
                                    <textarea rows={3} className="w-full p-4 rounded-2xl border-2 border-white/50 bg-white/50 transition-all duration-300 focus:bg-white focus:border-primary focus:shadow-[0_0_0_4px_rgba(212,175,55,0.1)] outline-none backdrop-blur-sm resize-none" placeholder="If you'd like us to make a specific dua at the Holy Sites..."></textarea>
                                </div>

                                <Button variant="primary" className="w-full py-5 text-sm uppercase tracking-widest font-bold shadow-[0_10px_20px_-10px_rgba(212,175,55,0.5)] hover:shadow-[0_15px_30px_-10px_rgba(212,175,55,0.6)] hover:-translate-y-1 transition-all duration-300 rounded-2xl mt-4 flex justify-center items-center gap-3">
                                    <Heart size={20} className="fill-current" /> Submit Contribution Request
                                </Button>
                            </form>
                        </GlassCard>
                    </div>
                </div>
            </section>

            {/* Salla Link */}
            <section className="py-20 bg-[var(--primary)] text-white text-center">
                <div className="container mx-auto px-6">
                    <h3 className="text-2xl font-bold font-amiri mb-6">Want to donate instantly?</h3>
                    <p className="mb-10 opacity-90 max-w-xl mx-auto">You can also donate directly through our Salla store donation products.</p>
                    <Button variant="outline" className="!bg-white !text-[var(--primary)] !border-none py-4 px-10 text-lg shadow-xl flex items-center gap-3 mx-auto">
                        <Gift size={22} /> Visit Donation Store
                    </Button>
                </div>
            </section>
        </>
    );
}
