"use client";

import { useEffect, useState } from "react";
import { TreePalm, Plus, Pencil, Trash2, X } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";
import Image from "next/image";

interface KhajoorProduct {
    id: string;
    name: string;
    description: string;
    price: string;
    priceAmount: number | null;
    currency: string;
    unit: string;
    image: string | null;
    popular: boolean;
    isActive: boolean;
}

const currencies = ["SAR", "USD", "EUR", "GBP", "AED", "KWD", "BHD", "QAR", "OMR"];
const units = ["kg", "500g", "250g", "box", "pack", "piece", "dozen"];

const emptyForm = {
    name: "",
    description: "",
    price: "",
    priceAmount: "" as string,
    currency: "SAR",
    unit: "kg",
    image: "",
    popular: false,
    isActive: true,
};

export default function KhajoorAdminPage() {
    const [products, setProducts] = useState<KhajoorProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<string | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/khajoor");
            const data = await res.json();
            if (data.success) setProducts(data.data);
        } catch (err) {
            console.error("Error:", err);
        }
        setLoading(false);
    };

    useEffect(() => { fetchProducts(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const url = editing ? `/api/khajoor/${editing}` : "/api/khajoor";
            const method = editing ? "PUT" : "POST";
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    priceAmount: form.priceAmount ? parseFloat(form.priceAmount) : null,
                }),
            });
            const data = await res.json();
            if (data.success) {
                setShowForm(false);
                setEditing(null);
                setForm(emptyForm);
                fetchProducts();
            }
        } catch (err) {
            console.error("Save error:", err);
        }
        setSaving(false);
    };

    const handleEdit = (p: KhajoorProduct) => {
        setForm({
            name: p.name,
            description: p.description,
            price: p.price,
            priceAmount: p.priceAmount != null ? String(p.priceAmount) : "",
            currency: p.currency || "SAR",
            unit: p.unit || "kg",
            image: p.image || "",
            popular: p.popular,
            isActive: p.isActive,
        });
        setEditing(p.id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this product?")) return;
        try {
            await fetch(`/api/khajoor/${id}`, { method: "DELETE" });
            fetchProducts();
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <TreePalm className="text-[#D4AF37]" /> Khajoor Products
                    </h1>
                    <p className="text-white/50 text-sm mt-1">
                        Manage your dates catalog — these appear on the Khajoor page
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
                    <Plus size={16} /> Add Khajoor
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-[#0d2614] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">
                                {editing ? "Edit Product" : "Add New Khajoor"}
                            </h2>
                            <button onClick={() => { setShowForm(false); setEditing(null); }} className="text-white/40 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-white/70 text-sm mb-1">Name *</label>
                                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50" placeholder="Ajwa Al-Madinah" />
                            </div>

                            <div>
                                <label className="block text-white/70 text-sm mb-1">Description *</label>
                                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required rows={3} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50" placeholder="Soft, dark, and sweet with numerous health benefits..." />
                            </div>

                            <div>
                                <label className="block text-white/70 text-sm mb-1">Price Label *</label>
                                <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50" placeholder="From 60 SAR / kg" />
                                <p className="text-white/30 text-xs mt-1 ml-1">Shown on the product card (e.g. &quot;From 60 SAR / kg&quot;)</p>
                            </div>

                            {/* Structured Price Row */}
                            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 space-y-3">
                                <label className="block text-[#D4AF37]/80 text-xs uppercase tracking-wider font-semibold">Pricing Details</label>
                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-white/50 text-xs mb-1">Price</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={form.priceAmount}
                                            onChange={(e) => setForm({ ...form, priceAmount: e.target.value })}
                                            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#D4AF37]/50"
                                            placeholder="60"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white/50 text-xs mb-1">Currency</label>
                                        <select
                                            value={form.currency}
                                            onChange={(e) => setForm({ ...form, currency: e.target.value })}
                                            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#D4AF37]/50 appearance-none"
                                        >
                                            {currencies.map((c) => (
                                                <option key={c} value={c} className="bg-[#0d2614]">{c}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-white/50 text-xs mb-1">Per</label>
                                        <select
                                            value={form.unit}
                                            onChange={(e) => setForm({ ...form, unit: e.target.value })}
                                            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#D4AF37]/50 appearance-none"
                                        >
                                            {units.map((u) => (
                                                <option key={u} value={u} className="bg-[#0d2614]">{u}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <p className="text-white/25 text-xs">Structured pricing for filtering/sorting. The Price Label above is what&apos;s displayed to customers.</p>
                            </div>

                            <ImageUploader value={form.image} onChange={(url) => setForm({ ...form, image: url })} label="Product Image" />

                            <div className="flex items-center gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={form.popular} onChange={(e) => setForm({ ...form, popular: e.target.checked })} className="w-4 h-4 accent-[#D4AF37]" />
                                    <span className="text-white/70 text-sm">⭐ Popular</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 accent-[#D4AF37]" />
                                    <span className="text-white/70 text-sm">Active</span>
                                </label>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button type="submit" disabled={saving} className="flex-1 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50">
                                    {saving ? "Saving..." : editing ? "Update" : "Create"}
                                </button>
                                <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Product List */}
            {loading ? (
                <div className="text-white/40 text-center py-12">Loading...</div>
            ) : products.length === 0 ? (
                <div className="text-white/40 text-center py-12 bg-white/5 rounded-2xl border border-white/10">
                    No khajoor products yet. Click &quot;Add Khajoor&quot; to create one.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((p) => (
                        <div key={p.id} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:bg-white/[0.07] transition-all">
                            {p.image && (
                                <div className="relative h-40">
                                    <Image src={p.image} alt={p.name} fill className="object-cover" sizes="300px" />
                                    {p.popular && (
                                        <div className="absolute top-2 left-2 bg-[#D4AF37] px-2 py-0.5 rounded-full text-[10px] font-bold text-white">⭐ Popular</div>
                                    )}
                                </div>
                            )}
                            <div className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h3 className="text-white font-semibold">{p.name}</h3>
                                        <p className="text-[#D4AF37] text-sm font-bold">{p.price}</p>
                                        {p.priceAmount != null && (
                                            <p className="text-white/30 text-xs">{p.priceAmount} {p.currency} / {p.unit}</p>
                                        )}
                                    </div>
                                    <div className="flex gap-1">
                                        <button onClick={() => handleEdit(p)} className="p-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-all text-blue-400">
                                            <Pencil size={12} />
                                        </button>
                                        <button onClick={() => handleDelete(p.id)} className="p-1.5 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-all text-red-400">
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-white/50 text-xs line-clamp-2">{p.description}</p>
                                <div className="flex gap-2 mt-3">
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${p.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                                        {p.isActive ? "Active" : "Inactive"}
                                    </span>
                                    {!p.image && <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400">No Image</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
