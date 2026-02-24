import { PrismaClient } from '@prisma/client';
import { unstable_cache } from 'next/cache';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';
import Link from 'next/link';
import SectionHeader from '../ui/SectionHeader';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';

interface ZiyaratPackage {
    id: string;
    name: string;
    city: string;
    duration: string;
    price: number;
    currency: string;
    itinerary: string;
    images?: string | null;
    isActive: boolean;
}

const cityImages: Record<string, string> = {
    Makkah: "https://images.unsplash.com/photo-1542661957-d24b453eb553?auto=format&fit=crop&q=80",
    Madinah: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80",
    Badr: "https://images.unsplash.com/photo-1582233221943-42e0591b658a?auto=format&fit=crop&q=80",
    Taif: "https://images.unsplash.com/photo-1534008757030-2679aa4352a3?auto=format&fit=crop&q=80",
};

function getImage(pkg: ZiyaratPackage) {
    if (pkg.images) {
        try {
            const imgs = JSON.parse(pkg.images);
            if (Array.isArray(imgs) && imgs.length > 0) return imgs[0];
            if (typeof pkg.images === 'string' && pkg.images.startsWith("http")) return pkg.images;
        } catch {
            if (pkg.images.startsWith("http") || pkg.images.startsWith("/")) return pkg.images;
        }
    }
    return cityImages[pkg.city] || cityImages.Makkah;
}

// 1. Next.js unstable_cache to prevent repeated DB hits
const getCachedPackages = unstable_cache(
    async () => {
        try {
            const packages = await prisma.ziyaratPackage.findMany({
                where: { isActive: true },
                take: 3,
            });
            return packages as ZiyaratPackage[];
        } catch (error) {
            console.error("Failed to fetch packages:", error);
            return [];
        }
    },
    ['featured-packages'],
    { revalidate: 3600, tags: ['packages'] } // Cache for 1 hour
);

export default async function FeaturedPackages() {
    const packages = await getCachedPackages();

    if (!packages || packages.length === 0) return null;

    return (
        <section className="py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center text-center mb-16 gap-6 relative">
                    <SectionHeader
                        center={true}
                        title="Spiritual Journeys"
                        subtitle="Carefully curated Ziyarat packages designed to provide a deep, meaningful connection with the heritage of Islam."
                    />
                    <div>
                        <Link href="/ziyarat-packages">
                            <Button variant="outline" className="px-10 py-4 rounded-full text-xs uppercase tracking-widest font-bold">
                                View All Packages
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {packages.map((pkg, index) => (
                        <div key={pkg.id}>
                            <GlassCard className="p-0 overflow-hidden flex flex-col h-full group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(212,175,55,0.15)]">
                                <div className="h-72 overflow-hidden relative">
                                    <div className="relative h-full w-full">
                                        <Image
                                            src={getImage(pkg)}
                                            alt={pkg.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    </div>
                                    <div className="absolute top-6 right-6 glass-premium px-4 py-2 rounded-full z-10">
                                        <span className="text-primary font-bold text-[10px] uppercase tracking-widest">{pkg.city}</span>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                                <div className="p-10 flex flex-col flex-1">
                                    <h3 className="text-2xl font-bold font-amiri mb-4 text-secondary group-hover:text-primary transition-colors">{pkg.name}</h3>
                                    <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                                        {pkg.itinerary}
                                    </p>
                                    <p className="text-primary font-bold mb-6">{pkg.price} {pkg.currency}</p>
                                    <Link href={`/ziyarat-packages/${pkg.id}`} className="mt-auto">
                                        <Button variant="ghost" className="px-0 text-primary font-bold flex items-center gap-3 group/btn text-[10px] uppercase tracking-[0.2em]">
                                            Details <span className="group-hover/btn:translate-x-2 transition-transform">→</span>
                                        </Button>
                                    </Link>
                                </div>
                            </GlassCard>
                        </div>
                    ))}
                </div>

                <div className="mt-16 md:hidden text-center">
                    <Link href="/ziyarat-packages">
                        <Button variant="outline" className="w-full py-5 rounded-2xl">View All Packages</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
