"use client";

import { useEffect, useState } from "react";
import { Settings, Save } from "lucide-react";

interface AppSettings {
    id?: string;
    contactPhone: string;
    whatsappNumber: string;
    contactEmail: string;
    workingHours: string;
}

export default function SettingsPage() {
    const [settings, setSettings] = useState<AppSettings>({
        contactPhone: "",
        whatsappNumber: "",
        contactEmail: "",
        workingHours: "",
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        fetch("/api/settings")
            .then((res) => res.json())
            .then((data) => {
                if (data.success && data.data) {
                    setSettings(data.data);
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

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
        <div className="space-y-6 max-w-2xl">
            <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Settings className="text-white/60" /> Site Settings
                </h1>
                <p className="text-white/50 text-sm mt-1">
                    Configure your contact and general settings
                </p>
            </div>

            <form
                onSubmit={handleSave}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-5"
            >
                <div>
                    <label className="block text-white/70 text-sm mb-2">
                        Contact Phone
                    </label>
                    <input
                        value={settings.contactPhone}
                        onChange={(e) =>
                            setSettings({ ...settings, contactPhone: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50"
                        placeholder="+966 xxx xxx xxxx"
                    />
                </div>

                <div>
                    <label className="block text-white/70 text-sm mb-2">
                        WhatsApp Number
                    </label>
                    <input
                        value={settings.whatsappNumber}
                        onChange={(e) =>
                            setSettings({ ...settings, whatsappNumber: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50"
                        placeholder="+966 xxx xxx xxxx"
                    />
                </div>

                <div>
                    <label className="block text-white/70 text-sm mb-2">
                        Contact Email
                    </label>
                    <input
                        type="email"
                        value={settings.contactEmail}
                        onChange={(e) =>
                            setSettings({ ...settings, contactEmail: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50"
                        placeholder="info@alhuda.com"
                    />
                </div>

                <div>
                    <label className="block text-white/70 text-sm mb-2">
                        Working Hours
                    </label>
                    <input
                        value={settings.workingHours}
                        onChange={(e) =>
                            setSettings({ ...settings, workingHours: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50"
                        placeholder="Sun–Thu: 9:00 AM – 6:00 PM"
                    />
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#D4AF37]/25 transition-all disabled:opacity-50"
                >
                    <Save size={16} />
                    {saving ? "Saving..." : saved ? "Saved ✓" : "Save Settings"}
                </button>
            </form>
        </div>
    );
}
