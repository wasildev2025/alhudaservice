"use client";

import { useEffect, useState } from "react";
import {
    Save,
    Phone,
    Mail,
    Clock,
    Globe,
    Share2,
    Lock,
    ShoppingBag,
    BarChart2,
    Settings
} from "lucide-react";

interface AppSettings {
    id?: string;
    contactPhone: string;
    whatsappNumber: string;
    contactEmail: string;
    workingHours: string;
    siteTitle: string;
    siteDescription: string;
    sallaStoreUrl: string;
    sallaBooksUrl: string;
    sallaDatesUrl: string;
    sallaDonationsUrl: string;
    facebookUrl: string;
    instagramUrl: string;
    twitterUrl: string;
    tiktokUrl: string;
    statCustomers: string;
    statZiyarats: string;
    statYears: string;
}

const defaultSettings: AppSettings = {
    contactPhone: "",
    whatsappNumber: "",
    contactEmail: "",
    workingHours: "",
    siteTitle: "",
    siteDescription: "",
    sallaStoreUrl: "",
    sallaBooksUrl: "",
    sallaDatesUrl: "",
    sallaDonationsUrl: "",
    facebookUrl: "",
    instagramUrl: "",
    twitterUrl: "",
    tiktokUrl: "",
    statCustomers: "",
    statZiyarats: "",
    statYears: "",
};

