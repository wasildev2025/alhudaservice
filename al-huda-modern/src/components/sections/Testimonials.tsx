"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import GlassCard from "../ui/GlassCard";

const testimonials = [
    {
        name: "Abdullah",
        location: "Jeddah",
        review: "Excellent pickup service from the airport. Very reliable and on time. The car was clean and the driver was professional.",
        stars: 5,
    },
    {
        name: "Fatima",
        location: "Pakistan",
        review: "The Ziyarat package was well organised. Highly recommend for families visiting for the first time.",
        stars: 5,
    },
    {
        name: "Ahmed",
        location: "Riyadh",
        review: "Great quality dates and fast delivery. The Ajwa dates were fresh and beautifully packaged.",
        stars: 5,
    },
];

import SectionHeader from "../ui/SectionHeader";

export default function Testimonials() {
    return (
        <section className="py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6">
                <SectionHeader
                    title="Voices of Gratitude"
                    subtitle="Hear from the brothers and sisters who have experienced the Al-Huda difference."
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <GlassCard className="h-full p-12 flex flex-col items-center text-center relative pt-20">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border-8 border-background overflow-hidden shadow-premium-lg">
                                    <div className="w-full h-full bg-secondary text-primary flex items-center justify-center text-4xl font-bold font-amiri">
                                        {t.name[0]}
                                    </div>
                                </div>
                                <div className="mb-8 flex gap-1">
                                    {[...Array(t.stars)].map((_, i) => (
                                        <Star key={i} size={16} className="fill-primary text-primary" />
                                    ))}
                                </div>
                                <Quote className="text-primary/10 absolute top-20 left-10" size={60} />
                                <p className="text-gray-500 italic mb-10 leading-loose font-light relative z-10">
                                    &quot;{t.review}&quot;
                                </p>
                                <div className="mt-auto">
                                    <h4 className="font-bold text-secondary text-xl">{t.name}</h4>
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mt-2">{t.location}</p>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
