"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
import {
    LayoutDashboard,
    Car,
    MapPin,
    TreePalm,
    MessageSquare,
    Package,
    Settings,
    LogOut,
    Menu,
    X,
} from "lucide-react";

interface User {
    name?: string | null;
    email?: string | null;
    image?: string | null;
}

const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/bookings", label: "Pick & Drop", icon: Car },
    { href: "/admin/ziyarat", label: "Ziyarat Inquiries", icon: MapPin },
    { href: "/admin/packages", label: "Packages", icon: Package },
    { href: "/admin/khajoor", label: "Khajoor Inquiries", icon: TreePalm },
    { href: "/admin/messages", label: "Messages", icon: MessageSquare },
    { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar({ user }: { user: User }) {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            {/* Mobile toggle */}
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white/10 backdrop-blur-xl rounded-xl border border-white/10 text-white"
            >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Overlay */}
            {mobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-[#0d1f14]/95 backdrop-blur-2xl border-r border-white/5 z-40 transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-white/5">
                        <h2 className="text-xl font-bold text-[#D4AF37]">Al Huda Admin</h2>
                        <p className="text-white/40 text-xs mt-1">{user.email}</p>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                        {navItems.map((item) => {
                            const isActive =
                                pathname === item.href ||
                                (item.href !== "/admin" && pathname.startsWith(item.href));
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${isActive
                                            ? "bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/20"
                                            : "text-white/60 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    <item.icon size={18} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout */}
                    <div className="p-4 border-t border-white/5">
                        <button
                            onClick={() => signOut({ callbackUrl: "/admin/login" })}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all w-full"
                        >
                            <LogOut size={18} />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
