"use client";

import { motion } from "framer-motion";
import { Car, Map, ShoppingBag, BookOpen } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import Link from "next/link";
import SectionHeader from "../ui/SectionHeader";
import Button from "../ui/Button";

const services = [
    {
        title: "Pick & Drop",
        desc: "Professional airport and hotel transfers with comfortable, well-maintained vehicles.",
        icon: <Car size={40} className="text-[var(--primary)]" />,
        href: "/pick-drop",
        delay: 0.1,
    },
    {
        title: "Ziyarat Packages",
        desc: "Guided tours to the sacred sites of Makkah, Madinah, and the historic battle of Badr.",
        icon: <Map size={40} className="text-[var(--primary)]" />,
        href: "/ziyarat-packages",
        delay: 0.2,
    },
    {
        title: "Premium Khajoor",
        desc: "Fresh, high-quality Madinah dates including Ajwa, Safawi, and Mabroom varieties.",
        icon: <ShoppingBag size={40} className="text-[var(--primary)]" />,
        href: "/khajoor",
        delay: 0.3,
    },
    {
        title: "Islamic Bookstore",
        desc: "A curated collection of authentic Islamic literature and educational resources.",
        icon: <BookOpen size={40} className="text-[var(--primary)]" />,
        href: "/shop",
        delay: 0.4,
    },
];

export default function Services() {
    return (
        <section className="py-32 bg-background relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="container mx-auto px-6">
                <SectionHeader
                    title="Services Designed for You"
                    subtitle="We combine modern efficiency with traditional values to provide the best possible experience for our community."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: service.delay, duration: 0.8 }}
                            viewport={{ once: true }}
                            className="h-full"
                        >
                            <GlassCard className="h-full flex flex-col items-center text-center p-10 group">
                                <div className="mb-8 p-5 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-secondary transition-all duration-500 shadow-premium-sm">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-bold font-amiri mb-4 text-secondary">{service.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-1">
                                    {service.desc}
                                </p>
                                <Link href={service.href} className="w-full">
                                    <Button variant="ghost" className="w-full text-primary font-bold tracking-widest text-[10px] uppercase py-4">
                                        Explore Service
                                    </Button>
                                </Link>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
