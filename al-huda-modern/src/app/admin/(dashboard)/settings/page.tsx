"use client";

import { useEffect, useState } from "react";
import { Settings, Save, Globe, Phone, Mail, Clock, Link2, Share2, ShoppingBag } from "lucide-react";

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
                    setSettings({ ...defaultSettings, ...data.data });
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
        </div>
    );
}