export default function SettingsPage() {
    const [settings, setSettings] = useState<AppSettings>(defaultSettings);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        fetch("/api/settings")
            .then((res) => res.json())
            .then((data) => {
                if (data.success && data.data) {
                    // Convert nulls to empty strings so controlled inputs don't get null values
                    const merged = { ...defaultSettings };
                    for (const key of Object.keys(merged) as (keyof AppSettings)[]) {
                        if (key === "id") continue;
                        merged[key] = data.data[key] ?? "" as string;
                    }
                    setSettings(merged);
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const update = (field: string, value: string) =>
        setSettings((prev) => ({ ...prev, [field]: value }));

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setSaved(false);
        try {
            const res = await fetch("/api/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });
            const data = await res.json();
            if (data.success) {
                setSaved(true);
                setTimeout(() => setSaved(false), 3000);
            }
        } catch (err) {
            console.error("Save error:", err);
        }
        setSaving(false);
    };

    if (loading) {
        return <div className="text-white/40 text-center py-12">Loading...</div>;
    }

    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Settings className="text-white/60" /> Site Settings
                </h1>
                <p className="text-white/50 text-sm mt-1">
                    Full control of your website – changes here reflect on all pages (Header, Footer, Contact, Shop)
                </p>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
                {/* Contact Information */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Phone size={18} className="text-[#D4AF37]" /> Contact Information
                    </h2>
                    <p className="text-white/30 text-xs">These values are used on the Contact Us page, Footer, WhatsApp button, and Header.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">
                                Phone Number
                            </label>
                            <input
                                value={settings.contactPhone}
                                onChange={(e) => update("contactPhone", e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50"
                                placeholder="+966 xxx xxx xxxx"
                            />
                        </div>
                        <div>
                            <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">
                                WhatsApp Number
                            </label>
                            <input
                                value={settings.whatsappNumber}
                                onChange={(e) => update("whatsappNumber", e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50"
                                placeholder="+966 xxx xxx xxxx"
                            />
                        </div>
                        <div>
                            <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={settings.contactEmail}
                                onChange={(e) => update("contactEmail", e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50"
                                placeholder="info@alhuda.com"
                            />
                        </div>
                        <div>
                            <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">
                                Working Hours
                            </label>
                            <input
                                value={settings.workingHours}
                                onChange={(e) => update("workingHours", e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50"
                                placeholder="24/7"
                            />
                        </div>
                    </div>
                </div>

                {/* Site Identity */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Globe size={18} className="text-[#D4AF37]" /> Site Identity
                    </h2>
                    <div>
                        <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Site Title</label>
                        <input value={settings.siteTitle} onChange={(e) => update("siteTitle", e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50" placeholder="Al-Huda Services" />
                    </div>
                    <div>
                        <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Site Description (SEO)</label>
                        <textarea rows={2} value={settings.siteDescription} onChange={(e) => update("siteDescription", e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50 resize-none" placeholder="Professional transport and Ziyarat services in Saudi Arabia..." />
                    </div>
                </div>

                {/* Company Statistics */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                        <BarChart2 size={18} className="text-[#D4AF37]" /> Company Statistics
                    </h2>
                    <p className="text-white/30 text-xs">These digits appear on the homepage 'Why Trust Al-Huda' section to show credibility.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div>
                            <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Happy Customers</label>
                            <input value={settings.statCustomers || "10,000+"} onChange={(e) => update("statCustomers", e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50" placeholder="10,000+" />
                        </div>
                        <div>
                            <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Ziyarats Completed</label>
                            <input value={settings.statZiyarats || "500+"} onChange={(e) => update("statZiyarats", e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50" placeholder="500+" />
                        </div>
                        <div>
                            <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Years of Service</label>
                            <input value={settings.statYears || "10+"} onChange={(e) => update("statYears", e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50" placeholder="10+" />
                        </div>
                    </div>
                </div>

                {/* Store & External Links */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                        <ShoppingBag size={18} className="text-[#D4AF37]" /> Online Store Links
                    </h2>
                    <p className="text-white/30 text-xs">These URLs are used on the Shop page and &quot;Buy on Salla&quot; buttons across the site.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="md:col-span-2">
                            <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Main Salla Store URL</label>
                            <input value={settings.sallaStoreUrl} onChange={(e) => update("sallaStoreUrl", e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50" placeholder="https://store.salla.sa/your-store" />
                        </div>
                        <div>
                            <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">📚 Islamic Books Category URL</label>
                            <input value={settings.sallaBooksUrl} onChange={(e) => update("sallaBooksUrl", e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50" placeholder="https://store.salla.sa/your-store/books" />
                        </div>
                        <div>
                            <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">🌴 Premium Dates Category URL</label>
                            <input value={settings.sallaDatesUrl} onChange={(e) => update("sallaDatesUrl", e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50" placeholder="https://store.salla.sa/your-store/dates" />
                        </div>
                        <div>
                            <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">❤️ Donation Store URL</label>
                            <input value={settings.sallaDonationsUrl} onChange={(e) => update("sallaDonationsUrl", e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50" placeholder="https://store.salla.sa/your-store/donations" />
                        </div>
                    </div>
                </div>

                {/* Social Media */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Share2 size={18} className="text-[#D4AF37]" /> Social Media
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Facebook</label>
                            <input value={settings.facebookUrl} onChange={(e) => update("facebookUrl", e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50" placeholder="https://facebook.com/..." />
                        </div>
                        <div>
                            <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Instagram</label>
                            <input value={settings.instagramUrl} onChange={(e) => update("instagramUrl", e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50" placeholder="https://instagram.com/..." />
                        </div>
                        <div>
                            <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Twitter / X</label>
                            <input value={settings.twitterUrl} onChange={(e) => update("twitterUrl", e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50" placeholder="https://x.com/..." />
                        </div>
                        <div>
                            <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">TikTok</label>
                            <input value={settings.tiktokUrl} onChange={(e) => update("tiktokUrl", e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50" placeholder="https://tiktok.com/@..." />
                        </div>
                    </div>
                </div>

                {/* Save */}
                <button type="submit" disabled={saving} className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#D4AF37]/25 transition-all disabled:opacity-50 text-sm">
                    <Save size={16} />
                    {saving ? "Saving..." : saved ? "Saved ✓" : "Save All Settings"}
                </button>
            </form>

            {/* ─── Change Password ─────────────────────────────── */}
            <ChangePasswordSection />
        </div>
    );
}

function ChangePasswordSection() {
    const [pw, setPw] = useState({ current: "", newPw: "", confirm: "" });
    const [changingSaving, setChangingSaving] = useState(false);
    const [pwMsg, setPwMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setPwMsg(null);

        if (pw.newPw !== pw.confirm) {
            setPwMsg({ type: "error", text: "New passwords do not match." });
            return;
        }
        if (pw.newPw.length < 8) {
            setPwMsg({ type: "error", text: "Password must be at least 8 characters." });
            return;
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(pw.newPw)) {
            setPwMsg({ type: "error", text: "Must contain uppercase, lowercase, and a number." });
            return;
        }

        setChangingSaving(true);
        try {
            const res = await fetch("/api/auth/change-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    currentPassword: pw.current,
                    newPassword: pw.newPw,
                }),
            });
            const data = await res.json();
            if (data.success) {
                setPwMsg({ type: "success", text: "Password changed successfully! 🔒" });
                setPw({ current: "", newPw: "", confirm: "" });
            } else {
                setPwMsg({ type: "error", text: data.message || "Failed to change password." });
            }
        } catch {
            setPwMsg({ type: "error", text: "Network error." });
        }
        setChangingSaving(false);
    };

    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-5">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Lock size={18} className="text-[#D4AF37]" /> Change Password
            </h2>
            <p className="text-white/30 text-xs">Must be at least 8 characters with uppercase, lowercase, and a number.</p>

            {pwMsg && (
                <div className={`p-3 rounded-xl text-sm ${pwMsg.type === "success" ? "bg-green-500/10 border border-green-500/20 text-green-400" : "bg-red-500/10 border border-red-500/20 text-red-400"}`}>
                    {pwMsg.text}
                </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                    <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Current Password</label>
                    <input type="password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50" placeholder="••••••••" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">New Password</label>
                        <input type="password" value={pw.newPw} onChange={(e) => setPw({ ...pw, newPw: e.target.value })} required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50" placeholder="••••••••" />
                    </div>
                    <div>
                        <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Confirm New Password</label>
                        <input type="password" value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50" placeholder="••••••••" />
                    </div>
                </div>
                <button type="submit" disabled={changingSaving} className="flex items-center gap-2 px-6 py-3 bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 font-semibold rounded-xl transition-all disabled:opacity-50 text-sm">
                    <Lock size={14} />
                    {changingSaving ? "Changing..." : "Change Password"}
                </button>
            </form>
        </div>
    );
}
