import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-secondary text-white pt-32 pb-16 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-16 relative z-10">
                {/* Brand & Mission */}
                <div className="md:col-span-5">
                    <Link href="/" className="inline-block mb-10 group">
                        <span className="text-4xl font-bold font-amiri text-primary group-hover:text-white transition-colors duration-500 tracking-wider">Al-Huda</span>
                        <div className="h-0.5 w-0 group-hover:w-full bg-primary transition-all duration-500" />
                    </Link>
                    <p className="text-white/50 text-base mb-10 leading-loose max-w-md font-light">
                        Elevating the pilgrimage experience through excellence in service, rooted in the timeless values of hospitality and devotion. Providing trusted journeys since 2015.
                    </p>
                    <div className="flex gap-6">
                        {[Instagram, Facebook, Twitter].map((Icon, i) => (
                            <a key={i} href="#" className="p-3 rounded-xl bg-white/5 hover:bg-primary hover:text-secondary transition-all duration-500 border border-white/5">
                                <Icon size={20} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Navigation Columns */}
                <div className="md:col-span-2">
                    <h4 className="text-primary font-bold uppercase tracking-[0.2em] text-xs mb-10">Experience</h4>
                    <ul className="space-y-6 text-sm">
                        {[
                            { name: "Pick & Drop", href: "/pick-drop" },
                            { name: "Ziyarat Packages", href: "/ziyarat-packages" },
                            { name: "Madinah Dates", href: "/khajoor" },
                            { name: "Islamic Store", href: "/shop" },
                        ].map((item) => (
                            <li key={item.name}>
                                <Link href={item.href} className="text-white/60 hover:text-primary transition-colors duration-300 flex items-center gap-2 group">
                                    <span className="h-px w-0 group-hover:w-3 bg-primary transition-all duration-300" />
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="md:col-span-2">
                    <h4 className="text-primary font-bold uppercase tracking-[0.2em] text-xs mb-10">Company</h4>
                    <ul className="space-y-6 text-sm">
                        {[
                            { name: "About Our Story", href: "/about-us" },
                            { name: "Get in Touch", href: "/contact-us" },
                            { name: "Frequently Asked", href: "/faq" },
                            { name: "Privacy Policy", href: "/privacy-policy" },
                        ].map((item) => (
                            <li key={item.name}>
                                <Link href={item.href} className="text-white/60 hover:text-primary transition-colors duration-300 flex items-center gap-2 group">
                                    <span className="h-px w-0 group-hover:w-3 bg-primary transition-all duration-300" />
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Column */}
                <div className="md:col-span-3">
                    <h4 className="text-primary font-bold uppercase tracking-[0.2em] text-xs mb-10">Contact</h4>
                    <ul className="space-y-8 text-sm">
                        <li className="flex gap-4">
                            <div className="p-3 rounded-lg bg-white/5 text-primary border border-white/5">
                                <MapPin size={18} />
                            </div>
                            <span className="text-white/60 leading-relaxed">Makkah / Madinah Region,<br />Kingdom of Saudi Arabia</span>
                        </li>
                        <li className="flex gap-4">
                            <div className="p-3 rounded-lg bg-white/5 text-primary border border-white/5">
                                <Phone size={18} />
                            </div>
                            <span className="text-white/60">+966 50 000 0000</span>
                        </li>
                        <li className="flex gap-4">
                            <div className="p-3 rounded-lg bg-white/5 text-primary border border-white/5">
                                <Mail size={18} />
                            </div>
                            <span className="text-white/60">info@alhudaservices.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto px-6 mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                <p className="text-xs text-white/30 tracking-widest uppercase">
                    &copy; {new Date().getFullYear()} Al-Huda Services. All rights reserved.
                </p>
                <div className="flex gap-8">
                    <p className="text-[10px] text-white/20 uppercase tracking-widest leading-loose italic">
                        &quot;Serving the Ummah with Excellence.&quot;
                    </p>
                </div>
            </div>
        </footer>
    );
}
