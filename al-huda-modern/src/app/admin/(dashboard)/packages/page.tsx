"use client";

import { useEffect, useState } from "react";
import { Package, Plus, Pencil, Trash2, X } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";
import Image from "next/image";

interface ZiyaratPackage {
    id: string;
    name: string;
    city: string;
    duration: string;
    price: number;
    currency: string;
    includes: string;
    excludes: string;
    itinerary: string;
    pickupRules?: string;
    images?: string;
    availability?: string;
    isActive: boolean;
}

const emptyForm = {
    name: "",
    city: "",
    duration: "",
    price: 0,
    currency: "SAR",
    includes: "",
    excludes: "",
    itinerary: "",
    pickupRules: "",
    images: "",
    availability: "",
    isActive: true,
};

export default function PackagesAdminPage() {
    const [packages, setPackages] = useState<ZiyaratPackage[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<string | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);

    const fetchPackages = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/packages");
            const data = await res.json();
            if (data.success) setPackages(data.data);
        } catch (err) {
            console.error("Error:", err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPackages();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const url = editing ? `/api/packages/${editing}` : "/api/packages";
            const method = editing ? "PUT" : "POST";
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, price: Number(form.price) }),
            });
            const data = await res.json();
            if (data.success) {
                setShowForm(false);
                setEditing(null);
                setForm(emptyForm);
                fetchPackages();
            }
        } catch (err) {
            console.error("Save error:", err);
        }
        setSaving(false);
    };

    const handleEdit = (pkg: ZiyaratPackage) => {
        setForm({
            name: pkg.name,
            city: pkg.city,
            duration: pkg.duration,
            price: pkg.price,
            currency: pkg.currency,
            includes: pkg.includes,
            excludes: pkg.excludes,
            itinerary: pkg.itinerary,
            pickupRules: pkg.pickupRules || "",
            images: pkg.images || "",
            availability: pkg.availability || "",
            isActive: pkg.isActive,
        });
        setEditing(pkg.id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this package?")) return;
        try {
            await fetch(`/api/packages/${id}`, { method: "DELETE" });
            fetchPackages();
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Package className="text-[#D4AF37]" /> Ziyarat Packages
                    </h1>
                    <p className="text-white/50 text-sm mt-1">
                        Manage your ziyarat packages
                    </p>
                </div>
                <button
                    onClick={() => {
                        setForm(emptyForm);
                        setEditing(null);
                        setShowForm(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-xl hover:shadow-lg hover:shadow-[#D4AF37]/25 transition-all text-sm font-medium"
                >
                    <Plus size={16} /> Add Package
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-[#0d2614] border border-white/10 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">
                                {editing ? "Edit Package" : "Add New Package"}
                            </h2>
                            <button
                                onClick={() => {
                                    setShowForm(false);
                                    setEditing(null);
                                }}
                                className="text-white/40 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-white/70 text-sm mb-1">
                                        Package Name *
                                    </label>
                                    <input
                                        value={form.name}
                                        onChange={(e) =>
                                            setForm({ ...form, name: e.target.value })
                                        }
                                        required
                                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50"
                                        placeholder="Makkah Ziyarat – Half Day"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white/70 text-sm mb-1">
                                        City *
                                    </label>
                                    <input
                                        value={form.city}
                                        onChange={(e) =>
                                            setForm({ ...form, city: e.target.value })
                                        }
                                        required
                                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50"
                                        placeholder="Makkah"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white/70 text-sm mb-1">
                                        Duration *
                                    </label>
                                    <input
                                        value={form.duration}
                                        onChange={(e) =>
                                            setForm({ ...form, duration: e.target.value })
                                        }
                                        required
                                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50"
                                        placeholder="4 hours"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white/70 text-sm mb-1">
                                        Price *
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            value={form.price}
                                            onChange={(e) =>
                                                setForm({ ...form, price: Number(e.target.value) })
                                            }
                                            required
                                            className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50"
                                        />
                                        <select
                                            value={form.currency}
                                            onChange={(e) =>
                                                setForm({ ...form, currency: e.target.value })
                                            }
                                            className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none"
                                        >
                                            <option value="SAR" className="bg-[#0a1a0f]">
                                                SAR
                                            </option>
                                            <option value="USD" className="bg-[#0a1a0f]">
                                                USD
                                            </option>
                                            <option value="PKR" className="bg-[#0a1a0f]">
                                                PKR
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-white/70 text-sm mb-1">
                                    Includes *
                                </label>
                                <textarea
                                    value={form.includes}
                                    onChange={(e) =>
                                        setForm({ ...form, includes: e.target.value })
                                    }
                                    required
                                    rows={2}
                                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50"
                                    placeholder="Transport, Guide, Refreshments"
                                />
                            </div>

                            <div>
                                <label className="block text-white/70 text-sm mb-1">
                                    Excludes *
                                </label>
                                <textarea
                                    value={form.excludes}
                                    onChange={(e) =>
                                        setForm({ ...form, excludes: e.target.value })
                                    }
                                    required
                                    rows={2}
                                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50"
                                    placeholder="Meals, Personal expenses"
                                />
                            </div>

                            <div>
                                <label className="block text-white/70 text-sm mb-1">
                                    Itinerary *
                                </label>
                                <textarea
                                    value={form.itinerary}
                                    onChange={(e) =>
                                        setForm({ ...form, itinerary: e.target.value })
                                    }
                                    required
                                    rows={3}
                                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50"
                                    placeholder="1. Pickup from hotel&#10;2. Visit Masjid Al-Haram&#10;3. ..."
                                />
                            </div>

                            <ImageUploader
                                value={form.images}
                                onChange={(url) => setForm({ ...form, images: url })}
                                label="Package Image"
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-white/70 text-sm mb-1">
                                        Pickup Rules
                                    </label>
                                    <textarea
                                        value={form.pickupRules}
                                        onChange={(e) =>
                                            setForm({ ...form, pickupRules: e.target.value })
                                        }
                                        rows={2}
                                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white/70 text-sm mb-1">
                                        Availability Notes
                                    </label>
                                    <textarea
                                        value={form.availability}
                                        onChange={(e) =>
                                            setForm({ ...form, availability: e.target.value })
                                        }
                                        rows={2}
                                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={form.isActive}
                                    onChange={(e) =>
                                        setForm({ ...form, isActive: e.target.checked })
                                    }
                                    className="w-4 h-4 accent-[#D4AF37]"
                                />
                                <label className="text-white/70 text-sm">Active</label>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                                >
                                    {saving
                                        ? "Saving..."
                                        : editing
                                            ? "Update Package"
                                            : "Create Package"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowForm(false);
                                        setEditing(null);
                                    }}
                                    className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Packages List */}
            {loading ? (
                <div className="text-white/40 text-center py-12">Loading...</div>
            ) : packages.length === 0 ? (
                <div className="text-white/40 text-center py-12 bg-white/5 rounded-2xl border border-white/10">
                    No packages yet. Click &quot;Add Package&quot; to create one.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {packages.map((pkg) => (
                        <div
                            key={pkg.id}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:bg-white/[0.07] transition-all"
                        >
                            {pkg.images && (
                                <div className="relative h-32">
                                    <Image src={pkg.images} alt={pkg.name} fill className="object-cover" sizes="300px" />
                                </div>
                            )}
                            <div className="p-5">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h3 className="text-white font-semibold">{pkg.name}</h3>
                                        <p className="text-white/50 text-sm">
                                            {pkg.city} • {pkg.duration}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(pkg)}
                                            className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-all text-blue-400"
                                        >
                                            <Pencil size={14} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(pkg.id)}
                                            className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-all text-red-400"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-[#D4AF37] font-bold text-lg">
                                    {pkg.price} {pkg.currency}
                                </p>
                                <div className="flex gap-2 mt-3">
                                    <span
                                        className={`text-xs px-2 py-1 rounded-full ${pkg.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
                                    >
                                        {pkg.isActive ? "Active" : "Inactive"}
                                    </span>
                                    {!pkg.images && <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">No Image</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
